module.exports = function(req, res, next) {
    console.log('in log');
    return next();
};
