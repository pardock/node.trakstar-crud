const logger = require("winston");
const app = require("express").Router();

const ROUTES = require("../routes");

const { ApplicationServiceError } = require("../../errors");

const productActions = require("../../core/actions/product");
const {
  validate: joiValidation,
  bodyValidation,
  paramValidation,
} = require("../../middleware/joiValidation");
const ProductRequest = require("../../core/domain/Product/ProductRequest");
const { idValidator } = require("../../core/domain/Product/validations");

/**
 * @route
 * @verb GET
 * @name product
 * @endpoint /api/products
 * @desc Get list of products
 */
app.get(ROUTES.products.root, async (req, res, next) => {
  const { requestId } = req;
  try {
    logger.info(`[${requestId}]/api/product --> invoked`);
    const products = await productActions.getProductList(requestId);
    next(products.map((p) => p.toObject()));
  } catch (err) {
    logger.error(`[${requestId}]Problem retrieving list of products`, err);
    next(new ApplicationServiceError("Problem retrieving list of products"));
  }
});

/**
 * @route
 * @verb POST
 * @name product
 * @endpoint /api/products
 * @desc Create new product
 */
app.post(
  ROUTES.products.root,
  joiValidation([bodyValidation(ProductRequest.validate)]),
  async (req, res, next) => {
    const { requestId } = req;
    try {
      logger.info(`[${requestId}]/api/product --> POST invoked`);
      const { name, price } = req.body;
      const requestObject = new ProductRequest({ name, price });
      const result = await productActions.createProduct(requestId,requestObject )
      next(result.toObject());
    } catch (error) {
      logger.error(`[${requestId}]Problem creating product`, error);
      next(new ApplicationServiceError("Problem creating product"));
    }
  }
);

/**
 * @route
 * @verb PUT
 * @name products
 * @endpoint /api/products/:id
 * @desc Update a product
 */
app.put(
  `${ROUTES.products.root}${ROUTES.products.getOne}`,
  joiValidation([
    paramValidation("id", idValidator),
    bodyValidation(ProductRequest.validate),
  ]),
  async (req, res, next) => {
    const { requestId, params } = req;
    logger.info(`[${requestId}]/api/product/:id --> PUT invoked`);
    try {
      const { id } = params;
      const { name, price } = req.body;
      const requestObject = new ProductRequest({ name, price, id });
      const response = await productActions.updateProduct(requestId, requestObject)
      next(response.toObject());
    } catch (error) {
      logger.error(`[${requestId}]Problem updating product`, error);
      next(new ApplicationServiceError("Problem updating product"));
    }
  }
);

/**
 * @route
 * @verb DELETE
 * @name products
 * @endpoint /api/products/:id
 * @desc Soft delete a product
 */
app.delete(
  `${ROUTES.products.root}${ROUTES.products.getOne}`,
  joiValidation([paramValidation("id", idValidator)]),
  async (req, res, next) => {
    const { requestId, params } = req;
    logger.info(`[${requestId}]/api/product/:id --> DELETE invoked`);
    try {
      const { id } = params;
      const result = await productActions.deleteProduct(requestId, id)
      next({ result });
    } catch (error) {
      logger.error(`[${requestId}]Problem deleting product`, error);
      next(new ApplicationServiceError("Problem deleting product"));
    }
  }
);

module.exports = app;
