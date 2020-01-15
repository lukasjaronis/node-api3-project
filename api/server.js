const express = require('express');
const helment = require('helmet');
const morgan = require('morgan');

const postRouter = require('../posts/postRouter');
const userRouter = require('../users/userRouter');

const server = express();

module.exports = server;