const express = require("express");
const {
  getPost,
  getUser,
  addUser,
  changePost,
  delPost,
  getRooms,
  addRoom,
} = require("./State");
const router = express.Router();

router.get("/post", (req, res) => {
  res.json(getPost());
});

router.delete("/post/:id", (req, res) => {
  const id = req.params.id;
  delPost(id);
});

router.put("/post", (req, res) => {
  const { id, message } = req.body;
  changePost(id, message);
});

router.get("/room", (req, res) => {
  let rooms = getRooms();
  res.json(rooms);
});

router.post("/room", (req, res) => {
  console.log(req.body);
  let id = addRoom(req.body.name, req.body.username);
  res.json(id);
});

router.get("/users", (req, res) => {
  res.json(getUser());
});

router.post("/users", (req, res) => {
  const data = req.body;
  addUser(data);
});

module.exports = router;
