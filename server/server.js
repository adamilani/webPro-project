require('dotenv').config();
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

console.log("Username:", process.env.MONGO_USERNAME);
console.log("Password:", process.env.MONGO_PASSWORD);
const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');

const LoggeeMiddleware = require('./middlewares/logger');
const userRoutes = require('./src/user/userRoutes');

const app = express();

console.log("Username:", process.env.MONGO_USERNAME);
console.log("Password:", process.env.MONGO_PASSWORD);

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.vhzwsdj.mongodb.net/?retryWrites=true&w=majority`
)
.then(() => console.log("DB is live"))
.catch(err => console.log("DB connection trouble:", err));

app.use(cors())
app.use(express.json()); 
app.use(express.static("client"));
app.use(LoggeeMiddleware);

// Use user routes
app.use('/users', userRoutes);

app.listen(3000, () => {
    console.log(`server is on: http://localhost:3000`);
});