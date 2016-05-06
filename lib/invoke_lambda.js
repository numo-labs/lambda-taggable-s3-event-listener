require('env2')('.env');
var AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';
var lambda = new AWS.Lambda();

module.exports = function invoke (lambda_name, event, callback) {
  var params = { // this requires the correct ARN in your Environment Variables
    FunctionName: lambda_name, // lambda function to invoke
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify(event)
  };

  lambda.invoke(params, function (err, data) {
    callback(err, data);
  });
};
