const mongoose = require('mongoose')

const dbConnection =async()=>{

   const Connecting = await mongoose.connect(process.env.DB_LOCAL);

    console.log(`DataBase connected : ${Connecting.connection.host}`)

 }
module.exports=dbConnection 