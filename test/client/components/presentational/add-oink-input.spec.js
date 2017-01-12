
import React from 'react'
import chai from 'chai'
import { shallow } from 'enzyme'

const should = chai.should();

import AddOinkInput from '../../../../src/client/components/add-oink-input'


describe('<AddOinkInput/>', () => {

  it('Should render as a <form>', () => {
    const wrapper = shallow(
      <AddOinkInput/>
    );
    wrapper.type().should.equal('form');
  });

});
