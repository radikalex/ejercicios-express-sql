const db = require('../config/database')

const checkIfIdAvalaible = (tableName, idName) => {
    return (req, res, next) => {
        let sql = `SELECT * FROM ${tableName} WHERE ${idName} = '${req.body[idName]}';`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            if(result.length === 0)
                next();
            else
                res.status(400).send({msg: `The ${idName} you chose is already in use. Try another.'`});
        });
    };
};

module.exports = checkIfIdAvalaible;