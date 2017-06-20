exports.generatedDate = function () {
  return new Date().toUTCString();
}

exports.absoluteUrl = function (anchor) {
  if (typeof anchor !== 'string')
    return null;
  console.log(anchor);
  return anchor.replace('+', '__').replace('.', '_');
};