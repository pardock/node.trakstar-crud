const keepFalsyValue = (value) => {
    if (value === null || value === undefined) {
      return null
    }
    return value
  }
  
  module.exports = {
    keepFalsyValue
  }