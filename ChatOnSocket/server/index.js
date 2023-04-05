const express = require('express');
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
const { getPost, addPost, getUser, changePost, delPost } = require('./State')

const PORT = 4000;
const app = express()

const server = http.createServer(app);
const router = require('./router')

app.use(cors({ origin: '*' }));
app.use(express.json())
app.use('/api',router)

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
    }
})

io.on('connection', (socket) => {
    socket.on('addAllMessage', (id) => {
        if(!id) {
            id = `Goust`
        }
        socket.emit('addAllMessage', getPost())
    })
    socket.on('addMessage', ({message, id}) => {
        addPost(message)
        io.sockets.emit('addAllMessage', getPost())
    })
    socket.on('deletePost', (id) => {
        delPost(id)
        io.sockets.emit('addAllMessage', getPost())
    })
    socket.on('putPost', ({ id, message }) => {
        changePost(id, message)
        io.sockets.emit('addAllMessage', getPost())
    })

    socket.on('addUser', () => {
        io.sockets.emit('addUser', getUser())
    })

    socket.on('disconnect', () => {
        console.log('Discpnect');
    })
})

server.listen(PORT, () => console.log('Server has been started'))
