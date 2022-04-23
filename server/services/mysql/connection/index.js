const logger = require("winston");
const connectionUtils = require("./connection_utils");
const PromiseBB = require('bluebird');

const database = {
    trakstar: {
        pool: null,
    }
};

/**
 * initialize
 */
const initialize = async() => {
  logger.info("[MYSQL] - Database connection pool Initialized.");
  database.trakstar.pool = await connectionUtils.createConnectionPool();
}

/**
 *getSqlConnection
 * @param db
 */
const getSqlConnection = async (db) => {
  return database[db].pool.getConnection().disposer((connection) => {
    connection.release();
  });
}

const executeQuery = (database, sql, values) => {
    return PromiseBB.using(getSqlConnection(database),(conn) => {
        logger.debug('Runing sql script')
        return conn.query(sql, values).then(results => results)
    })
}

const executeQueryFactory = database => (sql, values) => {
    return PromiseBB.using(getSqlConnection(database),(conn) => {
        logger.debug('Runing sql script')
        return conn.query(sql, values).then(results => results)
    })
}

module.exports = {
  initialize,
  connection: getSqlConnection,
  query : {
    executeQuery,
    executeQueryFactory,
  }
};
