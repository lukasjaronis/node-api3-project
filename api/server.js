const express = require('express');
const helment = require('helmet');
const morgan = require('morgan');

const postRouter = require('../posts/postRouter');
const userRouter = require('../users/userRouter');

const server = express();
server.use(express.json());
server.use(helment());
server.use(morgan('tiny'));
server.use('/api/posts/', postRouter);
server.use('/api/users/', userRouter);

module.exports = server;