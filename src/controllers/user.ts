import { connection } from "../db";
import { RequestHandler } from "express";

export const registerUser:RequestHandler = async (req, res, next) => {
    const { username, password } = req.body;
    //console.log(username, password);
    try{
        if(!username || !password){
            throw new Error("username and password are required");
        }
        const sql = `INSERT INTO user (username, password) VALUES (${username}, ${password})`
      await  connection.query(sql, (err:Error, result:any) => {
            if(err) throw err;
            console.log(result);
            res.json("user created")
        })

    }catch(err)
    {
        next(err);
    }
}
