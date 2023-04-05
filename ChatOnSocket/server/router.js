const express = require('express');
const { getPost, getUser, addUser, changePost, delPost } = require('./State');
const router = express.Router();

router.get("/post", (req, res) => {
    res.json(getPost())
})

router.delete("/post/:id", (req, res) => {
    const id = req.params.id
    delPost(id)
})

router.put("/post", (req, res) => {
    const {id, message} = req.body
    changePost(id, message)
})

router.get("/users", (req, res) => {
    res.json(getUser())
})

router.post("/users", (req, res) => {
    const data = req.body
    addUser(data)
})

module.exports = router;