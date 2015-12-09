import noop from 'lodash/utility/noop';

import React from 'react';
import ReactDOM from 'react-dom/server';
import Iso from 'iso';

import ErrorPage from './server-error';

class AltResolver {

  _toResolve = [];
  _firstClientSideRender = !(process.env.NODE_ENV === 'test');

  resolve(promise: Function, later = false) {
    if (process.env.BROWSER && !later) {
      // Prevent first app mount to re-resolve same
      // promises that server already did
      if (this._firstClientSideRender) {
        return noop();
      }

      return promise;
    }

    return this._toResolve.push(promise);
  }

  async render(Handler, flux, force = false) {
    if (process.env.BROWSER && !force) {
      return null;
    }

    let content;
    try {
      // Fire first render to collect XHR promises
      ReactDOM.renderToString(Handler);

      // Get the promises collected from the first rendering
      const promises = this._toResolve;

      // Resolve all promises collected
      await Promise.all(promises);

      // Get the new content with promises resolved

      const fluxSnapshot = flux.takeSnapshot();
      const app = ReactDOM.renderToString(Handler);

      // Render the html with state in it
      content = Iso.render(app, fluxSnapshot);
    } catch (error) {
      // catch script error, render 500 page

      const fluxSnapshot = flux.takeSnapshot();
      const app = ReactDOM.renderToString(React.createElement(ErrorPage));

      content = Iso.render(app, fluxSnapshot);
    }

    // return the content
    return content;
  }

}

export default AltResolver;
