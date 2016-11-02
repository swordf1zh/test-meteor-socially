/**
 * Converts DataURL to Blob object
 *
 * https://github.com/ebidel/filer.js/blob/master/src/filer.js#L137
 *
 * @param  {String} dataURL
 * @return {Blob}
 */
export function dataURLToBlob(dataURL) {
  const BASE64_MARKER = ';base64,';

  if (dataURL.indexOf(BASE64_MARKER) === -1) {
    const parts = dataURL.split(',');
    const contentType = parts[0].split(':')[1];
    const raw = decodeURIComponent(parts[1]);

    return new Blob([raw], { type: contentType });
  }

  const parts = dataURL.split(BASE64_MARKER);
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

/**
 * http://stackoverflow.com/a/12300351/440898
 * @param {type} dataURI
 * @returns {Blob}
 */
export function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {type: mimeString});

  return blob;
}

/**
 * Converts Blob object to ArrayBuffer
 *
 * @param  {Blob}       blob          Source file
 * @param  {Function}   callback      Success callback with converted object as a first argument
 * @param  {Function}   errorCallback Error callback with error as a first argument
 */
export function blobToArrayBuffer(blob, callback, errorCallback) {
  const reader = new FileReader();

  reader.onload = (e) => {
    callback(e.target.result);
  };

  reader.onerror = (e) => {
    if (errorCallback) {
      errorCallback(e);
    }
  };

  reader.readAsArrayBuffer(blob);
}