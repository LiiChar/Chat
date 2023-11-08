const express = require("express");
const {
  getPost,
  getUser,
  addUser,
  changePost,
  delPost,
  getRooms,
  addRoom,
  getUserByLog,
} = require("./State");
const router = express.Router();

router.get("/post", (req, res) => {
  res.json(getPost());
});

router.delete("/post/:id", (req, res) => {
  const id = req.params.id;
  delPost(id);
  res.status(200);
});

router.put("/post", (req, res) => {
  const { id, message } = req.body;
  changePost(id, message);
  res.status(200);
});

router.get("/room", (req, res) => {
  let rooms = getRooms();
  res.json(rooms);
});

router.post("/room", (req, res) => {
  let id = addRoom(req.body.name, req.body.username);
  res.json(id);
});

router.get("/users", (req, res) => {
  res.json(getUser());
});

router.get("/users/:id", (req, res) => {
  const id = req.params.id;
  res.json(getUserByLog(id));
});

router.post("/users", (req, res) => {
  const data = req.body;
  addUser(data);
  res.status(200);
});

module.exports = router;
