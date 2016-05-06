var invoke_lambda = require('./lib/invoke_lambda.js');
var AwsHelper = require('aws-lambda-helper');

exports.handler = function (event, context, callback) {
  if (!event.Records) { // Check if an tag id is provided
    return callback(new Error('invalid event', JSON.stringify(event)));
  }
  var lambdas_to_trigger = [
    'lambda-taggable-cloudsearch-indexer-v1',
    'numo-tag-e-v1'
  ];
  var countdown = lambdas_to_trigger.length;
  lambdas_to_trigger.forEach(function (name) {
    invoke_lambda(name, event, function (err, data) {
      AwsHelper.failOnError(err, event, context);
      if (--countdown === 0) {
        return callback(err, data);
      }
    });
  });
};
