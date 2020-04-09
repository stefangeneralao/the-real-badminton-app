import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

if (!process.env.DB_URL) {
  console.log('DB_URL is missing from .env, fix it! Bye.');
  process.exit();
}

const dbUrl = process.env.DB_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (_, res) => {
  res.sendStatus(200);
});

app.get('/items', async (req, res) => {
  const { userToken } = req.query;
  
  try {
    const client = await MongoClient.connect(dbUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    const collection = client.db().collection('items');
    const items = await collection.find({}).toArray();
    const sortedItems = items.sort((a, b) => {
      const { voters: votersA, voters: { length: lengthA } } = a;
      const { voters: votersB, voters: { length: lengthB } } = b;
      if (lengthA !== lengthB) return lengthB - lengthA;
      if (!userToken) return 0;
      if (votersA.includes(userToken)) return -1;
      if (votersB.includes(userToken)) return 1;
      return 0;
    });
    res.status(200).send(sortedItems);
    client.close();
  } catch {
    res.sendStatus(500);
  }
});

app.post('/item', async (req, res) => {
  const { value, _id, userToken } = req.body;

  try {
    const client = await MongoClient.connect(dbUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    const collection = client.db().collection('items');
    await collection.insertOne({
      _id,
      value,
      createdBy: userToken,
      voters: [],
    });
    client.close();
    res.status(200);
  } catch {
    res.sendStatus(500);
  }
});

app.post('/vote', async (req, res) => {
  const { itemId, userToken } = req.body;
  try {
    const client = await MongoClient.connect(dbUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    const collection = client.db().collection('items');
    const item = await collection.findOne({ _id: itemId });
    const voters = [ ...item.voters, userToken ];
    collection.updateOne(
      { _id: itemId },
      { $set: { voters } },
    );
    client.close();
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
});

app.delete('/vote', async (req, res) => {
  const { itemId, userToken } = req.body;
  try {
    const client = await MongoClient.connect(dbUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    const collection = client.db().collection('items');
    const item = await collection.findOne({ _id: itemId });
    const voters = [ ...item.voters ].filter(voter => voter !== userToken);
    collection.updateOne(
      { _id: itemId },
      { $set: { voters } },
    );
    client.close();
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
});

app.post('/username', async (req, res) => {
  const { userName, userToken } = req.body;

  try {
    const client = await MongoClient.connect(dbUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    const user = { userName, _id: userToken };
    const collection = client.db().collection('users');
    await collection.findOneAndUpdate(
      { _id: user._id },
      { $set: user },
      { upsert: true },
    );
    res.sendStatus(200);
  } catch (e){
    console.log(e);
    res.sendStatus(400);
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port ${ port }.`);
});