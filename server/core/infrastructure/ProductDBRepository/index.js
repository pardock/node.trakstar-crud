const ProductDBRepositoryFactory = require('./ProductDBRepository')
const mysql = require('../../../services/mysql')

const DATABASE = 'trakstar'

module.exports = {
    ProductDBRepository: ProductDBRepositoryFactory({
    executeQuery: mysql.query.executeQueryFactory(DATABASE)
  })
}