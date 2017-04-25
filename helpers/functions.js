module.exports = {
  noSlash: function(url) {
    // source: http://stackoverflow.com/a/6680858
    if(url.substr(-1) === '/') {
        return url.substr(0, url.length - 1);
    }
    return url;
  }
};
