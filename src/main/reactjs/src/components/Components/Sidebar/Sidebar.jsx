import React, {useState} from 'react';
import './Sidebar.css';
import Logo from '../../img/logo.svg';

// import { SidebarData } from '../Data/Data';
// import {UilSignOutAlt} from '@iconscout/react-unicons';

const Sidebar = ({ itemList }) => {
	const [selected, setSeclected] = useState(0)

	return (
		<div className="Sidebar">
			{/* Logo */}
			<div className="logo">
				<img src={Logo}  alt="Logo"/>
				<p>Big Corp</p>
			</div>
			{/* Menu */}
			<div className="menu">
				{itemList.map((item, index) => {
					return(
						<div className={selected===index?'menuItem active': 'menuItem'} 
							key={index} 
							onClick={()=>setSeclected(index)}>
							<div className="head">
								<item.icon className="icon"/>
								<span>
									{item.heading}
								</span>
							</div>
							{
								item.children ? 
									<div className="dropdown">
										{
											item.children.map((child) => {
												return (<a href={child.action}>{child.heading}</a>)
											})
										}
									</div> : ""
							}
						</div>
					)
				})}

				
			</div>
		</div>
	)
}

export default Sidebar