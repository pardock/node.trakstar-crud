const mysql = require('../services/mysql')


const initialize = async () => {
    await mysql.init()
}

module.exports = {
    initialize
}