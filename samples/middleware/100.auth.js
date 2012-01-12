module.exports = function(req, res, next) {
    console.log('in auth');
    return next();
};
