module.exports = function(req, res, next) {
    console.log('in app');
    return next();
};
