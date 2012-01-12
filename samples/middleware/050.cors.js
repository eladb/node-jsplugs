module.exports = function(req, res, next) {
    console.log('in cors');
    return next();
};
