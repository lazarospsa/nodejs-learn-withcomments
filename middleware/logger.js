
//ftiaxnw to middleware
const logger = (req, res, next) => {
    console.log(req.originalUrl, new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''))
    next()
}

module.exports = logger