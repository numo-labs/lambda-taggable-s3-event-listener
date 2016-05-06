# lambda-taggable-s3-event-listener

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

Try it!


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
