import { w3cwebsocket as W3CWebSocket } from "websocket";
// ES6 Singleton implementation of websocket (client-side)
const server = 'ws://localhost:4000'

let websocket = undefined

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
    updateConnectionList
  }) => {
    // establish new websocket connection
    websocket = new W3CWebSocket(server);
    websocket.onopen = () => {
      console.log('WebSocket Client Connected');
      websocket.send('Connection initialized');
    };
    websocket.onmessage = (message) => {
      var messageJson = parseMsg(message.data)
      switch (messageJson.type) {
        case 'conn':
          updateConnectionList(messageJson.content)
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