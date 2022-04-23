const HealthCheckDBRepositoryFactory = require('./HealthCheckRepository')
const mysql = require('../../../services/mysql')

const DATABASE = 'trakstar'

module.exports = {
  HealthCheckDBRepository: HealthCheckDBRepositoryFactory({
    executeQuery: mysql.query.executeQueryFactory(DATABASE)
  })
}