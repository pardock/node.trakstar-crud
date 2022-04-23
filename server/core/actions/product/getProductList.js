const logger = require('winston')

/**
 * productsActions
 * @param {string} requestId
 * @returns {Promise<import('../../domain/Product/Product')[]>}
 */

/**
 * productsActions - getProductList
 * Action to get products
 * @param {import('../../infrastructure/ProductDBRepository/ProductDBRepository')} productDBRepository
 * @returns {import('../../domain/Product/Product')[]} Product
 */
const getProductList = ({
    productDBRepository
}) => (requestId = '') => {
  logger.info(`[${requestId}] - ProductActions [getProductList] Init`)
  return productDBRepository.getProducts(requestId)
}

module.exports = getProductList