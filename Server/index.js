const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken')
const bcrypt= require('bcryptjs')
const mongoose = require("mongoose");
const Router = require('./Api/Auth.js')
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors());


app.use('/',Router)

const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://mutharasuAitReact:ait1098@logincluster.shb6x9d.mongodb.net/login',);
    console.log('mongoose connected successfully, server listening on port 7000');
  } catch (error) {
    console.log('Error connecting to MongoDB', error);
  }
};

app.listen(process.env.PORT, start);
