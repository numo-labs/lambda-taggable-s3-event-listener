var assert = require('assert');
var invoke = require('../lib/invoke_lambda');
var event = require('./fixtures/sample_event');

describe('invoke a lambda function', function () {
  it('invokes the lambda with sample event', function (done) {
    var lambda_name = 'lambda-taggable-cloudsearch-indexer-v1';
    invoke(lambda_name, event, function (err, data) {
      if (err || data.Payload.match(/errorMessage/)) console.log(err);
      var res = JSON.parse(data.Payload);
      assert(res.status === 'success');
      done();
    });
  });

  it('attempt to invoke non-existent-lambda', function (done) {
    var lambda_name = 'non-existent-lambda';
    invoke(lambda_name, event, function (err, data) {
      assert.equal(err.statusCode, 404);
      done();
    });
  });
});
