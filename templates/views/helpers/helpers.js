// Custom helpers for project
module.exports = {
  headCss: function(href) {
    // TODO: check that href is the correct link
    if(!this._headCss) this._headCss = [];
    this._headCss.push(href);
    return null;
  },
  headScript: function(src) {
    // TODO: check that src is the correct link
    if(!this._headScript) this._headScript = [];
    this._headScript.push(src);
    return null;
  },
  imgUrl: function(url) {
    var newUrl = url;
    var production = process.env.NODE_ENV === 'production';
    if (production) {
      var prefix = process.env.CDN_IMAGES_URL || '';
    newUrl = prefix + url;
    }
    return newUrl;
  }
};
