var invoke_lambda = require('./lib/invoke_lambda.js');
var AwsHelper = require('aws-lambda-helper');

var lambdas_to_trigger = [ // this *could* be an environment variable ...
  'lambda-taggable-cloudsearch-indexer-v1',
  'lambda-taggable-neo4j-indexer-v1'
];

exports.handler = function (event, context, callback) {
  if (!event.Records) { // Check if an tag id is provided
    return callback(new Error('invalid event', JSON.stringify(event)));
  }
  // console.log(JSON.stringify(event.Records[0].s3, null, 2));
  var countdown = lambdas_to_trigger.length * event.Records.length;
  var res = []; // array of all responses from invoking the indexers
  event.Records.forEach(function (record) {
    console.log('S3 Record Key:', JSON.stringify(record.s3.object.key, null, 2));
    var single_record_event = {'Records': [record]};
    lambdas_to_trigger.forEach(function (name) {
      invoke_lambda(name, single_record_event, function (err, data) {
        AwsHelper.failOnError(err, event, context);
        delete data.LogResult;
        res.push(data); // accumlate all results
        if (--countdown === 0) {
          return callback(err, res);
        }
      });
    });
  });
};

