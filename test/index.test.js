var assert = require('assert');
var index = require('../index');
var event = require('./sample_event');

var CONTEXT = {
  fail: function (err) {
    console.log(' - - - - - - - - - - - - - - - - - - - - - ');
    console.log('FAIL:', err);
  }
};

describe('Index handler tests', function () {
  it('returns error if no event.Records exist', function (done) {
    function test (err) {
      assert.equal(err.message, 'invalid event');
      done();
    }
    index.handler({}, CONTEXT, test);
  });

  it('Successfully invoked both lambdas', function (done) {
    function test (err, result) { // here's your test:
      assert(!err);
      var res = JSON.parse(result.Payload);
      assert(res);
      done();
    }
    index.handler(event, CONTEXT, test);
  });
});
