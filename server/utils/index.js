function nullishCoalesce(value, defaultValue) {
    if (value === null || value === undefined) {
        return defaultValue;
    }
    return value;
}

module.exports = nullishCoalesce;
