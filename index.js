const express = require("express");
const db = require("./config/database");

const PORT = 3000;
const app = express();

app.use("/products", require("./routes/products"))
app.use("/categories", require("./routes/categories"))
app.use("/users", require("./routes/users"))
app.use("/orders", require("./routes/orders"))

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE express_sql_DB';
    db.query(sql, (err, result) => {
        if (err) throw err;

        res.send('Database created...')
    })
});

app.get("/createtableCategories", (req, res) => {
    let sql =
        "CREATE TABLE categories ( idCategories INT, name VARCHAR(45), PRIMARY KEY (idCategories))";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send("Categories table created...");
    });
});

app.get("/createtableProducts", (req, res) => {
    let sql =
        "CREATE TABLE products (idProducts INT, name VARCHAR(45), price FLOAT, id_category INT, PRIMARY KEY (idProducts), FOREIGN KEY (id_category) REFERENCES categories (idCategories) ON DELETE CASCADE)";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send("Products table created...");
    });
});

app.get("/createtableUsers", (req, res) => {
    let sql =
        "CREATE TABLE users (idUsers INT, name VARCHAR(45), PRIMARY KEY (idUsers))";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send("Users table created...");
    });
});

app.get("/createtableOrders", (req, res) => {
    let sql =
        "CREATE TABLE orders (idOrders INT, date DATE, id_users INT, PRIMARY KEY (idOrders),  FOREIGN KEY (id_users) REFERENCES users (idUsers) ON DELETE CASCADE)";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send("Orders table created...");
    });
});

app.get("/createtableOrdersProducts", (req, res) => {
    let sql =
        "CREATE TABLE orders_products (id_order INT, id_product INT, amount INT, PRIMARY KEY (id_order, id_product),  FOREIGN KEY (id_order) REFERENCES orders (idOrders) ON DELETE CASCADE, FOREIGN KEY (id_product) REFERENCES products (idProducts) ON DELETE CASCADE)";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send("Orders table created...");
    });
});


app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`))