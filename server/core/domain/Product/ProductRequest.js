const Joi = require('joi')
const DomainObject = require('../../common/DomainObject')
const { keepFalsyValue } = require('../../common/domainObjectUtils')

/**
 * @class ProductRequest
 * Class to return ProductRequest object
*/
class ProductRequest extends DomainObject {
  /**
     * Creates a product request instance
     * @param {Object} data - The ProductRequest properties
     * @param {String} data.name
     * @param {Number} data.price
     * @param {Number} data.id
    */
  constructor (data) {
    super()
    this.name = keepFalsyValue(data.name)
    this.price = keepFalsyValue(data.price)
    this.id = keepFalsyValue(data.id)
  }
}

ProductRequest.validate = Joi.object({
    name: Joi.string().trim().min(1).max(100).required(),
    price: Joi.number().positive().precision(2).required()
}).required()

module.exports = ProductRequest