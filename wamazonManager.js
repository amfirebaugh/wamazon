// Dependencies:
var inquirer = require('inquirer');
var mysql = require('mysql');

// Connecting:
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "41A75!m03f",
    database: "wamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    menu();
  });

function menu() {  
    inquirer
    .prompt({
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add/Subtrack to Inventory", "Add New Product", "Exit"]
    }).then(function(answer) {
        if (answer.choice === "View Products for Sale") {
            select();
        } else if (answer.choice === "View Low Inventory") {
            selectLow();
        } else if (answer.choice === "Add/Subtrack to Inventory") {
            addQuantity();
        } else if (answer.choice === "Add New Product") {
            addProduct();
        } else if (answer.choice === "Exit") {
            connection.end();
        }
    });
    
}

// Can make below look better (the console.log)... do not want the JSON.stringify because it's one big paragraph, hard to read...
function select() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, results) {
        if (err) {
            throw err;
        }
        // below prints out the information for the manager to see the current stock
        for (var i = 0; i < results.length; i++) {
            console.log("\n" + results[i].item_id + " " + results[i].product_name + ", Price: " + results[i].price + ", Quantity in Stock: " + results[i].stock_quantity);
            
        } 
        menu();
    });   
}

function selectLow() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, results) {
        if (err) {
            throw err;
        }
        // below prints out the information for the manager to see any low-stock items
        
        // BELOW SEEMS TO WORK, BUT AN ERROR PRINTS AFTER IT??
        for (var i = 0; i < results.length; i++) {
            var productAmount = parseInt(results[i].stock_quantity);
            if (productAmount <= 5) {
                console.log("\n" + "ID: " + results[i].item_id + " " + results[i].product_name + ", Price: " + results[i].price + ", Quantity in Stock: " + results[i].stock_quantity);
            }
        }
        menu();
    });
}

function addQuantity() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, results) {
        if (err) {
            throw err;
        }
        inquirer.prompt([
            {
              name: "addStockChoice",
              type: "rawlist",
              choices: function() {
                  var addStockChoiceArray = [];
                  for (var i = 0; i < results.length; i++) {
                      addStockChoiceArray.push(results[i].product_name);
                  }
                  return addStockChoiceArray;
              },
              message: "Which item would you like to increase the stock quantity?"
            },
            {
              name: "addStockAmount",
              type: "input",
              message: "What should be the new stock quantity for this product? Please enter a whole number (integer).",
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            }
        ]).then(function(answer) {
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
                if (results[i].product_name === answer.addStockChoice) {
                    chosenItem = results[i];
                }
            }
            
            connection.query("UPDATE products SET ? WHERE ?", 
              [
                {
                    stock_quantity: answer.addStockAmount
                },
                {
                    item_id: chosenItem.item_id
                }
              ],
              function(error) {
                if (error) {
                    throw error;
                }
            });
            connection.query("SELECT * FROM products WHERE ?",
              [
                  {
                      item_id: chosenItem.item_id
                  }
              ],
              function(error) {
                  if (error) {
                      throw error;
                  }
              });
              console.log("To view these results, select the 'View Products for Sale' option in the Menu.");
              menu();
        });
        
    });
    
}

function addProduct() {
    console.log("addproduct function");
}
