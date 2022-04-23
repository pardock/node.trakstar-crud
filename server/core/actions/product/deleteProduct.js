const logger = require("winston");

/**
 * productsActions
 * @param {string} requestId
 * @param {Number} id
 * @returns {Boolean}
 */

/**
 * productsActions - deleteProduct
 * Action to delete products
 * @param {import('../../infrastructure/ProductDBRepository/ProductDBRepository')} productDBRepository
 * @returns {Boolean} 
 */
const deleteProduct =
  ({ productDBRepository }) =>
  async (requestId = "", id) => {
    logger.info(`[${requestId}] - ProductActions [deleteProduct] Init`);

    const productPersist = await productDBRepository.getOneProduct(id);

    return productDBRepository.softDeleteProduct(
      requestId,
      productPersist.id
    );

  };

module.exports = deleteProduct;
