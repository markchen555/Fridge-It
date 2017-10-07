import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, Link, Redirect } from 'react-router-dom';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';

import HomeView from './Home/homeView.jsx';
import Login from './Authorization/login.jsx';
import LandingPage from './Landing_Page/landingPage.jsx';
import SignUp from './Authorization/signup.jsx';
import FixedMenu from './Landing_Page/fixedMenu.jsx';
import liveChat from './Live_Chat/liveChat.jsx';
import * as authActions from '../actions/authActions.js';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(localStorage.getItem('userid')) {
      return (
        <HomeView history={this.props.history} />
      )
    } else {
      return (
        <div>
          <FixedMenu history={this.props.history}/>
        </div>
      );
    }
  }
};

const appState = (store) => {
  return {
    username: store.auth.username,
  }
};

const appDispatch =(dispatch) => {
  return {
    actions: bindActionCreators(authActions, dispatch)
  }
};

export default connect(appState, appDispatch)(App);
