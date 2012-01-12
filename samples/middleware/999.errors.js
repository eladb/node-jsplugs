module.exports = function(req, res, next) {
    console.log('in errors');
    return res.end('error');
};
