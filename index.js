var invoke_lambda = require('./lib/invoke_lambda.js');
var AwsHelper = require('aws-lambda-helper');

exports.handler = function (event, context, callback) {
  if (!event.Records) { // Check if an tag id is provided
    return callback(new Error('invalid event', JSON.stringify(event)));
  }
  console.log(JSON.stringify(event.Records[0].s3, null, 2));
  var lambdas_to_trigger = [
    'lambda-taggable-cloudsearch-indexer-v1',
    'lambda-taggable-s3-event-listener-v1'
  ];
  var countdown = lambdas_to_trigger.length;
  lambdas_to_trigger.forEach(function (name) {
    invoke_lambda(name, event, function (err, data) {
      AwsHelper.failOnError(err, event, context);
      console.info(err, data);
      if (--countdown === 0) {
        return callback(err, data);
      }
    });
  });
};
