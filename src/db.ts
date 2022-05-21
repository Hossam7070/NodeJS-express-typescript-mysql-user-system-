import mysql from "mysql2/promise";

export const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "productDb",
});

export const tablePlot = async () => {
    const userTable: string =
        "CREATE TABLE if NOT EXISTS USER (id INT PRIMARY KEY AUTO_INCREMENT ,username VARCHAR(255) , password VARCHAR(255))";
    const produsctTable: string =
        "CREATE TABLE if NOT EXISTS Product (id INT AUTO_INCREMENT PRIMARY KEY,title VARCHAR(255),image VARCHAR(255),userId INT ,CONSTRAINT `owner` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) )";

    try {
        await connection.query(userTable);
        await connection.query(produsctTable);
        console.log(" user and product tables on database productDb");
    } catch (err) {
        console.log(err);
    }
};
