import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuid } from 'uuid';

const generateItem = value => ({
  id: uuid(),
  value,
  voters: [],
});

const storage = {
  items: [{
    id: 'aaa',
    value: '12 april 20:00',
    voters: [],
  }, {
    id: 'bbb',
    value: '12 april 21:00',
    voters: [],
  }],
};

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('*', (_, res, next) => {
  res.on('finish', () => {
    console.log(storage.items);
  });
  next();
});

app.get('/', (_, res) => {
  res.sendStatus(200);
});

app.get('/items', (_, res) => {
  res.status(200).send(storage.items);
});

app.post('/vote', (req, res) => {
  const { itemId, userToken } = req.body;
  
  const { voters } = storage.items.find(({ id }) => id === itemId);
  if (!voters.includes(userToken)) {
    voters.push(userToken);
  }

  res.sendStatus(204);
});

app.delete('/vote', (req, res) => {
  const { itemId, userToken } = req.body;
  
  const { voters } = storage.items.find(({ id }) => id === itemId);
  if (voters.includes(userToken)) {
    const voterIndex = voters.findIndex(voter => voter === userToken);
    if (voterIndex) {
      voters.splice(voterIndex, 1);
    }
  }
  
  res.sendStatus(204);
});

app.post('/item', (req, res) => {
  const { value } = req.body;
  storage.items.push(generateItem(value));
  res.sendStatus(501);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port ${ port }.`);
});