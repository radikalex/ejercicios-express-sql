const db = require('../config/database.js');

const ProductController = {
    createProduct(req, res) {
        let sql = `INSERT INTO products values
              (${req.body.idProducts}, '${req.body.name}', ${req.body.price}, ${req.body.id_category});`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send("Product added...");
        });
    },
    updateProductById(req, res) {

    },
    getAllProducts(req, res) {
        let sql = `SELECT * FROM products;`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send({msg: "Get products", result});
        });
    },
    getAllProductsWithCategory(req, res) {

    },
    getProductById(req, res) {

    },
    getAllProductsPriceDesc(req, res) {

    },
    getAllProductByName(req, res) {

    },
    deleteProductById(req, res) {

    },
}

module.exports = ProductController;