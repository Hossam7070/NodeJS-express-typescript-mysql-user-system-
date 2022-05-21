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
exports.registerUser = void 0;
const db_1 = require("../db");
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //console.log(username, password);
    try {
        if (!username || !password) {
            throw new Error("username and password are required");
        }
        const sql = `INSERT INTO user (username, password) VALUES (${username}, ${password})`;
        yield db_1.connection.query(sql, (err, result) => {
            if (err)
                throw err;
            console.log(result);
            res.json("user created");
        });
    }
    catch (err) {
        next(err);
    }
});
exports.registerUser = registerUser;
