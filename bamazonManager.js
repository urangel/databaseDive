// const listProducts = require("./bamazonCustomer");
const inquirer = require('inquirer');
const mysql = require("mysql");
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
  });

inquirer.prompt([
    {
        type: "list",
        name: "choice",
        message: "Welcome bamazon manager! What would you like to do?",
        choices: ["View Products", "View Low Inventory", "Add To Inventory", "Add New Product"]
    }
])


function viewLowInventory(){
    let query = connection.query(
        `
        SELECT * 
        FROM products
        `, function(err, res){
            if(err) throw err;
            let lowInventory= [];
            for (let i =0; i< res.length; i++){
                if (res[i].stock_quantity < 100){
                    lowInventory.push(res[i]);
                }
            }
            console.table(lowInventory);
        }
        )
}
