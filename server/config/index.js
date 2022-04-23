const app = {
    port: process.env.PORT || 3000,
}

const mysql = {
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT || 6,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
}

module.exports = {
    app,
    mysql
}