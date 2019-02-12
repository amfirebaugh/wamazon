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
            // console.log(chosenProduct.product_name);
            // console.log(chosenProduct.stock_quantity); // this is the stock_quantity from the table

            // determine if there is enough stock of the item the client is trying to purchase
            if (chosenProduct.stock_quantity > parseInt(answer.quantity)) {
            // if the stock_quantity is greater than then quantity asked for from the user...then update the table and tell client the cost of their order
            // newQuantity doesn't seem to be working...or the update doesn't seem to be working
            var newQuantity = chosenProduct.stock_quantity - answer.quantity;
            console.log(newQuantity); // this is working... however the UPDATE below is not working...
            // console.log(answer.newQuantity); undefined
            // console.log(chosenProduct.newQuantity); undefined
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                {
                    stock_quantity: newQuantity
                },
                {
                    id: chosenProduct.id
                }
                ],
                function(error) {
                    if (error) {
                        throw err;
                    }
                }
            );
            // console.log(chosenProduct.price);
            // console.log(chosenProduct.price * answer.quantity);
            var orderPrice = chosenProduct.price * answer.quantity;
            console.log("The cost of your order is: " + orderPrice);
            console.log(chosenProduct);
            // I'D LIKE TO CODE IN AN INQUIRER PROMPT TO EITHER YES --> purchase(); OR NO --> exit();
            // purchase();
            process.exit();

            }
            else {
            // If client asked for too many of an item the below code begins
            console.log("Sorry, we do not currently that quantity of your selected item.");
            // I'D LIKE TO CODE IN AN INQUIRER PROMPT TO EITHER YES --> purchase(); OR NO --> exit();
            // purchase();
            process.exit();
            }
         // End the .then promise/function
         });
     });
    }