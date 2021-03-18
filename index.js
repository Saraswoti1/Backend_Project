const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const userRouter = require('./routes/userRouter');

const app = express();

//connection for database
mongoose.connect('mongodb://127.0.0.1:27017/NearbyMechanic', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}).then(() => {
    console.log('DataBase connected successfully');
});

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(bodyParser.urlencoded({ extended: true }));

//for page loading 
app.get('/', (req, res) => {
    res.send('welcome to the NearbyMechanic');
});
app.use('/user', userRouter);

//port calling for server name from .env file
app.listen(process.env.Port, () => {
    console.log(`Server is running at localhost:${process.env.Port}`);
});
