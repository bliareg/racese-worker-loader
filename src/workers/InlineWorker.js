// http://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string

/* eslint-env browser */
/* eslint-disable no-var, vars-on-top, prefer-template */

var main =  self;
var URL = main.URL || main.webkitURL;

module.exports = function inlineWorker(content, url) {
  try {
    try {
      var blob;

      try {
        // BlobBuilder = Deprecated, but widely implemented
        var BlobBuilder =
          main.BlobBuilder ||
          main.WebKitBlobBuilder ||
          main.MozBlobBuilder ||
          main.MSBlobBuilder;

        blob = new BlobBuilder();

        blob.append(content);

        blob = blob.getBlob();
      } catch (e) {
        // The proposed API
        blob = new Blob([content]);
      }

      return URL.createObjectURL(blob);
    } catch (e) {
      return 'data:application/javascript,' + encodeURIComponent(content);
    }
  } catch (e) {
    if (!url) {
      throw Error('Inline worker is not supported');
    }
  }
};
