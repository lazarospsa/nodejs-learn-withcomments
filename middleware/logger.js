//ftiaxnw to middleware
const logger = (req, res, next) => {
    console.log(req.originalUrl, req.method, res.statusCode, req.ip ,new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''))
    next()
}

module.exports = logger