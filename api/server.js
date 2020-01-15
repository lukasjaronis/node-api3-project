const express = require("express");
const helment = require("helmet");
const morgan = require("morgan");

const postRouter = require("../posts/postRouter");
const userRouter = require("../users/userRouter");

const server = express();
server.use(express.json());
server.use(helment());
server.use(morgan("tiny"));
server.use("/api/posts/", postRouter);
server.use("/api/users/", userRouter);

const logger = () => (request, response, next) => {

    const { method, originalURL } = request;
    console.log(`${method} to ${originalURL}`)
    next();
}

const consoleEcho = () => (request, response, next) => {
  console.log(request.body);
  next();
};

const gate = () => (request, response, next) => {
  request.headers.password === "lukas"
    ? next()
    : response.status(401).json({
        message: "Not authorized."
      });
};

module.exports = server;
