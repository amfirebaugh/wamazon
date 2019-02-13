# Wamazon Node.js and MySQL App

This is a CLI Node.js app that uses inquirer.js to prompt the user with menus to move them through the application which will execute various MySQL queries throughout to interact with a database of products. The user can chose to run the Customer or the Manager applications with different functionalities.

# Wamazon Customer

Start this application with command line prompt of "node wamazonCustomer.js".
The user is immediately prompted with the current table's list of products from the MySQL database, and asked to chose which one he/she would like to purchase. Then the user is immediately prompted how many of this product he/she would like to purchase.

![Wamazon Customer Beginning](####)
![Wamazon Customer Second Prompt](####)

If there is enough of the product, the order is filled (database updated) and the user is told the cost. If the user asks for more product than is available, however, then they are prompted that there is not enough in stock, and they are prompted with another menu of options.

![Customer Order Filled](####)

![Customer Order Declined and New Menu](####)

# Wamazon Manager

Start this application with the command line prompt of "node wamazonManager.js".
The user is immediately prompted with the main menu of options that include: "View Products for Sale," "View Low Inventory," "Add/Subtrack to Inventory," "Add New Product," and "Exit." As expected, if the user choses the Exit option, the application is simply shut down. At the end of all other options the main menu is prompted back for the manager to continue working.

![Wamazon Manager Main Menu](####)

### View Products for Sale

This option simply prints out the current table of products for the manager to view the current status of all of the stock at any time.

![Manager View Products 1](####)
![Manager View Products 2](####)

### View Low Inventory

This option will print out any rows of data if the current stock is less than 5 items of any products in the table.

![Manager View Low Inventory](####)

### Add/Subtrack to Inventory

This option immediately prompts the user to chose which item he/she would like to alter the stock quantity for. Then he/she is prompted to enter the new quantity for this product. The database is immediately updated, and the user is prompted that if he/she would like to view these changes then to select "View Products for Sale" from the menu.

![Manager Update Inventory 1](####)
![Manager Update Inventory 2](####)

### Add New Product

This option immediately prompts the user for the name of the new product, then the department, price, and stock quantity. The database is immediately updated, and again the user can view these changes if he/she selects "View Products for Sale" from the menu.

![Manager Add New Product 1](####)
![Manager Add New Product 2](####)
