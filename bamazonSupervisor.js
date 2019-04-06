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
        else if (choice.choice === "Exit"){
            console.log("Goodbye");
            connection.end();
        }

      })
  }

  function viewProdSalesByDep() {
            let query = connection.query(
`
SELECT 
d.department_id,
p.department_name, 
p.product_sales, 
d.over_head_costs,
p.product_sales - d.over_head_costs AS total_profit
FROM 
	(SELECT 
		MAX(department_name) AS department_name, 
		SUM(product_sales) AS product_sales 
	FROM products 
	GROUP BY department_name
    ) AS p
LEFT JOIN 
departments AS d ON p.department_name = d.department_name;
`
        , function(err, data){
            if(err) throw err;
            console.log("\n");
            console.table(data);
            console.log("\n\n\n");
            // let total_profit = data[0].product_sales - data[0].over_head_costs;
            // let query = connection.query (
            //     `
                
            //     `
            // )
        }
            )
        menu();
  }

  function createDepartment() {
      inquirer.prompt([
          {
              type: "input",
              name: "department_name",
              message: "What is the name of the department?"
          },
          {
            type: "input",
            name: "over_head",
            message: "What are the over head costs?",
            validate: function(value){
                return !isNaN(value) && value > 0;
            }
        }
      ]).then(res => {
          let query = connection.query(
`
INSERT INTO departments(department_ID, department_name, over_head_costs)
VALUES ((SELECT MAX(department_id)+1 FROM departments as d), "${res.department_name}", "${res.over_head}");
`
          )
        listDepartments();
        menu();
      })
  }

  function listDepartments(){
    connection.query("SELECT * FROM departments", function(err, res){
        if(err) throw err;
        console.log("\r\n");
        console.table(res); 
        console.log("\r\n");
    })
}