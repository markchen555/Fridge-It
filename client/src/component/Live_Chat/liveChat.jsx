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
      if(this.state.user === msg.user) {
        return (
          <div className='message-wrap'>
            <div id="messages" className='message-section right'>
              <div className='message' key={i}>{msg.singleMessage}</div>
            </div >
            <div className='message-section right'>
              <div className='name'>{msg.user}</div>
            </div>
          </div>
        )
      } else {
        return (
          <div className='message-wrap'>
            <div id="messages" className='message-section'>
              <div className='message' key={i}>{msg.singleMessage}</div>
            </div >
            <div className='message-section'>
              <div className='name'>{msg.user}</div>
            </div>
          </div>
        )
      }
    })
    return (
      <div>
        <style>{`

          .thread-container {
            flex-grow: 1;
            overflow-y: scroll;
            position: relative;
          }
          .thread {
            position: relative;
            width: 100%;
            min-height: 500px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            color: #b3b2ca;
            background: #dcddf5;
          }
          .message-section {
            display: flex;
          }
          .message {
            background: #89a1fc;
            color: #fff;
            border-radius: 5px;
            padding: 10px 15px;
          }
          .message-wrap {
            margin-bottom: 5px;
          }
          .name {
            font-size: .65em;
            text-align: right;
          }
          .right {
            text-align: right;
            justify-content: flex-end;
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
        <div className='thread-container'>
          <div className='thread'>
           {allMessages}
          </div>
        </div>
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