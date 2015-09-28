// Custom helpers for project
module.exports = {
  headCss: function(href) {
    // TODO: check that href is the correct link
    if(!this._headCss) this._headCss = [];
    this._headCss.push(href);
    return null;
  },
  headScript: function(src) {
    // TODO: check that href is the correct link
    if(!this._headScript) this._headScript = [];
    this._headScript.push(src);
    return null;
  }
};
