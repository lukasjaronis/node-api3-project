function logger(req, res, next) {
    const {method, originalUrl} = req;
    console.log(`[${new Date().toISOString()}] ${method} to ${originalUrl}`);
    next();
}

module.exports = logger;