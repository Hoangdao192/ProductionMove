import React from 'react'
import './Info.css'
import { InfoUser } from '../Data/Data'
import { UilBars } from '@iconscout/react-unicons'

export default function Info(props) {
  function setVisiableSider() {
    props.setVisiableSider(!props.visiableSider)
    console.log(props.visiableSider)
  }

  return (
    <>
    {console.log(props)}
    <div className="Info">
      <div className="Info-container">
        <UilBars className="iconSider" onClick={()=>setVisiableSider()}/>
        <h1>Xin Chào {InfoUser.firstName}</h1>
        <div className="avatar">
          <img src={InfoUser.avatar} alt="" />
        </div>
      </div>
    </div>
    </>
  )
}

// visiableSider={visiableSider} 
// setVisiableSider={setVisiableSider}