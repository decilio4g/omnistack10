const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes')


mongoose.connect('mongodb://decilio:gabriel157@cluster0-shard-00-00-aywz4.mongodb.net:27017,cluster0-shard-00-01-aywz4.mongodb.net:27017,cluster0-shard-00-02-aywz4.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(routes);
app.listen(4447);
