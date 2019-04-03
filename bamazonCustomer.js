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
  
  connection.connect(function(err, res) {
    if (err) throw err;
    prompt();
    afterConnection();
  });
  
  function afterConnection() {
    // listProducts();
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
                    console.log("Insufficient quantity!");
                    connection.end();

                }
                else{
                    console.log("You got it bub!");
                    let newQuantity = res[0].stock_quantity - answers.quantity;
                    console.log(res[0].price);
                    let customerPrice = (answers.quantity * res[0].price).toFixed(2);
                    console.log("Your total is $" + customerPrice);
                    // console.log("The new quantity is " + newQuantity);
                    
                updateProduct(newQuantity, answers.item_id);

                connection.query("SELECT * FROM products", function(err, res) {
                    if (err) throw err;
                    console.table(res);})

                connection.end();
                }
            })
        });
}

function listProducts(){
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
        console.log("\r\n");
        console.table(res);       
    })
}

function updateProduct(value, id){
    connection.query("UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: value
      },
      {
        item_id: id
      }
    ],
    function(err, res) {
      console.log(res.affectedRows);
    }
    );
}

function prompt() {
    console.log(`
Choose from our selection:
`)
listProducts();

}

// module.exports = listProducts();