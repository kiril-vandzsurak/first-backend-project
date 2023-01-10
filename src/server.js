import express from "express";
import authorsRouter from "./authors/index.js";
import {
  genericErrorHandler,
  notFoundHandler,
  badRequestHandler,
} from "./errorHandler.js";
import cors from "cors";
import createHttpError from "http-errors";

const server = express();
const port = process.env.PORT;

const whitelist = [process.env.FE_DEV_URL, process.env.FE_PROD_URL];

server.use(
  cors({
    origin: (origin, corsNext) => {
      // If you want to connect FE to this BE you must use cors middleware
      console.log("ORIGIN: ", origin);

      if (!origin || whitelist.indexOf(origin) !== -1) {
        // if origin is in the whitelist we can move next
        corsNext(null, true);
      } else {
        // if origin is NOT in the whitelist --> trigger an error
        corsNext(
          createHttpError(
            400,
            `Cors Error! Your origin ${origin} is not in the list!`
          )
        );
      }
    },
  })
);
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

server.use(badRequestHandler); // 400
server.use(notFoundHandler); // 404
server.use(genericErrorHandler); // 500

//TODO: Finish error handlers

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
