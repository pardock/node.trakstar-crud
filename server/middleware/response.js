const _ = require('lodash');

module.exports = (results, req, res, next) => {
    if(_.has(results, 'error')){
        res.status(results.status || results.error.httpStatus).send(results);
    } else {
        const payloadFormatted = {
            timestamp: new Date(),
            path: req.path,
            data: results.data ? results.data : results
        }
        res.status(200).send(payloadFormatted)
    }
}