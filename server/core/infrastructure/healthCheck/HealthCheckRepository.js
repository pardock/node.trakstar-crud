const logger = require('winston')

/**
 * HealthCheckDBRepository
*/
const HealthCheckDBRepository = ({ executeQuery }) => {
  function checkDatabase (requestId) {
    logger.debug(`[${requestId}] - Health checkDatabase run`)
    const query = 'SELECT 1'
    return executeQuery(query)
  }

  return {
    checkDatabase
  }
}

module.exports = HealthCheckDBRepository