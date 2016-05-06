var assert = require('assert');
var index = require('../index');
var event = require('./sample_event');

describe('Index handler tests', function () {
  it('returns error if no event.Records exist', function (done) {
    function test (err) {
      assert.equal(err.message, 'invalid event');
      done();
    }
    index.handler({}, {}, test);
  });

  it('Successfully invoked both lambdas', function (done) {
    function test (err, result) { // here's your test:
      assert(!err);
      var res = JSON.parse(result.Payload);
      assert(res);
      done();
    }
    index.handler(event, {}, test);
  });
});
