# lambda-taggable-s3-event-listener

[![Codeship](https://img.shields.io/codeship/19447840-f5a8-0133-96c8-1225f536f445.svg)](https://codeship.com/projects/150420)
[![codecov](https://codecov.io/gh/numo-labs/lambda-taggable-s3-event-listener/branch/master/graph/badge.svg)](https://codecov.io/gh/numo-labs/lambda-taggable-s3-event-listener)
[![Dependency Status](https://david-dm.org/numo-labs/lambda-taggable-s3-event-listener.svg)](https://david-dm.org/numo-labs/lambda-taggable-s3-event-listener)
[![devDependency Status](https://david-dm.org/numo-labs/lambda-taggable-s3-event-listener/dev-status.svg)](https://david-dm.org/numo-labs/lambda-taggable-s3-event-listener#info=devDependencies)
[![npm version](https://badge.fury.io/js/lambda-taggable-s3-event-listener.svg)](https://badge.fury.io/js/lambda-taggable-s3-event-listener)

Listens for the create event in s3 bucket and triggers the indexer lambdas.


## Why?

The taggable system uses S3 as the primary data store.
The *original* plan was to trigger two "indexer" lambdas.  
However we *discovered* that we can only have ***one*** Lambda listen
to each S3 event ...

![cannot-trigger-two-lambdas-from-same-s3-event](https://cloud.githubusercontent.com/assets/194400/15070206/c0f1f23a-137a-11e6-8291-ec4ddafb881f.png)
https://forums.aws.amazon.com/thread.jspa?threadID=214437
(discovered by Detective [@jruts])

## What?

Trigger more than one Lambda when an S3 Event is fired.

## *How?*

It's pretty simple, just checkout out `index.js`


### Environment Variables

To run/develop/test this Lambda *locally* you will need to create
a file called `.env` in the root of the project and include the following
Environment Variables:

```sh
export AWS_REGION=eu-west-1
export AWS_IAM_ROLE=arn:aws:iam::12346789:role/dummy
export AWS_ACCESS_KEY_ID=YourAccessKeyHere
export AWS_SECRET_ACCESS_KEY=YourSecret
```

![image](https://cloud.githubusercontent.com/assets/194400/14675184/07682f88-0708-11e6-96b7-672e66329461.png)
