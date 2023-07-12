const mongoose = require("mongoose")

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB is connected : ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit();
    }
}
module.exports = connectDB