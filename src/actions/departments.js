import client from '../utils/api-client';

class DepartmentActions {

  constructor() {
    // Generate an action to determine a successful fetch.
    // This is equivalent to:  fetchSuccess: x => x
    this.generateActions('fetchSuccess');
  }

  fetch() {
    // Returning a Promise will not dispatch the action so we have a fetchSuccess action that
    // we call when the request is completed and the promise is resolved.
    const promise = client.get('/v2.1/departments', {params: {depth: 2}}).then((dataObj) => {
      this.actions.fetchSuccess(dataObj.data);
    });

    this.alt.resolve(promise);
  }
}

export default DepartmentActions;
