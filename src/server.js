import express from "express";
import authorsRouter from "./authors/index.js";
// import {
//   genericErrorHandler,
//   notFoundHandler,
//   badRequestHandler,
//   unauthorizedHandler,
// } from "./errorHandler.js";
import cors from "cors";

const server = express();
const port = 3001;

server.use(cors());
server.use(express.json());

//   console.log("I am a middleware");
//   if (req.query.protected) {
//     res.status(401).send("you are not allowed here");
//   } else {
//     next();
//   }
// };
server.use("/authors", authorsRouter);

// const testMiddleware = (req, res, next) => {

// server.use(badRequestHandler); // 400
// server.use(unauthorizedHandler); // 401
// server.use(notFoundHandler); // 404
// server.use(genericErrorHandler); // 500

//TODO: Finish error handlers

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
