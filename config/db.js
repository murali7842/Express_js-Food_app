const mongoose = require('mongoose')

exports.connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to Database MongoDB")
    } catch (error) {
        console.log('db error', error);
    }
}
