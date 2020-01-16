const express = require("express");
const helment = require("helmet");
const morgan = require("morgan");
const { logger } = require('../middleware/middleware');
const postRouter = require("../posts/postRouter");
const userRouter = require("../users/userRouter");

const server = express();
server.use(express.json());
server.use(helment());
server.use(morgan("tiny"));
server.use(logger);

server.use("/api/posts/", postRouter);
server.use("/api/users/", userRouter);


module.exports = server;
