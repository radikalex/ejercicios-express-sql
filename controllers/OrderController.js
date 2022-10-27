const db = require('../config/database.js');

const OrderController = {
    createOrder(req, res) {
        console.log(req.body);
        let sql = `INSERT INTO orders values
              ('${req.body.idOrders}', '${req.body.date}', '${req.body.id_users}');`;
        let sql2 = `INSERT INTO orders_products values`;
        for (const product of req.body.products) {
            sql2 += ` ('${req.body.idOrders}', '${product[0]}', '${product[1]}'),`
        }
        sql2 = sql2.slice(0, -1);
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send("Order added...");
        });
        db.query(sql2, (err, result) => {
            if (err) throw err;
        });
    },
    getAllOrders(req, res) {
        let sql = `
        SELECT orders.idOrders, orders.date, users.name AS "user_name" 
        FROM orders INNER JOIN users ON users.idUsers = orders.id_users 
        ORDER BY orders.idOrders;
        `;
        db.query(sql, (err, result_orders) => {
            if (err) throw err;
            for (let i = 0; i < result_orders.length; i++) {
                result_orders[i].products = []
                const sql = `
                SELECT * FROM products 
                INNER JOIN orders_products ON products.idProducts = orders_products.id_product 
                WHERE orders_products.id_order = ${result_orders[i].idOrders}
                `
                db.query(sql, (err, result_products) => {
                    for (const product of result_products) {
                        result_orders[i].products.push({
                            "product_name": product.name,
                            "amount": product.amount,
                            "price": product.price
                        })
                    }
                    if(i === result_orders.length - 1)
                        res.send({msg: "Get orders", result_orders});
                })
            }
        });
    }
}

module.exports = OrderController;