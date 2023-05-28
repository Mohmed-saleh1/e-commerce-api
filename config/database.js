const mongoose= require('mongoose');
require('dotenv').config();
const dbConnection = ()=>{
    const db = process.env.DB_URI;
    mongoose.connect(db)
    .then(conn=>
        {console.log("database connected ......"+conn.connection.host);})
    .catch(err=>{
        console.log(err);
        process.exit(1);
    })
}

module.exports= dbConnection;