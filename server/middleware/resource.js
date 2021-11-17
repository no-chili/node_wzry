module.exports = option => {
    return async(req, res, next) => {
        const ModelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../models/${ModelName}.js`)
        next()
    }
}
