const logger = require('winston');
const { appStart } = require('./app')
const { createHttpTerminator } = require('http-terminator');
const init = require('./server/init/initialize')

let server = null, httpTerminator = null;

const closeGracefully = async (signal) => {
    logger.debug(`Received signal to terminate application: ${signal}`)
    await httpTerminator.terminate()
    logger.debug('Closing server...')

}

init.initialize().then(() => {
    server = appStart();
    httpTerminator = createHttpTerminator({ server })
    process.on('SIGINT', closeGracefully)
    process.on('SIGTERM', closeGracefully)
}).catch((error) => logger.error(error))

