const catchAsyncError = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require('jsonwebtoken');
const User = require("../models/UserModels");


exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;
     if(!token){
        return next(new ErrorHandler("Please login to access this page" , 401))
    }
const decodedData = jwt.verify(token , process.env.JWT_SECRET);
req.user = await User.findById(decodedData.id)
next();

});


exports.authorizeRole = (...roles)=>{
    return (req,res,next)=>{{
        if(!roles.includes(req.user.role)){
          return next(new ErrorHandler(`Role  : ${req.user.role} is not allowed to access this resource`,403));
        }
        else{

            next();
        }
    }}

}