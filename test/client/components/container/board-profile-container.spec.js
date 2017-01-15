
// jsdom for DOM APIs, lifecycle methods, use of mount()
require('../../dom')('<html><body></body></html>');

import React from 'react'
import { Provider } from 'react-redux';
import chai from 'chai'
import { shallow, mount } from 'enzyme'
const should = chai.should();

import mockStore from './mock-store'
import initialState from '../../../../src/client/initial-state'
import { submitOink } from '../../../../src/client/actions/profile-actions'
import ConnectedBoardProfileContainer, { BoardProfileContainer } from '../../../../src/client/components/board-profile-container'
import Profile from '../../../../src/client/components/profile'
import AddOinkInput from '../../../../src/client/components/add-oink-input'
import BoardProfileSignUp from '../../../../src/client/components/board-profile-sign-up'

describe('<BoardProfileContainer/> rendering', () => {

  let ConnectedComponent;

  beforeEach(() => {
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedBoardProfileContainer/>
      </Provider>
    );
    ConnectedComponent = wrapper.find(BoardProfileContainer);
  });

  it('should render', () => {
    ConnectedComponent.length.should.equal(1);
  });

  it('should render <Profile/>', () => {
    ConnectedComponent.find(Profile).length.should.equal(1);
  });

});

describe('<BoardProfileContainer/> props', () => {

  it('should.give <Profile/> <BoardProfileSignUp/> as profileBottom if not authenticated', () => {

    initialState.auth.authenticated = false;

    const store = mockStore(initialState);
    let profileBottom = mount(
      <Provider store={store}>
        <ConnectedBoardProfileContainer/>
      </Provider>
    ).find(BoardProfileSignUp);

    profileBottom.length.should.equal(1);

  })

  it('should.give <Profile/> correct props if not authenticated', () => {

    initialState.auth.authenticated = false;

    const store = mockStore(initialState);
    let ProfileChild = mount(
      <Provider store={store}>
        <ConnectedBoardProfileContainer/>
      </Provider>
    ).find(Profile);

    let props = ProfileChild.find(Profile).props();
    props.avatar.should.equal('images/pig.jpg');
    props.username.should.equal('Really Cool User');

  })

  it('should.give <Profile/> <AddOinkInput/> as profileBottom if  authenticated', () => {

    initialState.auth.authenticated = true;
    initialState.auth.user = {
      username: 'someUsername',
      avatar: 'someAvatar'
    };

    const store = mockStore(initialState);
    let profileBottom = mount(
      <Provider store={store}>
        <ConnectedBoardProfileContainer/>
      </Provider>
    ).find(AddOinkInput);

    profileBottom.length.should.equal(1);

  })

  it('should.give <Profile/> correct props if authenticated', () => {

    initialState.auth.authenticated = true;
    initialState.auth.user = {
      username: 'someUsername',
      avatar: 'someAvatar'
    };

    const store = mockStore(initialState);
    let ProfileChild = mount(
      <Provider store={store}>
        <ConnectedBoardProfileContainer/>
      </Provider>
    ).find(Profile);

    let props = ProfileChild.find(Profile).props();
    props.avatar.should.equal('someAvatar');
    props.username.should.equal('someUsername');

  })

});
