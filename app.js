require('dotenv').config({ path : `${process.cwd()}/config/.env`})

const { app: appConfig } = require('./server/config');

global.__base = __dirname;
const middleware = require('./server/middleware');


const logger = require('winston');

const express = require('express');
const { urlencoded, json } = require('body-parser');
const helmet = require('helmet');


const app = express();

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(middleware.requestId)
app.use(helmet())
app.use(middleware.accessControl)

//routes
require('./server/routes/index')(app)

app.use(middleware.response)

const appStart = () => app.listen(appConfig.port, err => {
    if(err){
        logger.error(`Occurs an error starting applicacion, ${err}`)
        return
    }

    logger.info(`Server running on port: ${appConfig.port}`)
    return
})

module.exports = {
    app,
    appStart
}