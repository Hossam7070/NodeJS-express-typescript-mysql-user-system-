"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.createProduct = exports.getProducts = void 0;
const db_1 = require("../db");
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield db_1.connection.query('select * from product');
        if (!products[0]) {
            throw new Error("no data found");
        }
        res.json(products[0]);
    }
    catch (err) {
        next(err);
    }
});
exports.getProducts = getProducts;
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, image, price } = req.body;
    try {
        const sql = `insert into product(title,image,price,userId) values('${title}', '${image}', '${price}',${req.user})`;
        const newProduct = yield db_1.connection.query(sql);
        res.send("new Product added successfully");
    }
    catch (err) {
        next(err);
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, image, price } = req.body;
    const { id } = req.params;
    try {
        const update = yield db_1.connection.query(`UPDATE product SET ? WHERE id = ? and userId = ${req.user}`, [{ title, image, price }, id]);
        console.log(update[0]);
        res.send("updated successfully");
    }
    catch (err) {
        next(err);
    }
});
exports.updateProduct = updateProduct;
