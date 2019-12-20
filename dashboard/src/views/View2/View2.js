import React, { useEffect, useState } from 'react';
import getWebsocket from '../../services/websocket'

export default function View2({history}) {
  const [userList, setUserList] = useState({})
  const [websocket,] = useState(getWebsocket())

  useEffect(()=>{
    websocket.create({
      updateConnectionList: setUserList,
      userType: 'dashboard'
    }) 
  }, [])

  var userListKeys = Object.keys(userList)

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
        DASHBOARD (view 2)
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
            send invalid msg
          </button>
        </div>
        <div>
          <button onClick={() => {
            history.push('1')
          }}>
            navigate to View1
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
              userListKeys.map( (key, index) => {
                var userItem = userList[key]
                return(
                  <div key={index} style={{
                    color: '#222'
                  }}>
                    {key} - {userItem.type}
                    <button
                      onClick={()=> {
                        websocket.sendMsgTo(key,'hello')
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
