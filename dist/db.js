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
exports.tablePlot = exports.connection = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
exports.connection = promise_1.default.createPool({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "productDb",
});
const tablePlot = () => __awaiter(void 0, void 0, void 0, function* () {
    const userTable = "CREATE TABLE if NOT EXISTS USER (id INT PRIMARY KEY AUTO_INCREMENT ,username VARCHAR(255) , password VARCHAR(255))";
    const produsctTable = "CREATE TABLE if NOT EXISTS Product (id INT AUTO_INCREMENT PRIMARY KEY,title VARCHAR(255),image VARCHAR(255),userId INT ,CONSTRAINT `owner` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) )";
    try {
        yield exports.connection.query(userTable);
        yield exports.connection.query(produsctTable);
        console.log("tablePlot");
    }
    catch (err) {
        console.log(err);
    }
});
exports.tablePlot = tablePlot;
