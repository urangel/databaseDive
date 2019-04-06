const inquirer = require("inquirer");
const update = require("./updateProduct");

function addToInventory(connection, menu) {
    inquirer.prompt([
        {
            type: "input",
            name: "item_id",
            message: "What is the item_id of product you would like to restock?",
            validate: function(value){
                return !isNaN(value) && value > 0;
            }
        },
        {
            type: "input",
            name: "amount",
            message: "What will be the restock quantity?",
            validate: function(value){
                return !isNaN(value) && value > 0;
            }
        }
    ]).then(function(response){
        //here would be good to start creating modules for your functions and bring in the update function
        let query = connection.query(
            `
            SELECT *
            FROM products
            WHERE item_id = ${response.item_id}
            `, function (err, res){
                if (err) throw err;
                let newQuantity = res[0].stock_quantity + parseInt(response.amount);
                update.updateProduct(connection, newQuantity, res[0].product_sales, response.item_id);
                console.log("You have added to the inventory! View Products to see your change.")
                menu(connection);
            }
        )
    })
    
}

module.exports = {
    addToInventory: addToInventory
}