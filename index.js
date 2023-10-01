require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');
// key는 mongoDB의 connect와 관련된 것에 해당
mongoose
  .connect(
    `mongodb+srv://swsj4480:${process.env.mongoDBKEY}@seungwancluster1.uxzvlee.mongodb.net/`
  )
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(3000, () => {
  console.log('I am listening!');
});
