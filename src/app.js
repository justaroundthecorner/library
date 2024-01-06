
const debug = require('debug')('app:prod-ecv');
const user=require('../src/routes/users')
const book=require('../src/routes/books')

const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

const server = app.listen(port, async () => {
    debug(`Listening on port ${port}...`);
  });
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(express.json({ limit: '100mb' }));
app.use(user)
app.use(book)

  module.exports = server;
