
import React from 'react'
import { shallow } from 'enzyme'
import chai from 'chai'
const should = chai.should();

import Board from '../../../src/client/components/board'
import BoardProfileContainer from '../../../src/client/components/board-profile-container'
import OinksContainer from '../../../src/client/components/oinks-container'



describe('<BoardProfileContainer/>', () => {

  it('renders <BoardProfileContainer/> and <OinksContainer/> components', () => {
    let wrapper = shallow(
      <Board/>
    );
    wrapper.find(BoardProfileContainer).length.should.equal(1);
    wrapper.find(OinksContainer).length.should.equal(1);
  })

})
