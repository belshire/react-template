import 'babel/polyfill';
import Iso from 'iso';
import React from 'react';
import ReactDOM from 'react-dom';
import {createHistory} from 'history';
import Router from 'react-router';
import routes from './routes';

import Flux from 'utils/flux';

const bootstrap = () => {
  return new Promise((resolve) => {
    Iso.bootstrap((initialState, __, container) => {
      resolve({initialState, __, container});
    });
  });
};

(async () => {
  const flux = new Flux();

  const boot = await bootstrap();
  flux.bootstrap(boot.initialState);

  const routerProps = {
    routes: routes,
    history: createHistory(),
    createElement: (component, props) => {
      return React.createElement(component, {...props, flux});
    }
  };

  ReactDOM.render(
    React.createElement(Router, { ...routerProps }),
    boot.container
  );

  // Tell `alt-resolver` we have done the first render
  // next promises will be resolved
  flux._resolver._firstClientSideRender = false;

})();
