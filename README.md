# Panoptes Front End for Clickworker

A modified version of [Panoptes-Front-End](https://github.com/zooniverse/Panoptes-Front-End) for serving up projects to the [Clickworker](https://www.clickworker.com/) crowd.

## Differences from PFE

- Deploy process (see below)
- Lots of UI elements have been hidden, mostly (but not exclusively) by CSS rules. This is to prevent Clickworker users from navigating away from the classify page, so that the Clickworker query parameters provided to make sure they get paid don't get stripped out.
- The expected query parameters provided by Clickworker's iFrame-based platform are added to the classification in `classification.metadata.clickworker`.

## Additional features

### `HTMLLinkViewer`

A subject viewer that provides a button that opens an external web page when clicked, and logs the time of opening.

Requires subjects in the following format:

```
{
  locations: [
    {
      "text/html": "https://www.google.com"
    }
  ]
}
```

## Deployment

Deployment is done from your local machine using Docker Compose:

1. Copy `env-example` to `.env`
1. Fill in the values for `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
1. Run `docker-compose build` to build the app from your current local version
1. Run `docker-compose run deploy` to deploy the app to S3
