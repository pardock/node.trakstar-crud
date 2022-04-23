const routes = require('./routes');

module.exports = (app) => {
    app.use(routes.root, require('./api/health'))
    app.use(routes.root, require('./api/products'))
}