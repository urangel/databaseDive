const inquirer = require("inquirer");
const addProd = require("./addNewProduct");
const viewProducts = require("./viewProducts");
const viewLowInventory = require("./viewLowInventory");
const addToInventory = require("./addToInventory");


function menu(connection){
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: ["View Products", "View Low Inventory", "Add To Inventory", "Add New Product", "Exit"]
        }
    ]).then(function(response){
        console.log(response.choice);
        if (response.choice === "View Products"){
            viewProducts.viewProducts(connection,menu);
        }
        else if (response.choice === "View Low Inventory"){
            viewLowInventory.viewLowInventory(connection, menu);
        }
        else if(response.choice === "Add To Inventory"){
            addToInventory.addToInventory(connection, menu);
        }
        else if(response.choice === "Add New Product"){
            addProd.addNewProduct(connection, menu);
        }
        else if(response.choice === "Exit"){
            connection.end();
        }
    
    })
}

module.exports = {
    menu: menu
}