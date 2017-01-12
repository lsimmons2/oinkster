
import React from 'react'
import chai from 'chai'
import { shallow } from 'enzyme'

const should = chai.should();

import Home from '../../../../src/client/components/home'


describe('<Home/>', () => {

  it('Should render as a <div>', () => {
    const wrapper = shallow(
      <Home/>
    );
    wrapper.type().should.equal('div');
  });

});
