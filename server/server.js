import Express from 'express';
import ExpressHBS from 'express-handlebars';
import ExpressPromise from 'express-promise';
import compression from 'compression';
import PrettyError from 'pretty-error';
import path from 'path';
import http from 'http';
import request from 'request';
import fs from 'fs';
import _ from 'lodash';

import React from 'react';
import ReactDOM from 'react-dom/server';
import config from '../src/config';
import Flux from '../src/utils/flux';
import {match, RoutingContext} from 'react-router';

import routes from '../src/routes';
import DocumentMeta from 'react-document-meta';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

app.use(compression());
app.use(Express.static(path.join(__dirname, '..', 'static')));
app.use(ExpressPromise());

app.engine('.hbs', ExpressHBS({
  defaultLayout: 'index',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  extname: '.hbs'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

// Proxy the API from production servers
if (__DEVELOPMENT__) {
  console.info('----\n==> API Proxying is turned on using: ' + config.getApiUrl());
  app.use(['/v1*/', '/v2*/', '/v3*/'], (req, res) => {
    let url = config.getApiUrl() + req.originalUrl;

    req.pipe(request(url)).pipe(res);
  });
}

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();

    if ('api' in req.query) {
      console.info('==> API Proxying is using: ' + config.getApiUrl());
      config.setApiEnv(req.query.api);
    }
  }

  const flux = new Flux();

  const assets = webpackIsomorphicTools.assets();
  const docMeta = DocumentMeta.renderAsHTML();
  let body = '';

  if (__DISABLE_SSR__) {
    res.status(200).render('main', {
      body,
      assets,
      docMeta
    });

    return;
  }

  // Match the request to the route
  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      // Something fucked up? Send an Error Page.
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500).send('500');
    }
    else if (redirectLocation) {
      // Do a redirect.
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }
    else if (renderProps) {
      // We found the right route. Time to render it.

      const routerProps = {
        ...renderProps,
        createElement: (component, props) => {
          return React.createElement(component, {...props, flux});
        }
      };

      // Get the html, assets, and document meta to render to the screen.
      body = flux.render(<RoutingContext {...routerProps} />);

      res.status(200).render('main', {
        body, assets, docMeta
      });
    }
    else {
      res.status(400).send('Not found');
    }
  })
});

// Actually start listening on the ports we have setup.
if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running.', config.app.title);
    console.info('==> 💻  Open http://localhost:%s in a browser to view the app.', config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
