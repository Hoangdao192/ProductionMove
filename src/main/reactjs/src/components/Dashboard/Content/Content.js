import React from 'react';
import './Content.css'
import { Outlet } from 'react-router-dom';

import Info from '../Info/Info'
// import Product from '../pages/Product/Product/Product';

const Content = (props) => {
  return (
    <>
    {console.log(props)}
      <div className={!props.visiableSider ? "Content" : "Content nonDisplay"}>
        <div className="Contain-container">
          <Info 
          visiableSider={props.visiableSider} 
          setVisiableSider={props.setVisiableSider}/>
          <div className="ContentView">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;

// visiableSider={visiableSider} 
// setVisiableSider={setVisiableSider}
