# React Architecture

## Installation

```
npm install
```


## Running A Development Server

```
npm run dev
```


### Proxying API Calls in Development Server

API Proxying is done by default in the local development environment. The proxying defaults to
using the production API server. The server can be changed two different ways, on startup by
an environment variable or on the fly by a query string parameter.

To change the API server on startup set an environment variable when running the script
and the application will use the specified API server.

```
API_ENV=te1 npm run dev
```

To change the API server on the fly add a query string param called api to any request.
This will be verified by a console log to the running watch tasks.

```
http://localhost:3000/?api=te1
```

## Building and Running Production Server

```
npm run build
npm run start
```

## Tests

The tests are run in a separate process from the build so failing tests do not affect a local build in Jenkins builds the
tests will be run before the build and if failed will stop the process. Tests for a component live in the same directory
as the component and are name ComponentName.spec.js.

```
npm run test
```
