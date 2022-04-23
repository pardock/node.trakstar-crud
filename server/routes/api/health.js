const logger = require('winston')
const app = require('express').Router()

const ROUTES = require('../routes')

const { ApplicationServiceError } = require('../../errors');

const healthActions = require('../../core/actions/health')

/**
 * @route
 * @verb GET
 * @name health
 * @endpoint /api/health
 * @desc Health check to the repository
 */

app.get(
  ROUTES.health,
  async (req, res, next) => {
    const { requestId } = req
    try {
      logger.info('checkServerStatus --> invoked')
      const healthResponse = await healthActions.healthCheckAction(requestId)
      logger.info(`checkServerStatus --> Server is up and mysql is good. Sql response : ${healthResponse.result}`)
      next(healthResponse.toObject())
    } catch (err) {
      logger.error('Problem retrieving mysqldb connection.', err)
      next(new ApplicationServiceError("Couldn't connect to database"))
    }
  }
)

module.exports = app