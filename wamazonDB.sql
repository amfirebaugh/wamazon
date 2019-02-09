DROP DATABASE IF EXISTS wamazon;
CREATE DATABASE wamazon;

USE wamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(100) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("V-Neck T-Shirt", "Clothing", 10.50, 55);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Moon Pendant Necklace", "Jewelry", 25.99, 28);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Table-Top Lamp", "Furniture", 47.87, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Silverware Set", "Kitchen", 24.99, 71);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lavendar Bar Soap (6)", "Personal Care", 12.69, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Walk Your Own Path", "Books", 14.95, 26);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sectional Couch", "Furniture", 399.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Women's Jeans", "Clothing", 34.95, 62);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("10-Piece Pot and Pan Set", "Kitchen", 75.89, 47);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shampoo and Conditioner Bundle", "Personal Care", 18.59, 19);

SELECT * FROM products;