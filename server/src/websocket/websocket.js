const WebSocket = require('ws')
// ES6 Singleton implementation of websocket (server-side)

let wss
let _CLIENT_ID = 0
let _CLIENTS={};
let _CLIENT_CONNECTIONS={};

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

function msgHandler(id, msg) {
  var msgJson = parseMsg(msg)
  switch(msgJson.type) {
    case 'conn':
      console.log(`${id}: Requested connections`);
      SingletonWebSocket.sendConnectionList(id)
      break;
    case 'msg': 
      console.log(`${id}: Sent msg "${msgJson.target}" to ${msgJson.content}`);
      SingletonWebSocket.msgTo(
        id,
        msgJson.target,
        msgJson.content
      )
      break;
    default:
      console.log(`${id}: Msg "${msg}"`);
  }
}

const SingletonWebSocket = {
  create: (server) => {
    wss = new WebSocket.Server({ server });
    wss.on('connection', function connection(ws) {
      var id = _CLIENT_ID
      _CLIENT_ID+=1
      _CLIENTS[id] = {
        type: 'default'
      }
      _CLIENT_CONNECTIONS[id] = ws
      SingletonWebSocket.sendConnectionList()

      ws.on('message', function incoming(message) {
        msgHandler(id, message)
      });
    
      ws.on('close', function() {
        console.log(`User disconnected ${id}`)
        delete _CLIENTS[id]
        delete _CLIENT_CONNECTIONS[id]
      })

    });
  },
  msgTo: (sourceClientKey, targetClientKey, msg) => {
    _CLIENT_CONNECTIONS[targetClientKey].send(
      JSON.stringify({
        type: 'msg',
        source: sourceClientKey,
        content: msg,
      })
    )
  },
  sendConnectionList: (targetClientKey) => {
    var clientKeys = Object.keys(_CLIENT_CONNECTIONS)
    var msg = JSON.stringify({
      type: 'conn',
      content: clientKeys,
    })
    if (targetClientKey === undefined) {
      clientKeys.forEach( key => {
        _CLIENT_CONNECTIONS[key].send( msg )
      })
      return
    }    
    _CLIENT_CONNECTIONS[targetClientKey].send( msg )
  }

}

Object.freeze(SingletonWebSocket);
module.exports = SingletonWebSocket