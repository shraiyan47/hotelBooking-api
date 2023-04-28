import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;

    if(!token){
        return next(createError(401, "you are not authenticated"))
    }

    jwt.verify(token, process.env.JWT_Secret, (err, user) => {
        if(err) return next(createError(403, "Token is not valid!"));

        req.userToken = user;
        next()
    })
}


export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        
        if(req.userToken.id === req.params.id || req.userToken.isAdmin) {
            next()
        }
        else{
            if(err) return next(createError(403, "You are not authorized"))
        }
    })
}


export const verifAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        
        if( req.userToken.isAdmin) {
            next()
        }
        else{
            if(err) return next(createError(403, "You are not an Admin"))
        }
    })
}