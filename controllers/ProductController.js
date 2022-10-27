const db = require('../config/database.js');

const ProductController = {
    createProduct(req, res) {
        let sql = `INSERT INTO products values
              (${req.body.idProducts}, '${req.body.name}', ${req.body.price}, ${req.body.id_category});`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send("Product added...");
        });
    },
    updateProductById(req, res) {
        let sql = `
        UPDATE products 
        SET name = ${req.body.name ? `'${req.body.name}'` : 'name' }, 
        price = ${req.body.price ? `'${req.body.price}'` : 'price' }, 
        id_category = ${req.body.id_category ? `'${req.body.id_category}'` : 'id_category' } 
        WHERE idProducts = ${req.params.id}`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send("Product updated...");
        });
    },
    getAllProducts(req, res) {
        let sql = `SELECT * FROM products;`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send({msg: "Get products", result});
        });
    },
    getAllProductsWithCategory(req, res) {
        let sql = `
        SELECT products.name AS 'product_name', categories.name AS 'category' 
        FROM products 
        INNER JOIN categories 
        ON products.id_category = categories.idCategories;
        `;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send({msg: "Get products with category", result});
        });
    },
    getProductById(req, res) {
        let sql = `SELECT * FROM products WHERE idProducts = ${req.params.id}`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send({msg: "Get product by id", result});
        });
    },
    getAllProductsPriceDesc(req, res) {
        let sql = `SELECT * FROM products ORDER BY price DESC`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send({msg: "Producs order by price desc", result});
        });
    },
    getProductByName(req, res) {
        let sql = `SELECT * FROM products WHERE name = '${req.params.name}'`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send({msg: "Get product by id", result});
        });
    },
    deleteProductById(req, res) {
        let sql = `DELETE FROM products WHERE idProducts = ${req.params.id}`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send("Product deleted");
        });
    },
}

module.exports = ProductController;