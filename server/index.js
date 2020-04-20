import express, { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

if (!process.env.DB_URL) {
  console.log('DB_URL is missing from .env, fix it! Bye.');
  process.exit();
}

const dbUrl = process.env.DB_URL;

const router = Router();

router.get('/', (_, res) => {
  res.sendStatus(200);
});

router.get('/items', async (req, res) => {
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
    const uniqueVoters = (() => {
      const allVoters = items.map(i => i.voters).flat();
      const uniqueVotersSet = new Set(allVoters);
      return Array.from(uniqueVotersSet);
    })();
    const allVoters = await client.db().collection('users')
      .find({ _id: { $in: uniqueVoters } }).toArray();
    const itemVotersWithNames = sortedItems.map(item => ({
      ...item,
      voters: [ ...item.voters.map(voterId => {
        const voter = allVoters.find(({ _id }) => _id === voterId);
        const userName = voter ? voter.userName : 'Anonymous';
        return {
          userId: voterId,
          userName,
        }
      }) ],
    }));
    res.status(200).send(itemVotersWithNames);
    client.close();
  } catch {
    res.sendStatus(500);
  }
});

router.post('/item', async (req, res) => {
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

router.post('/vote', async (req, res) => {
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

router.delete('/vote', async (req, res) => {
  const { itemId, userToken } = req.body;
  try {
    const client = await MongoClient.connect(dbUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    const collection = client.db().collection('items');
    const item = await collection.findOne({ _id: itemId });
    const voters = [ ...item.voters ].filter(voter => voter !== userToken);
    const uniqueVoters = voters.reduce((unique, vote) => (
      unique.includes(vote) ? unique : [ ...unique, vote ]
    ), []);
    collection.updateOne(
      { _id: itemId },
      { $set: { voters: uniqueVoters } },
    );
    client.close();
    res.sendStatus(204);
  } catch (e){
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/username', async (req, res) => {
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
    client.close();
    res.sendStatus(200);
  } catch (e){
    console.log(e);
    res.sendStatus(400);
  }
});

router.get('/username', async (req, res) => {
  const { userToken } = req.query;
  try {
    const client = await MongoClient.connect(dbUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    const user = await client.db().collection('users').findOne({ _id: userToken });
    client.close();
    const { userName } = user || {};
    res.status(200).send(userName);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

const app = express();
if (process.env.NODE_ENV == 'development') {
  app.use(cors({
    origin: 'http://localhost:3011',
  }));
} else {
  app.use(cors({
    origin: [
      'https://www.stefangeneralao.com',
      'https://www.biadminton.com',
      'https://biadminton.com'
    ],
  }));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/badminton_api', router);

const port = process.env.API_PORT || 3012;

app.listen(port, () => {
  console.log(`Listening on port ${ port }.`);
});