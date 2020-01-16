function logger(request, response, next) {
    const { method, originalURL } = request;
    console.log(`[${new Date().toISOString()}] ${method} to ${originalURL}`);
    next();
}

module.exports = logger;