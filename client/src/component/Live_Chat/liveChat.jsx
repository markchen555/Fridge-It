import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Input, Form } from 'semantic-ui-react';
import socket from 'socket.io-client';


class liveChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      inputMessage: '',
      socket: socket('http://localhost:3000'),
      user: (this.props.username.split('@')[0]).toUpperCase(),
    }
  }
  componentDidMount() {
    this.state.socket.on('receive-message', (msg) => {
      this.state.messages.push(msg)
      this.setState({messages: this.state.messages}) 
    })
  }

  inputMessage(e) {
    this.setState({inputMessage: e.target.value})
  }

  submitMessage(e) {
    let userMessages = {
      singleMessage: this.state.inputMessage,
      user: this.state.user
    }
    this.state.socket.emit('new-message', userMessages);
    this.setState({inputMessage: ''})
  }
  
  render() {
    console.log('this is message: ', this.props)
    let allMessages = this.state.messages.map((msg, i) => {
      return <li key={i}><strong>{msg.user}:</strong><span>{msg.singleMessage}</span></li>
    })
    return (
      <div>
        <style>{`
          #messages {
            list-style-type: none; 
            margin: 0; 
            padding: 0;
          }
          #messages li { 
            padding: 5px 10px; 
          }
          .message-section {
            background-color: lightgrey;

          }
          .form-section {
            background: #2185d0; 
            padding: 3px 3px 1px 3px; 
            bottom: 0; 
            position: fixed; 
            width: 100%; 
          }
          .form-input{
            border: 0; 
            width: 90%; 
            margin-right: .5%; 
          }
          .form-button {
            border: none; 

          }
          }
        `}</style>
        <br />
        <h2> {this.state.user}'s Live Chat </h2>
        <ul id="messages" className='message-section'> {allMessages}</ul>
        <Form className='form-section'>
          <Form.Group action="">
            <Form.Input 
                id='m'
                placeholder='message'
                autoComplete="off"
                className='form-input'
                onChange={(e) => this.inputMessage(e) }
                value={this.state.inputMessage}
              />
            <Form.Button className='form-button' onClick={(e) => this.submitMessage(e)}>
              Submit
            </ Form.Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

const liveChatState = (store) => {
  return {
    username: store.auth.username,
  }
};

export default connect(liveChatState)(liveChat);