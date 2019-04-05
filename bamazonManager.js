const manager = require("./managerMenu");
const mysql = require("mysql");
const cTable = require('console.table');
    
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
  });

console.log("Welcome bamazon manager!")

manager.menu(connection);

console.exports = {
    connection: connection
}
