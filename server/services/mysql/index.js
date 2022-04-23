const mysql = require('./connection');

module.exports = {
    init: mysql.initialize,
    connection: mysql.connection,
    query: mysql.query
}