
import React from 'react'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'

import mockStore from './mock-store'
import BoardProfileContainer from '../../../src/client/components/board-profile-container'
import BoardProfile from '../../../src/client/components/board-profile'
import chai from 'chai'
// import ReactDOM from 'react-dom'
// import ReactTestUtils from 'react-addons-test-utils'
const should = chai.should();
// import initialState from '../../../src/client/initial-state'



describe('<BoardProfileContainer/>', () => {

  let Component;
  let BoardComponent;

  beforeEach(() => {
    const store = mockStore({});

    const wrapper = mount(
      <Provider store={store}>
        <BoardProfileContainer/>
      </Provider>
    );

    // Component = wrapper.find(BoardProfileContainer);
    // BoardComponent = Component.find(BoardProfile);
  });

  it('should render as a <div>', () => {
    // let wrapper = shallow(<SignUp auth={initialState.auth}/>);
    // wrapper.type().should.equal('div');
  })

  // it('contains the \'Sign Up\' <h3> header', () => {
  //   let wrapper = shallow(<SignUp auth={initialState.auth}/>);
  //   wrapper.find('h3').props().children.should.equal('Sign Up');
  // })
  //
  // it('contains 6 .form-group <div>\'s', () => {
  //   let wrapper = shallow(<SignUp auth={initialState.auth}/>);
  //   wrapper.find('.form-control').length.should.equal(6);
  // })
  //
  // it('contains 6 .form-control <input>\'s', () => {
  //   let wrapper = shallow(<SignUp auth={initialState.auth}/>);
  //   wrapper.find('.form-control').length.should.equal(6);
  // })

})
