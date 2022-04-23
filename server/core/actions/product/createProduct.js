const logger = require('winston')
const { BadRequestError } = require('../../../errors')

/**
 * productsActions
 * @param {string} requestId
 * @param {import('../../domain/Product/ProductRequest')} productRequest
 * @returns {Promise<import('../../domain/Product/Product')>}
 */

/**
 * productsActions - createProduct
 * Action to create products
 * @param {import('../../infrastructure/ProductDBRepository/ProductDBRepository')} productDBRepository
 * @returns {import('../../domain/Product/Product')} Product
 */
const createProduct = ({
    productDBRepository
}) => async (requestId = '', productRequest ) => {
  logger.info(`[${requestId}] - ProductActions [createProduct] Init`)

  const exists = await productDBRepository.findByName(productRequest.name, requestId);
  if(exists.length > 0){
    throw new BadRequestError("Product already exists");
  }

  const productId = await productDBRepository.createProduct(requestId, productRequest.name, productRequest.price)
  if(!productId){
      throw new BadRequestError("Unable to create product")
  }

  return productDBRepository.getOneProduct(productId);
}

module.exports = createProduct