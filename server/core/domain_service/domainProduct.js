const nullishCoalesce = require('../../utils');
const Product = require('../domain/Product/Product');

const createProductDomain = (product, productRequest) => {
    return new Product({
        id: product.id,
        name: nullishCoalesce(productRequest.name, product.name),
        price: nullishCoalesce(productRequest.price, product.price)
    })
}

module.exports = {
    createProductDomain
}