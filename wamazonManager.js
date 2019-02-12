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
    console.log("connected as id " + connection.threadId);
    menu();
  });

function menu() {  
    inquirer
    .prompt({
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
    }).then(function(answer) {
        if (answer.choice === "View Products for Sale") {
            select();
        } else if (answer.choice === "View Low Inventory") {
            selectLow();
        } else if (answer.choice === "Add to Inventory") {
            addQuantity();
        } else if (answer.choice === "Add New Product") {
            addProduct();
        } else if (answer.choice === "Exit") {
            process.exit();
        }
    });
    
}

// Can make below look better (the console.log)... do not want the JSON.stringify because it's one big paragraph, hard to read...
function select() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, results, fields) {
        if (err) {
            throw err;
        }
        // below prints out the information for the manager to see the current stock
        for (var i = 0; results.length > 0; i++) {
            console.log("\n" + results[i].item_id + " " + results[i].product_name + " Price: " + results[i].price + " Quantity in Stock: " + results[i].stock_quantity);
        }
    });
    // BELOW ISN'T WORKING? IT'S NOT RETURNING TO MY MENU?? IF I INSERT IT A LINE ABOVE THOUGH IT BREAKS
    menu();
}

function selectLow() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, results) {
        if (err) {
            throw err;
        }
        // below prints out the information for the manager to see any low-stock items
        
        // BELOW SEEMS TO WORK, BUT AN ERROR PRINTS AFTER IT??
        for (var i = 0; results.length > 0; i++) {
            var productAmount = parseInt(results[i].stock_quantity);
            if (productAmount <= 5) {
                console.log("\n" + results[i].item_id + " " + results[i].product_name + " Price: " + results[i].price + " Quantity in Stock: " + results[i].stock_quantity);
            }
        }
    });
}

function addQuantity() {
    console.log("addquantity function");
}

function addProduct() {
    console.log("addproduct function");
}
