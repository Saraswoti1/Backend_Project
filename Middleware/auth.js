
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const Auth = async (req, res, next) => {
    const token = req.header("authorization");
    if (!token) {
        const error = new Error("Authorization failed");
        error.statusCode = 401;
        return next(error);
    } 

    console.log(process.env.SECRET);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    User.findById(decodedToken.id).then(user => {
        if (!user) {
            const error = new Error("Authorization failed");
            error.statusCode = 401;
            return next(error);                
        } 
        req.user = user;
        next();
    }).catch(e => next(e));
};



const VerifyUsers = (req,res,next)=>{
console.log(req.headers.authorization);
let authHeader = req.headers.authorization;
if(!authHeader){
    let err =    new Error('NO AUTHENTICATION INFORMATION');
    err.status =401;
    return next (err);
}
let token = authHeader.split(" ")[1];
jwt.verify(token, process.env.SECRET, (err,payload)=>{
    if (err) return next (err);
    req.user =payload;
   return next();
})
}



module.exports ={
    Auth,
    VerifyUsers,
    
}