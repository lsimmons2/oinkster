
import React from 'react'
import chai from 'chai'
import { shallow } from 'enzyme'
import { Link } from 'react-router'

const should = chai.should();

import BoardProfileSignUp from '../../../../src/client/components/board-profile-sign-up'


describe('<BoardProfileSignUp/>', () => {

  it('Should render as <p>', () => {
    const wrapper = shallow(
      <BoardProfileSignUp/>
    );
    wrapper.type().should.equal('p');
  });

});
