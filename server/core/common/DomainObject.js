const ALLOWED_TYPES = new Set([
  "undefined",
  "null",
  "boolean",
  "string",
  "number",
]);

const isPlainObject = (val) =>
  val &&
  typeof val === "object" &&
  Object.getPrototypeOf(val) === Object.prototype;

const isValidType = (val) => {
  return (
    ALLOWED_TYPES.has(typeof val) ||
    val instanceof DomainObject ||
    val === null ||
    val instanceof Date ||
    Array.isArray(val) ||
    isPlainObject(val)
  );
};

const getPropertyValue = (val) => {
  if (val instanceof DomainObject) {
    return val.toObject();
  }

  if (val instanceof Date) {
    return val.toISOString();
  }

  if (Array.isArray(val)) {
    const result = [];
    for (const element of val) {
      if (isValidType(element)) {
        result.push(getPropertyValue(element));
      }
    }
    return result;
  }

  if (isPlainObject(val)) {
    // Get recursively non function properties of plain objects
    const result = {};
    Object.entries(val).forEach((entry) => {
      const [key, element] = entry;
      if (isValidType(element)) {
        result[key] = getPropertyValue(element);
      }
    });
    return result;
  }

  return val;
};

class DomainObject {
  toObject() {
    const result = {};
    Object.entries(this).forEach((entry) => {
      const [key, val] = entry;
      if (isValidType(val)) {
        result[key] = getPropertyValue(val);
      }
    });

    return result;
  }
}

module.exports = DomainObject;
