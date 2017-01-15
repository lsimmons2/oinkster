
// jsdom for DOM APIs, lifecycle methods, use of mount()
require('../../dom')('<html><body></body></html>');

import React from 'react'
import { Provider } from 'react-redux';
import chai from 'chai'
import { shallow, mount } from 'enzyme'
const should = chai.should();

import ConnectedAbout, { About } from '../../../../src/client/components/about'
import mockStore from './mock-store'
import initialState from '../../../../src/client/initial-state'
import * as actions from '../../../../src/client/actions/feedback-actions'



describe('Connected <About/>', () => {

  let ConnectedComponent;

  beforeEach(() => {
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedAbout/>
      </Provider>
    );
    ConnectedComponent = wrapper.find(About);
  });

  it('should render', () => {
    ConnectedComponent.length.should.be.ok;
  });

  it('should have props from store', () => {
    let props = ConnectedComponent.props();
    props.feedback.should.have.property('isFetching');
    props.feedback.should.have.property('fetchingSuccess');
    props.feedback.should.have.property('fetchingError');
    props.feedback.should.have.property('contact');
    props.feedback.should.have.property('feedback');
  })

});


describe('Unconnected <About/>', () => {

  let Component;
  let wrapper;
  let feedback;

  // this isn't working how I want it to - at every assertion,
  // feedback retains it's value from previous assertion
  // and I have to manually reset the values in the assertions
  beforeEach(() => {
    feedback = initialState.feedback;
  });

  // not sure if this is an excessive assertion/not the point of component
  // tests since this rendering doesn't depend on props
  it('Should render as <div> with an <h2> and 3 .about-description-text <p>\'s', () => {
    wrapper = shallow(
      <About
        actions={actions}
        feedback={feedback}
      />
    );
    wrapper.type().should.equal('div');
    wrapper.find('h2').length.should.equal(1);
    wrapper.find('p.about-description-text').length.should.equal(3);
  });

  it('should render feedback props in inputs', () => {
    feedback.contact = 'some contact info';
    feedback.feedback = 'some feedback';
    wrapper = shallow(
      <About
        actions={actions}
        feedback={feedback}
      />
    );
    let input = wrapper.find('input[type="text"]');
    let textarea = wrapper.find('textarea');
    input.props().value.should.equal('some contact info');
    textarea.props().value.should.equal('some feedback');
    feedback.contact = '';
    feedback.feedback = '';
  })

  it('should render .feedback-waiting <div> if feedback.isFetching is true', () => {
    feedback.isFetching = true;
    wrapper = shallow(
      <About
        actions={actions}
        feedback={feedback}
      />
    );
    let fetchingStatus = wrapper.find('div.feedback-waiting');
    fetchingStatus.length.should.equal(1);
    feedback.isFetching = false;
  })

  it('should render correct .feedback-status <p> if feedback.fetchingSuccess is true', () => {
    feedback.fetchingSuccess = true;
    wrapper = shallow(
      <About
        actions={actions}
        feedback={feedback}
      />
    );
    let fetchingStatus = wrapper.find('p.feedback-status');
    fetchingStatus.length.should.equal(1);
    fetchingStatus.text().should.equal('Feedback sent successfully. Thanks!');
    feedback.fetchingSuccess = false;
  })

  it('should render correct .feedback-status <p> if feedback.fetchingError is true', () => {
    feedback.fetchingError = true;
    wrapper = shallow(
      <About
        actions={actions}
        feedback={feedback}
      />
    );
    let fetchingStatus = wrapper.find('p.feedback-status');
    fetchingStatus.length.should.equal(1); fetchingStatus.text().should.equal('Woops! There was an error submitting your feedback. Would appreciate it if you could email me at leooscar.simmons@gmail.com. Thanks!');
    feedback.fetchingError = false;
  })

});
