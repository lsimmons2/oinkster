
import React from 'react'
import chai from 'chai'
import { shallow } from 'enzyme'

const should = chai.should();

import BoardProfile from '../../../../src/client/components/board-profile'
import BoardProfileSignUp from '../../../../src/client/components/board-profile-sign-up'


describe('<BoardProfile/>', () => {

  it('Should render as div', () => {
    let profileBottom = <BoardProfileSignUp/>;
    const wrapper = shallow(
      <BoardProfile
        avatar='images/pig.png'
        username='lsimmons'
        profileBottom={profileBottom}
      />
    );
    wrapper.type().should.equal('div');
  });

});
