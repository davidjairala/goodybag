var expect = require('expect.js');

exports.saveOk = function saveOk(err, doc) {
  expect(err).to.be(null);
  expect(doc).to.be.ok();
};
