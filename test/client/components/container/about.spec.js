
// jsdom for DOM APIs, lifecycle methods, use of mount()
require('../../dom')('<html><body></body></html>');

import React from 'react'
import { Provider } from 'react-redux';
import chai from 'chai'
import { mount } from 'enzyme'

const should = chai.should();

import About from '../../../../src/client/components/about'
import initialState from '../../../../src/client/initial-state'
import mockStore from './mock-store'


describe('<About/>', () => {

  let Component;

  beforeEach(() => {
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <About/>
      </Provider>
    );
    Component = wrapper.find(About);
  });

  it('Should render as div', () => {
    Component.length.should.be.ok;
  });

});
