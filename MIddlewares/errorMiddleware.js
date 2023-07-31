/* eslint-disable arrow-body-style */


// eslint-disable-next-line arrow-body-style
const sendForDevelopment = (err,res)=>{
       return res.status(err.statusCode).json({
        status:err.status,
        Error:err,
        message:err.message,
        stack:err.stack
    });
};

 const sendForProduction = (err,res)=>{
   
   return res.status(err.statusCode).json({
        status:err.status,
         message:err.message,
     });
};

const globalError = (err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.status=err.status||"error";

    if (process.env.NODE_ENV ==='development') {
        sendForDevelopment(err,res);
    } else {
        sendForProduction(err,res);
    }
}

module.exports=globalError