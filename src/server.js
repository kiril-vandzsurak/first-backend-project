import express from "express";
import authorsRouter from "./authors/index.js";
import {
  genericErrorHandler,
  notFoundHandler,
  badRequestHandler,
  unauthorizedHandler,
} from "./errorHandler.js";
import cors from "cors";

const server = express();
const port = 3001;

server.use(cors());
server.use(express.json());

server.use("/authors", authorsRouter);

server.use(badRequestHandler); // 400
server.use(unauthorizedHandler); // 401
server.use(notFoundHandler); // 404
server.use(genericErrorHandler); // 500

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
