import express from "express";
import authorsRouter from "./authors/index.js";
const server = express();
const port = 3001;

server.use(express.json());

server.use("/authors", authorsRouter);

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
