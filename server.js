const express = require('express')
const colors = require('colors')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const { connectDb } = require('./config/db')

//dotenv configuration
dotenv.config()
const app = express();

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//connection DB
connectDb();


app.use('/api/v1/test', require('./routes/testRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/restarunt', require('./routes/restaruntRoutes'));
app.use('/api/v1/category', require('./routes/categoryRoutes'));
app.use('/api/v1/food', require('./routes/foodRoutes'));



app.get("/test", (req, res) => {
    return res.status(200).send("<h1>welcome to server</h1>")
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

});