const db = require('../config/database.js');

const UserController = {
    createUser(req, res) {
        let sql = `INSERT INTO users values
              ('${req.body.idUsers}', '${req.body.name}');`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send("User added...");
        });
    },
    updateUserById(req, res) {
        let sql = `UPDATE users SET name = ${req.body.name ? `'${req.body.name}'` : 'name' } WHERE idUsers = ${req.params.id}`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send("User updated...");
        });
    },
    getAllUsers(req, res) {
        let sql = `SELECT * FROM users`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send({msg: "Get users", result});
        });
    },
    getUserById(req, res) {
        let sql = `SELECT * FROM users WHERE idUsers = ${req.params.id}`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send({msg: "Get user by id", result});
        });
    },
    deleteUserById(req, res) {
        let sql = `DELETE FROM users WHERE idUsers = ${req.params.id}`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send("User deleted");
        });
    },
    getUserDetails(req, res) {
        let sql = 
        `
        SELECT DISTINCT users.idUsers, users.name AS 'user_name' 
        FROM users 
        INNER JOIN orders ON orders.id_users = users.idUsers
        ORDER BY users.idUsers;
        `;
        db.query(sql, (err, result_users) => {
            if (err)
                throw err;
            for (let i = 0; i < result_users.length; i++) {
                result_users[i].orders = [];
                const sql = `SELECT * FROM orders WHERE id_users=${result_users[i].idUsers};`;
                db.query(sql, (err, result_orders) => {
                    if (err)
                        throw err;
                    for (let j = 0; j < result_orders.length; j++) {
                        const order = {
                            "idOrder": result_orders[j].idOrders,
                            "date": result_orders[j].date,
                            "products": []
                        };

                        const sql = `
                        SELECT * FROM products 
                        INNER JOIN orders_products ON products.idProducts = orders_products.id_product 
                        WHERE orders_products.id_order = ${result_orders[j].idOrders}
                        `;
                        db.query(sql, (err, result_products) => {
                            for (let k = 0; k < result_products.length; k++) {
                                order.products.push({
                                    "product_name": result_products[k].name,
                                    "amount": result_products[k].amount,
                                    "price": result_products[k].price
                                });
                                if (k === result_products.length - 1) {
                                    result_users[i].orders.push(order);
                                    if (j === result_orders.length - 1 && i === result_users.length - 1) {
                                        res.send({msg: "Get users with orders details", result_users});
                                    }
                                }
                            }

                        });
                    }
                });


            }
        });
    }
}

module.exports = UserController;