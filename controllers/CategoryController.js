const db = require('../config/database.js');

const CategoryController = {
    createCategory(req, res) {
        let sql = `INSERT INTO categories values
              ('${req.body.idCategories}', '${req.body.name}');`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send("Category added...");
        });
    },
    updateCategoryById(req, res) {

    },
    getAllCategories(req, res) {
        let sql = `SELECT * FROM categories;`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send({msg: "Get categories", result});
        });
    },
    getCategoryById(req, res) {

    }
}

module.exports = CategoryController;