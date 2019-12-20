import React, { useEffect, useState } from 'react';
import getWebsocket from '../services/websocket'

export default function App() {
  const [userList, setUserList] = useState([])
  const [websocket, ] = useState(getWebsocket())

  useEffect(()=>{
    websocket.create({
      updateConnectionList: setUserList
    }) 
  }, [])

  return (
    <div style={{
      backgroundColor: '#030',
      height: '100vh',
    }}>
      <div style={{
        paddingTop: '30%',
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24,
      }}>
        DASHBOARD
        <div>
          <button onClick={() => {
            websocket.send('test')
          }}>
            test
          </button>
        </div>
        <div>
          <button onClick={() => {
            websocket.sendMsgTo('target','test')
          }}>
            send msg to
          </button>
        </div>
        <div style={{
          display: 'flex',
          justifyContent:'center',
          alignItems:'center',
          marginTop: 20,
        }}>
          <div style={{backgroundColor: '#ccc', width: 300}}>
            {
              userList.map( (item, index) => {
                return(
                  <div key={index} style={{
                    color: '#222'
                  }}>
                    {item}
                    <button
                      onClick={()=> {
                        websocket.sendMsgTo(item,'hello')
                      }}
                    >
                      send hello
                    </button>
                  </div>
                )
              })
            }
          </div>
        </div>
        
      </div>

    </div>
  );
}
