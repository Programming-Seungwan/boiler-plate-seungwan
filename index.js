const express = require('express');
const app = express();

const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://swsj4480:rp3cYuQP0kAbhZTs@seungwancluster1.uxzvlee.mongodb.net/'
  )
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(3000, () => {
  console.log('I am listening!');
});
