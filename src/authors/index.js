import { Router } from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const router = Router();

const usersJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "users.json"
);

router.get("/", (req, res) => {
  const fileContent = fs.readFileSync(usersJSONPath);
  const users = JSON.parse(fileContent);
  res.send(users);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const someArray = JSON.parse(fs.readFileSync(usersJSONPath));
  const findObj = someArray.find((user) => user.id === id);
  res.send(findObj);
});

router.post("/", (req, res) => {
  console.log("REQUEST BODY:", req.body);
  const newObj = { ...req.body, createdAt: new Date(), id: uniqid() };
  console.log("NEW OBJECT:", newObj);
  const objArray = JSON.parse(fs.readFileSync(usersJSONPath));
  objArray.push(newObj);
  fs.writeFileSync(usersJSONPath, JSON.stringify(objArray));
  res.status(201).send({ id: newObj.id });
});

router.put("/:id", (req, res) => {
  const objArray = JSON.parse(fs.readFileSync(usersJSONPath));
  const index = objArray.findIndex((user) => user.id === req.params.id);
  const oldUser = objArray[index];
  const updatedObj = { ...oldUser, ...req.body, updatedAt: new Date() };
  objArray[index] = updatedObj;
  fs.writeFileSync(usersJSONPath, JSON.stringify(objArray));
  res.send(updatedObj);
});

router.delete("/:id", (req, res) => {
  const objArray = JSON.parse(fs.readFileSync(usersJSONPath));
  const remainingObj = objArray.filter((user) => user.id !== req.params.id);
  fs.writeFileSync(usersJSONPath, JSON.stringify(remainingObj));
  res.status(204).send();
});

export default router;
