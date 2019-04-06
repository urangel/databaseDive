const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
  });

  connection.connect(function(err, res) {
    if (err) throw err;
    console.log("Welcome Supervisor")
    menu();
  });

  function menu() {
      inquirer.prompt([
          {
              type: "list",
              name: "choice",
              message: "What would you like to do?",
              choices: ["View Product Sales by Department", "Create New Department", "Exit"]
          }
      ]).then(choice => {
        if (choice.choice === "View Product Sales by Department"){
            viewProdSalesByDep();
        }
          else if (choice.choice === "Create New Department"){
            createDepartment();
        }

      })
  }

  function viewProdSalesByDep() {
      
  }