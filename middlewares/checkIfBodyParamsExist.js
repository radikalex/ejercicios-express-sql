const checkIfBodyParamsExist = (paramsNames) => {
  return (req, res, next) => {
    for (const param of paramsNames) {
    	if (!req.body[param] || req.body[param] == "") {
        	res.status(400).send({ msg: `Param ${param} does not exist or is empty` });
        	return;
      	}
    }
    next();
  };
};

module.exports = checkIfBodyParamsExist;
