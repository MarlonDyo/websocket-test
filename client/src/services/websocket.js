import { w3cwebsocket as W3CWebSocket } from "websocket";
// ES6 Singleton implementation of websocket (client-side)
const server = 'ws://localhost:4000'

let websocket = undefined
let _updateConnectionList = () => {}

function parseMsg(msg) {
  var msgJson
  try {
    msgJson = JSON.parse(msg)
  }
  catch(err) {
    msgJson = {}
  }
  return msgJson
} 

const SingletonWebSocket = {
  create: ({
    updateConnectionList,
    userType,
  }) => {
    _updateConnectionList = updateConnectionList
    if (websocket !== undefined) return
    
    // establish new websocket connection
    websocket = new W3CWebSocket(server);
    websocket.onopen = () => {
      console.log('WebSocket Client Connected');
      websocket.send('Connection initialized');
      SingletonWebSocket.setUserType(userType)
    };
    websocket.onmessage = (message) => {
      var messageJson = parseMsg(message.data)
      switch (messageJson.type) {
        case 'conn':
          _updateConnectionList(messageJson.content)
          break;
        default:
          console.log(messageJson)
      }
    };
    websocket.onclose = () => {
      console.log('server disconnected, please refresh')
    }
  },
  send: (msg) => {
    websocket.send(msg)
  },
  setUserType: (userType) => {
    websocket.send(
      JSON.stringify({
        type:'setUserType',
        content: userType,
      })
    )
  },
  requestConnectionsUpdate: () => {
    websocket.send(
      JSON.stringify({
        type:'conn'
      })
    )
  },
  sendMsgTo: (target, msg) => {
    websocket.send(
      JSON.stringify({
        type:'msg',
        target: target,
        content: msg,
      })
    )
  },
}

const getWebSocket = () => SingletonWebSocket;

Object.freeze(SingletonWebSocket);
export default getWebSocket;