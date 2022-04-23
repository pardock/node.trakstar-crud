const Product = require("../../domain/Product/Product")

const transformRowDataToProductDomain = (row) => {
    return new Product({
        id: row.product_id,
        name: row.name,
        price: row.price,
        active: row.active
    })
}

module.exports = {
    transformRowDataToProductDomain,
}