const express = require("express");
const db = require("./config/database");

const PORT = 3000;
const app = express();

app.use("/products", require("./routes/products"))
app.use("/categories", require("./routes/categories"))

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
        "CREATE TABLE products (idProducts INT, name VARCHAR(45), price FLOAT, id_category INT, PRIMARY KEY (idProducts), FOREIGN KEY (id_category) REFERENCES categories (idCategories))";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send("Products table created...");
    });
});


app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`))