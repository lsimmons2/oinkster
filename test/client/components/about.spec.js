
import React from 'react'
import chai from 'chai'
import { shallow } from 'enzyme'

const should = chai.should();

import About from '../../../../src/client/components/about'


describe('<About/>', () => {

  it('Should render as div', () => {
    const wrapper = shallow(
      <About/>
    );
    wrapper.type().should.equal('div');
  });

});
