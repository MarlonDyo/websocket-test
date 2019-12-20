import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

// establish new websocket connection
const client = new W3CWebSocket('ws://localhost:4000');

class App extends Component {
  
  componentDidMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      console.log(message);
    };
  }
  
  render() {
    return (
      <div style={{
        backgroundColor: '#300',
        height: '100vh',
      }}>
        <div style={{
          paddingTop: '30%',
          textAlign: 'center',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 24,
        }}>
          CLIENT
        </div>
      </div>
    );
  }
}

export default App;