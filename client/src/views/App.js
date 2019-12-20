import React, { useEffect, useState } from 'react';
import getWebsocket from '../services/websocket'

export default function App() {
  const [userList, setUserList] = useState({})
  const [websocket, ] = useState(getWebsocket())

  useEffect(()=>{
    websocket.create({
      updateConnectionList: setUserList,
      userType: 'client'
    }) 
  }, [])

  console.log(userList)
  var userListKeys = Object.keys(userList)


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