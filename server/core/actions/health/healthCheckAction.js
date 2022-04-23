const logger = require('winston')
const Health = require('../../domain/health/Health')

/**
 * healthCheckAction
 * @param {string} requestId
 * @returns {Promise<import('../../domain/health/Health')>}
 */

/**
 * healthCheckActionAction
 * Health check directo to database
 * @param {import('../../infrastructure/healthCheck/HealthCheckRepository')} healthCheckDBRepository
 * @returns {import('../../domain/health/Health')} Health
 */
const healthCheckAction = ({
  healthCheckDBRepository
}) => async (requestId = '') => {
  logger.info(`[${requestId}] - HealthActions[healthCheckAction] Init`)
  const response = await healthCheckDBRepository.checkDatabase(requestId)
  return new Health({ status: 200, result: JSON.stringify(response[0]) })
}

module.exports = healthCheckAction