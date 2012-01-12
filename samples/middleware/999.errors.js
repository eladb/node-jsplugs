module.exports = function(req, res, next) {
    console.log('in errors');
    return res.end('500 Server Error');
};
