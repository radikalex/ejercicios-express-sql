const db = require('../config/database')

const checkIfElementExistsByParam = (tableName, paramName, rowName) => {
    return (req, res, next) => {
        let sql = `SELECT * FROM ${tableName} WHERE ${rowName} = '${req.params[paramName]}';`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            if(result.length > 0)
                next();
            else
                res.status(404).send({msg: `No item found with ${paramName} = '${req.params[paramName]}'`});
        });
    };
};

module.exports = checkIfElementExistsByParam;