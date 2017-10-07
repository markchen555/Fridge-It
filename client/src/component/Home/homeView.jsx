import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import {Button, Menu, Container, Image } from 'semantic-ui-react';

import LiveChat from '../Live_Chat/liveChat.jsx'

import Search from '../Search/searchView.jsx';
import Home from '../Home/home.jsx';
import * as authActions from '../../actions/authActions.js';

class HomeView extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    console.log('this is homeView: ', this.props)
    if(localStorage.getItem('userid')) {
      return (
        <div>
        <style>{`
          #bar {
            background-color: #2185d0;
          }
          body > div,
          body > div > div,
          body > div > div > div.home-form {
            padding-top: 3%;
            padding-left: 5%;
            padding-right: 5%;
          }
        `}</style>
        <Router history={this.props.history}>
          <div>
            <Menu fixed='top' size='large' id='bar'>
              <Container>
                <Menu.Item>
                  <img src="https://cdn0.iconfinder.com/data/icons/household-appliances-icons-set-cartoon-style/512/a672-512.png"/>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/home">
                    <Button color={'blue'} content={'Home'} size={'huge'}/>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/search">
                    <Button color={'blue'} content={'Recipe'} size={'huge'}/>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/live">
                    <Button color={'blue'} content={'Live'} size={'huge'}/>
                  </Link>
                </Menu.Item>
                <Menu.Item position={'right'} >
                  <Button content={localStorage.getItem('name')} color={'blue'} size={'huge'} />
                  <Button as='a' color={'blue'} content={'Logout'} size={'huge'}
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.actions.logoutUser();
                    }} />
                </Menu.Item>
              </Container>
            </Menu>
            <Route exact path="/home" render={() => {return <Home />}}/>
            <Route path="/search" render={() => {return <Search />}}/>
            <Route path="/live" render={() => {return <LiveChat />}}/>
          </div>
        </Router>
        </div>
      );
    } else {
      return (
        <div>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
            padding-top: 80px;
          }
        `}</style>
        <Redirect exact to={{ pathname: '/login'}} />
        </div>
      )
    }
  }
};

const homeState = (store) => {
  return {
    username: store.auth.username,
  }
};

const homeDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(authActions, dispatch)
  }
};

export default connect(homeState, homeDispatch)(HomeView);