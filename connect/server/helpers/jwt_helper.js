const jwt = require('jsonwebtoken')
const createError = require('http-errors');
const AppError = require('../utils/appError');
const {promisify} = require('util');
const catchAsync = require('../utils/catchAsync');
const user = require('../models/user-schema');


module.exports = {

    verifyAccessToken:catchAsync(async(req,res,next) => {
    //     if(!req.headers['authorization'])
    // return next(createError.Unauthorized())
    // const authHeader = req.headers['authorization'];
    // const bearerToken = authHeader.split(' ');
    // const token = bearerToken[1];
    // if(!token){
    //     return next(new AppError('You are not logged in! Please log in',401));
    // }
    // const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    // console.log(decoded);
    // res.json(decoded);
    // Checking whether user is logged in or not
    let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ){
            token = req.headers.authorization.split(' ')[1];
        }
    if(!token){
        return next(new AppError('You are not logged in! Please log in',401));
    }

    // console.log(token);
    // 2) Verification of token
    try {
        const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
        req.payload = decoded;
        const freshUser = await user.findById(decoded.uid);
        if(!freshUser) {
            return next(new AppError('The User belonging to this token no longer exists!',401))
        }
    } catch (error) {
        next(error)
    }
    next();
    })  
}