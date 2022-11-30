import React, {useState} from 'react'
import Content from './Content/Content'
import './Darshboard.css'
// import Navbar from './Navbar/Navbar'
import Sider from './Sider/Sider'

const Darshboard = () => {
  const [visiableSider, setVisiableSider] = useState(true);

  return (
    <div className="Darshbroad">
       <div className='container'>
        <Sider 
        visiableSider={visiableSider} 
        setVisiableSider={setVisiableSider}
        />
        <Content 
        visiableSider={visiableSider}
        setVisiableSider={setVisiableSider}
        />
      </div>
    </div>
    
  )
}

export default Darshboard

