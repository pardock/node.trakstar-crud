const ROUTES = {
    root: '/api',
    health: '/health',
    products: {
        root: '/products',
        getOne: '/:id'
    }
}

module.exports = ROUTES;