const logger = require("winston");
const { createProductDomain } = require('../../domain_service/domainProduct')

/**
 * productsActions
 * @param {string} requestId
 * @param {import('../../domain/Product/ProductRequest')} productRequest
 * @returns {Promise<import('../../domain/Product/Product')>}
 */

/**
 * productsActions - updateProduct
 * Action to update products
 * @param {import('../../infrastructure/ProductDBRepository/ProductDBRepository')} productDBRepository
 * @returns {import('../../domain/Product/Product')} Product
 */
const updateProduct =
  ({ productDBRepository }) =>
  async (requestId = "", productRequest) => {
    logger.info(`[${requestId}] - ProductActions [updateProduct] Init`);

    const productPersist = await productDBRepository.getOneProduct(productRequest.id);

    const product = createProductDomain(productPersist, productRequest)

    await productDBRepository.updateProduct(
      requestId,
      product
    );

    return productDBRepository.getOneProduct(product.id);
  };

module.exports = updateProduct;
