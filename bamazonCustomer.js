const inquirer = require('inquirer');
const mysql = require("mysql");
const updateProduct = require("./updateProduct");
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
  });
  
  connection.connect(function(err, res) {
    if (err) throw err;
    welcome();
    menu();
  });

  function menu(){
      inquirer.prompt([
          {
              type: "list",
              name: "customerChoice",
              message: "Would you like to buy something or skeddadle?",
              choices: ["BUY", "SKEDADDLE"]
          }
      ])
      .then(response =>{
        if (response.customerChoice === "BUY"){
            buySomething();
        }
        else{
            console.log("Goodbye!");
            connection.end();
        }
    })
    };    
  
  function buySomething() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "item_id",
                message: "What is the ID of the product you want to buy?",
                validate: function(value){
                    return !isNaN(value) && value > 0;
                }
            },
            
            {
                type: "input",
                name: "quantity",
                message: "How many would you like?",
                validate: function(value){
                    return !isNaN(value) && value > 0;
                }
            }
        ])
        .then(answers => {
            let query = connection.query("SELECT * FROM products WHERE item_id = " + answers.item_id, function(err,res){
                if (err) throw err;
                if( res[0].stock_quantity < answers.quantity){
                    console.log("Seems we don't have enough...");
                    menu();

                }
                else{
                    console.log("Thanks for shopping!");
                    let newQuantity = res[0].stock_quantity - answers.quantity;
                    let customerPrice = (answers.quantity * res[0].price).toFixed(2);
                    let newProductSales = res[0].product_sales + parseFloat(customerPrice);
                    console.log("Your total is $" + customerPrice);
                    
                updateProduct.updateProduct(connection, newQuantity, newProductSales, answers.item_id);
                listProducts();
                menu();
                }
            })
        });
}

function listProducts(){
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
        console.log("\r\n");
        console.table(res); 
        console.log("\r\n");
    })
}

function welcome() {
    console.log(`
Choose from our selection:
`)
listProducts();

}