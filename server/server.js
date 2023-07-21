// import module ต่างๆ
const express = require('express')
const morgan = require("morgan")
const cors = require("cors")
const connectDB = require("./configs/connectDB") // ไฟล์เชื่อมต่อ DB อยู่ใน folder configs

//import router ต่างๆ
const userRoute = require('./routes/userRoutes')
const servicePostRoute = require('./routes/servicePostRoutes')

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
app.use("/api",userRoute)
app.use("/api",servicePostRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
    console.log(`Kabiixoo Server is running on port ${PORT}`)
})


