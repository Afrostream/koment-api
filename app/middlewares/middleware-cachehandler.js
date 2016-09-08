module.exports = function (options) {
  return function cacheHandler(req, res, next) {
    res.noCache = function () {
      res.set('Cache-Control', 'max-age=0,private,no-cache,no-store,must-revalidate');
      res.set('Pragma', 'no-cache'); // http 1.0
      res.set('Expires', 'Thu, 01-Jan-1970 00:00:01 GMT'); // proxy
    };
    res.cache = function (duration) {
      res.set('Cache-Control', 'public, max-age=' + (duration || 60) + ', stale-while-revalidate=10');
    };
    res.isStatic = function () {
      res.set('Cache-Control', 'public, max-age=31536000');
    };
    next();
  };
};
