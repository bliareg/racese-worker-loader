// http://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string

var main = self
var URL = main.URL || main.webkitURL;

module.exports = function (content, url) {
  try {
    try {
      var blob;

      try {
        // BlobBuilder = Deprecated, but widely implemented
        var BlobBuilder = main.BlobBuilder ||
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
