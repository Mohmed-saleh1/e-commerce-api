 const express = require('express');
 const app = express();
 require('dotenv').config();
 const morgan = require('morgan');
 const mongoose = require('mongoose');
 const dbConnection = require('./config/database');
 const categoryRoute = require('./routes/categoryRoute');



if (process.env.NODE_ENV==="development") {
    app.use(morgan('dev'));
console.log(`node ${process.env.NODE_ENV}`);
}

app.use(express.json());

//db cocnnection 
dbConnection();

//Mount Routes
app.use('/api/v1/categories',categoryRoute)


// Port listening
const port = process.env.PORT||8000;
app.listen(port,()=>{
    console.log("server is running  ........."+ port);
})