const { ProductDBRepository } = require("../../infrastructure/ProductDBRepository");

module.exports = {
  getProductList: require("./getProductList")({
    productDBRepository: ProductDBRepository,
  }),
  createProduct: require('./createProduct')({
    productDBRepository: ProductDBRepository,
  }),
  updateProduct: require('./updateProduct')({
    productDBRepository: ProductDBRepository,
  }),
  deleteProduct: require('./deleteProduct')({
    productDBRepository: ProductDBRepository,
  }),
};
