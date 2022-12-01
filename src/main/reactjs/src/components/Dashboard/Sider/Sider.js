import React, {useState} from 'react';
import './Sider.css';
import Logo from '../../../image/Home.jpg';
import { Link } from "react-router-dom";

import { SiderData } from '../Data/Data';
import {UilSignOutAlt, UilTimes, UilCircle, UilCheckCircle} from '@iconscout/react-unicons';

const Sider = (props) => {

	const [selected, setSeclected] = useState(0)
	const [selectedSub, setSeclectedSub] = useState(5)

	function setSeclect(index, children) {
		setSeclected(index)
		console.log(index * 10)
		if (children) {
			setSeclectedSub(index * 10)
		}
	}

	function setVisiableSider() {
		props.setVisiableSider(!props.visiableSider)
	}

  return (
	<div className={props.visiableSider ? "Sider" : "Sider nonDisplay"}>
		{console.log(props)}

			{/* Logo */}
		<div className="logo">
			<UilTimes className="iconSider" onClick={()=>setVisiableSider()}/>
			<img src={Logo}  alt="Logo"/>
		</div>
		 
		{/* Menu */}
		<nav className="menu">
			{SiderData.map((item, index) => {
				return(
					<div key={index}>
					<Link 
					to={item.children ? 
						`/${item.link}/${item.children[0].link}` : `/${item.link}`
					} 
					className={selected===index?'menuItem active': 'menuItem'} 
					key={index} 
					onClick={()=>{
						setSeclect(index, item.children ? true : false)
						if (!item.children) {
							setVisiableSider()
						}
					}}
					>
						<item.icon/>
						{item.heading}
					</Link>
					{item.children && selected===index && 
					(<div className="subMenu">
							{item.children.map((subitem, subIndex) => {
								return(
									<Link  to={`/${item.link}/${subitem.link}`}
									className={selectedSub===(index *10 + subIndex)
										? 'subMenuItem sub-active' : 'subMenuItem'} 
									key={subIndex} 
									onClick={()=>{
										setSeclectedSub(index *10 + subIndex)
										console.log(index *10 + subIndex)
										setVisiableSider()
									}}
									>
										<UilCircle className="subMenuItemIcon"/>
										{subitem.heading}
									</Link>
								)
							})}
						</div>)
						}
					</div>
				)
			})}
			
			<div className="menuItem">
				<UilSignOutAlt/>
			</div>
		</nav>
	</div>
  )
}

export default Sider

// {SiderData.map((item, index) => {
// 	return(
// 		<div className={selected===index?'menuItem active': 'menuItem'} key={index} onClick={()=>setSeclected(index)}>
// 			<item.icon/>
// 			<span>
// 				{item.heading}
// 			</span>

// 			{/* {item.children && (<div className="subMenu">
// 				{item.children.map((item, index) => {
// 					return(
// 						<div className={selected===index?'menuItem active': 'menuItem'} key={index} onClick={()=>setSeclected(index)}>
// 							<UilCircle/>
// 							<span>
// 								{item.heading}
// 							</span>
// 						</div>
// 					)
// 				})}
// 			</div>)} */}
// 		</div>
// 	)
// })}