import { connection } from "../db";
import { RequestHandler } from "express";

export const getProducts:RequestHandler =async(req,res,next) => {
    try{
        const products:Array<any> = await connection.query('select * from product');
        if(!products[0]){
            throw new Error("no data found")
        }
        res.json(products[0]);
    }catch(err){
        next(err);
    }
}

export const createProduct:RequestHandler = async(req,res,next) => {
    const {title , image , price} =req.body;
    try {
        const sql = `insert into product(title,image,price,userId) values('${title}', '${image}', '${price}',${req.user})`
        const newProduct = await connection.query(sql)
        res.send("new Product added successfully");
    } catch(err){
        next(err);
    }
}

export const updateProduct:RequestHandler = async(req,res,next) =>{
    const{title ,image ,price} =req.body;
    const {id} = req.params;
    try {
    const update =await connection.query(
        `UPDATE product SET ? WHERE id = ? and userId = ${req.user}`,[{title,image,price},id]
        ) 
        console.log(update[0])
    res.send("updated successfully");
    } catch(err){
        next(err);
    }
}