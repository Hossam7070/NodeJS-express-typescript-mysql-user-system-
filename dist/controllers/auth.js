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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.login = void 0;
const db_1 = require("../db");
const util_1 = __importDefault(require("util"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncTokenVerification = util_1.default.promisify(jsonwebtoken_1.default.verify);
const asyncTokenSign = util_1.default.promisify(jsonwebtoken_1.default.sign);
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield db_1.connection.query(`select * from user where username = ${username} and password = ${password}`);
        console.log(user[0]);
        if (!user[0][0]) {
            throw new Error("invalid username or password");
        }
        // await connection.end()
        // console.log(user[0][0]['id'])
        const token = yield asyncTokenSign({
            id: user[0][0]['id']
        }, process.env.SECRET_KEY);
        res.send({
            token
        });
    }
    catch (err) {
        next(err);
    }
});
exports.login = login;
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    try {
        const payload = yield asyncTokenVerification(authorization, process.env.SECRET_KEY);
        const [userId] = yield db_1.connection.query(`select id from user where id = ${payload.id}`);
        req.user = userId[0].id;
        console.log(req.user);
    }
    catch (err) {
        err.message = "unauthorized";
        next(err);
    }
    next();
});
exports.protect = protect;
