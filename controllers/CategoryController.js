const db = require('../config/database.js');

const CategoryController = {
    createCategory(req, res) {
        let sql = `INSERT INTO categories values
              ('${req.body.idCategories}', '${req.body.name}');`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send("Category added...");
        });
    },
    updateCategoryById(req, res) {
        let sql = `UPDATE categories SET name = ${req.body.name ? `'${req.body.name}'` : 'name' } WHERE idCategories = ${req.params.id}`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send("Category updated...");
        });
    },
    getAllCategories(req, res) {
        let sql = `SELECT * FROM categories`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send({msg: "Get categories", result});
        });
    },
    getCategoryById(req, res) {
        let sql = `SELECT * FROM categories WHERE idCategories = ${req.params.id}`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send({msg: "Get category by id", result});
        });
    }
}

module.exports = CategoryController;