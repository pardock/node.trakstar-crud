const logger = require("winston");
const { products } = require("../../../routes/routes");
const { transformRowDataToProductDomain } = require("./helper");
const { STATUS_PRODUCT } = require("../../../config/constants");
const { NotFoundError } = require("../../../errors");

/**
 * ProductDBRepository
 */

const TABLE = "products";

const ProductDBRepository = ({ executeQuery }) => {
  async function getProducts(requestId = "", status = STATUS_PRODUCT.ACTIVE) {
    logger.debug(`[${requestId}] - running get products`);
    const query = `select * from ${TABLE} where active = ?`;
    const rowData = await executeQuery(query, [status]);

    return rowData.map((r) => transformRowDataToProductDomain(r));
  }

  async function createProduct(requestId, name, price) {
    logger.debug(`[${requestId}] - running create product`);
    const query = `insert into ${TABLE} (name, price) values(?,?)`;
    const result = await executeQuery(query, [name, price]);
    return result.affectedRows === 1 ? result.insertId : null;
  }

  async function updateProduct(requestId, product) {
    logger.debug(`[${requestId}] - running update product`);
    const query = `update ${TABLE} set name=?, price= ? where product_id = ?`;
    const result = await executeQuery(query, [
      product.name,
      product.price,
      product.id,
    ]);

    return result.affectedRows === 1;
  }

  async function softDeleteProduct(requestId, id) {
    logger.debug(`[${requestId}] - running soft delete product`);
    const query = `update ${TABLE} set active = ? where product_id = ?`;
    const result = await executeQuery(query, [STATUS_PRODUCT.INACTIVE, id]);

    return result.affectedRows === 1;
  }

  async function getOneProduct(
    id,
    requestId = "",
    status = STATUS_PRODUCT.ACTIVE
  ) {
    logger.debug(`[${requestId}] - running get one products`);
    const query = `select * from ${TABLE} where active = ? and product_id = ?`;
    const rowData = await executeQuery(query, [status, id]);

    if(rowData.length === 0){
        throw new NotFoundError();
    }

    return transformRowDataToProductDomain(rowData[0]);
  }

  async function findByName(name, requestId = '', status=STATUS_PRODUCT.ACTIVE){
    logger.debug(`[${requestId}] - running find by name`);
    const query = `select * from ${TABLE} where active = ? and lower(name) = ?`;
    const results = await executeQuery(query, [status, `%${name.toLowerCase()}%`]);

    return results.map((r) => transformRowDataToProductDomain(r));
  }

  return {
    getProducts,
    createProduct,
    updateProduct,
    softDeleteProduct,
    getOneProduct,
    findByName,
  };
};

module.exports = ProductDBRepository;
