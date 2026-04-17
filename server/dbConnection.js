const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { 
            family: 4,
            serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of hanging
        })
        console.log("connection successful")
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message)
    }
}

connectDB()

var db = mongoose.connection
db.on("error", (err) => {
    console.error("MongoDB runtime error:", err.message)
})

module.exports = db