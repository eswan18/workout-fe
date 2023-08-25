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


## Docker

The current deploy process doesn't require a docker image, but I experimented with hosting in Kubernetes so I've set up the infrastructure needed.

To build the docker image:

```bash
npm run docker-build
```

Ro run the docker image. You can then connect to the server at `localhost:3000`.

```bash
npm run docker-run
```
