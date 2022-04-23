const DomainObject = require('../../common/DomainObject')
const { keepFalsyValue } = require('../../common/domainObjectUtils')

/**
 * @class Health
 * Class to return response in health check service
*/
class Health extends DomainObject {
  /**
     * Creates a health check instance
     * @param {Object} data - The Helath properties
     * @param {Number} data.status
     * @param {String} data.result
    */
  constructor (data) {
    super()
    this.status = keepFalsyValue(data.status)
    this.result = keepFalsyValue(data.result)
  }
}

module.exports = Health