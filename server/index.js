const express = require('express')
const app = express()
const mongoose = require('mongoose');
const UserModel = require('./models/Users');

const cors = require('cors');
app.use(cors());

app.use(express.json());

const port = 3001;
mongoose.connect("mongodb+srv://admin:123@cluster0.p5s2p.mongodb.net/merntutorial?retryWrites=true&w=majority");

app.get('/getUsers', (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post('/createUser', async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);


