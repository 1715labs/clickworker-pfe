# Panoptes Front End for Clickworker

A modified version of [Panoptes-Front-End](https://github.com/zooniverse/Panoptes-Front-End) for serving up projects to the [Clickworker](https://www.clickworker.com/) crowd.

## Differences from PFE

- Deploy process (see below)

## Deployment

Deployment is done from your local machine using Docker Compose:

1. Copy `env-example` to `.env`
1. Fill in the values for `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
1. Run `docker-compose build` to build the app from your current local version
1. Run `docker-compose run deploy` to deploy the app to S3
