// import module ต่างๆ
const express = require('express')
const morgan = require("morgan")
const cors = require("cors")
const connectDB = require("./configs/connectDB") // ไฟล์เชื่อมต่อ DB อยู่ใน folder configs

//import router ต่างๆ
const userRoute = require('./routes/userRoutes')
const servicePostRoute = require('./routes/servicePostRoutes')
const confirmBusinessRoute = require('./routes/confirmBusinessRoutes')
const reportRoute = require('./routes/reportRoutes')
const reviewRoute = require('./routes/reviewRoutes')
const chatRoute = require('./routes/chatRoutes')
const messageRoute = require('./routes/messageRoutes')

// ใช้งาน package dotenv
require('dotenv').config()

// สร้าง Server
const app = express()

// เชื่อมต่อกับฐานข้อมูล
connectDB()

//middleware
app.use(express.json()) //ส่ง json ให้ client
app.use(cors())
app.use(morgan("dev"))

// route ต่างๆ
app.use("/api", userRoute)
app.use("/api", servicePostRoute)
app.use("/api", confirmBusinessRoute)
app.use("/api", reportRoute)
app.use("/api", reviewRoute)
app.use("/api", chatRoute)
app.use("/api", messageRoute)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, ()=> {
    console.log(`Kabiixoo Server is running on port ${PORT}`)
})

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.REACT_APP
    }
})

io.on("connection", (socket) => {
    console.log('connected to socket.io')

    // เมื่อเข้าสู้หน้าแชทให้เก็บไอดีคน login
    socket.on('setup', (loginUser) => {
        socket.join(loginUser)
        socket.emit('connected')
    })

    // เมื่อกดเลือกแชทให้ join room ของแชทนั้น
    socket.on('join chat', (room) => {
        socket.join(room)
        console.log("User Joined Chat Room : "+ room)
    })

    // กำลังพิมพ์ข้อความ
    socket.on('typing', (room) => socket.in(room).emit("typing"))
    // หยุดพิมพ์
    socket.on('stop typing', (room) => socket.in(room).emit("stop typing"))

    // ส่งข้อความ
    socket.on('new message', (newMessageRecieved) => {
        var chat = newMessageRecieved.chat

        if (!chat.users) return console.log('chat.users not defined')

        chat.users.forEach(user => {
            if(user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit('message recieved', newMessageRecieved)
        })
    })

    socket.off('setup', () => {
        console.log('USER DISCONNECTED')
        socket.leave(loginUser)
    })
})


