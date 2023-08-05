const express = require('express')

const dotenv = require('dotenv')

dotenv.config({path:'config.env'})
const morgan = require('morgan')

const ApiError = require('./Utils/apError')

const app = express();


const dbConnection = require('./Config/database')
const CategoryRoute= require('./Routes/categoryRoute')
const globalError = require('./MIddlewares/errorMiddleware')

const subCategoryRoute = require('./Routes/subCategoryRoute')
const brandRoute = require('./Routes/brandRoute')
const productRoute = require('./Routes/productRoute')
// Logging the requests
if (process.env.NODE_ENV ==='development') {

    console.log(`mode : ${process.env.NODE_ENV}`);
    app.use(morgan('dev'))
}

//Middlewares
app.use(express.json());

//DataBase
dbConnection();

//Mount Routes
app.use('/api/v1/categories',CategoryRoute);

app.use('/api/v1/subcategories',subCategoryRoute);

app.use('/api/v1/brands',brandRoute);

app.use('/api/v1/products',productRoute);




//Error handling middleware
app.all('*',(req,res,next)=>{
     next( new ApiError(`can't find this route ${req.originalUrl}`,400) )
})

//Global Error Handling Middleware
app.use(globalError)

// Connecting to Server 
const port = process.env.PORT;
const server = app.listen(port,(req,res)=>{
    console.log(`Server is working on port ${port}`);
})

//handle rejections outside express
process.on("unhandledRejection",(err)=>{
    console.error(`unhandledRejection Error: ${err.name}|${err.message}`);
    server.close(()=>{
        console.log("shutting down ......");
        process.exit(1);
    });
});