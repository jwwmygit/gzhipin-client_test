import React from 'react';
import Img from './img/logo.png';
import './logo.less'
export default function logo() {
  return (
      <div className='logo-container'>
          <img src={Img} alt="" className='logo'/>
      </div>
  )
}