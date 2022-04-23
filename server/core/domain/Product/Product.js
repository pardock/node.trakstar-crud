const DomainObject = require('../../common/DomainObject')
const { keepFalsyValue } = require('../../common/domainObjectUtils')

/**
 * @class Product
 * Class to return Product object
*/
class Product extends DomainObject {
  /**
     * Creates a product instance
     * @param {Object} data - The Product properties
     * @param {Number} data.id
     * @param {String} data.name
     * @param {Number} data.price
     * @param {Boolean} data.active
    */
  constructor (data) {
    super()
    this.id = keepFalsyValue(data.id)
    this.name = keepFalsyValue(data.name)
    this.price = keepFalsyValue(data.price)
    this.active = keepFalsyValue(data.active)
  }
}

module.exports = Product