import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Flux from 'utils/flux';
import axios from 'axios';

import reactRouterStub from '../../../test/utils/stub-router-context';

import DepartmentList from './DepartmentList';
import fakeData from '../../../test/data/departments';

const should = chai.should();

describe('DepartmentList', () => {
  let node;
  let instance;
  let flux;

  beforeEach(() => {
    // Stub the ajax call to give back our mocked data.
    sinon.stub(axios, "get").returns(new Promise(resolve => setTimeout(() => {
      resolve({
        data: fakeData
      });
    }, 1)));

    // Startup flux
    flux = new Flux();

    // Stub out the component and render for testing.
    const Stubbed = reactRouterStub(DepartmentList, {flux});
    node = window.document.createElement('div');
    instance = ReactDOM.render(React.createElement(Stubbed), node);
  });

  afterEach(function() {
    // Unmount the component after each test.
    if (instance) {
      ReactDOM.unmountComponentAtNode(node);
    }

    // Restore the axios method to it's original.
    axios.get.restore();
  });

  it('should render correctly', () => {
    const list = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'ul');
    list.length.should.eql(1);
  });

  it('should render without departments', () => {
    const list = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');
    list.should.be.empty;
  });

  it('should render departments after fetch', (done) => {
    // Listen for a change on the store for when the data has loaded then test that the correct
    // amount of items have been rendered.
    const handleChange = () => {
      const listItems = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');
      listItems.length.should.eql(fakeData.length);

      flux.getStore('departments').unlisten(handleChange);
      return done();
    };

    flux.getStore('departments').listen(handleChange);
  });
});
