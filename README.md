# Workout App Front End

A wildly over-engineered, poorly designed NextJS app that serves as the front end to my workout tracker.

Hosted in Vercel at this link: https://workout-fe.vercel.app/

## Commands to know

Run the development server. You can connect to the server at `localhost:3000`.

```bash
npm run dev
```

Run storybook. You can connect at `localhost:6006`

```bash
npm run storybook
```

## Environment

Secrets are managed in [Infisical](https://app.infisical.com).

### Pushing to Vercel

You'll need to install and authenticate with the Vercel and Infisical CLIs.

```bash
./push_env_to_vercel.sh
```

### Pulling Locally

You'll need to install and authenticate with the Infisical CLI.

```bash
./pull_env.sh
```

You can also run the front end locally but use the staging or prod API backend. The `pull_env.sh` script supports this; add a flag for the environment you want and it will overwrite the API-related values. Then you can start the app normally with `npm run dev`.

```bash
./pull_env --staging
./pull_env --prod
```


## Docker

The current deploy process doesn't require a docker image, but I experimented with hosting in Kubernetes so I've set up the infrastructure needed.

To build the docker image:

```bash
npm run docker-build
```

To run the docker image. You can then connect to the server at `localhost:3000`.

```bash
npm run docker-run
```
