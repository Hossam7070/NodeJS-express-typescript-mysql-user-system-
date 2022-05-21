import { connection } from "../db";
import util from "util";
import jwt from "jsonwebtoken";
import { RequestHandler ,Response} from "express";
const asyncTokenVerification:any = util.promisify(jwt.verify);
const asyncTokenSign:any = util.promisify(jwt.sign);

export const login:RequestHandler = async (req,res,next) => {
    const { username,password} = req.body;
  
    try{
        const user:Array<any> = await connection.query(
            `select * from user where username = ${username} and password = ${password}`)
            console.log(user[0]);
        if(!user[0][0]){ throw new Error("invalid username or password")}
        // await connection.end()
            // console.log(user[0][0]['id'])
        const token = await asyncTokenSign({
            id: user[0][0]['id']
        },"MY-SUPER-SECRET-KEY")
        res.send({
            token
        });
    }catch(err){
        next(err);
    }
    
}

export const protect:RequestHandler = async(req,res,next)=>{
    const { authorization } = req.headers;
    
    try {
        const payload:any = await asyncTokenVerification(authorization, "MY-SUPER-SECRET-KEY");
        const [userId]:Array<any> = await connection.query(`select id from user where id = ${payload.id}`) 
        req.user = userId[0].id;
        console.log(req.user);
    } catch (err:any) {
        err.message = "unauthorized";
        next(err);
    }
    next();
}
