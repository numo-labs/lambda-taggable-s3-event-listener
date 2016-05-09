var assert = require('assert');
var index = require('../index');
var event = require('./fixtures/sample_event');
var multiple_records_event = require('./fixtures/multiple_records_event');

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
      var res = JSON.parse(result[0].Payload);
      assert(res);
      done();
    }
    index.handler(event, CONTEXT, test);
  });

  it('Handles an event with multiple records', function (done) {
    function test (err, result) { // here's your test:
      assert(!err);
      console.log(result);
      assert(result.length === 6);
      done();
    }
    index.handler(multiple_records_event, CONTEXT, test);
  });
});
