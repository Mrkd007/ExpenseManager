const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDb = require('./config/connectDb');

//config dot env file
dotenv.config();

// connect Db
connectDb();

//rest Object
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
app.get('/', (req,res) => {
  res.send('<h1>Hello from Server</h1>');
});

app.use('/api/v1/users', require('./routes/userRoute'))

//port
const PORT = 8080 || process.env.PORT;

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
});