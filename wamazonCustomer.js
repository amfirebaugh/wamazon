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
    purchase();
  });

function purchase() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) {
            throw err;
        }
        inquirer
        .prompt([
            {
              name: "choice",
              type: "rawlist",
              choices: function() {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].product_name);
                }
                return choiceArray;
              },
              message: "Which product are you interested in purchasing?"
            },
            {
              name: "quantity",
              type: "input",
              message: "How many of this product would you like to purchase? Please enter an whole number (integer).",
              validate: function(value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                  return false;
              }
            }
        ]).then(function(answer) {
            // this is the variable we will use to store the client's input for their chosen product
            var chosenProduct;
            
            for (var i = 0; i < results.length; i++) {
                if (results[i].product_name === answer.choice) {
                    chosenProduct = results[i];
                }
            }

            // determine if there is enough stock of the item the client is trying to purchase
            if (chosenProduct.stock_quantity > parseInt(answer.quantity)) {
            // if the stock_quantity is greater than then quantity asked for from the user...then update the table and tell client the cost of their order

            var newQuantity = chosenProduct.stock_quantity - parseInt(answer.quantity);
            
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                {
                    stock_quantity: newQuantity
                },
                {
                    item_id: chosenProduct.item_id
                }
                ],
                function(error) {
                    if (error) {
                        throw err;
                    }
                }
            );

            var orderPrice = chosenProduct.price * answer.quantity;
            // below shows the client the cost of their order, reminds them what they ordered, how many, and displays the price in the format example: $21.00 (two decimals)
            console.log("The cost of your order of " + answer.quantity + " " + chosenProduct.product_name + "(s) is: $" + orderPrice.toFixed(2) + "\n");

            } else {
            // If client asked for too many of an item the below code begins
            console.log("Sorry, we do not currently that quantity of your selected item.");
            }

            // At the end of the original purchase request this prompt comes up so the client can chose to make another purchase or exit the application.
            inquirer.prompt({
                name: "purchaseORexit",
                type: "list",
                message: "Would you like to make another purchase, or exit Wamazon?",
                choices: ["Another Purchase", "Exit"]
            }).then(function(resp) {
                if (resp.purchaseORexit === "Another Purchase") {
                    purchase();
                } else if (resp.purchaseORexit === "Exit") {
                    process.exit();
                }
            });
         // End the .then promise/function from the answer from the purchase function
        });
    });
}