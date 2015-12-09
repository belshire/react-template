import client from '../utils/api-client';

class SectionIconsActions {

  constructor() {
    // Generate an action to determine a successful fetch.
    // This is equivalent to:  fetchSuccess: x => x
    this.generateActions('fetchSuccess');
  }

  fetch() {
    // Returning a Promise will not dispatch the action so we have a fetchSuccess action that
    // we call when the request is completed and the promise is resolved.
    const promise = client.get('/v2.1/content/site/menus').then((dataObj) => {
      this.actions.fetchSuccess(dataObj.data.menuSections);
    });

    this.alt.resolve(promise);
  }
}

export default SectionIconsActions;
