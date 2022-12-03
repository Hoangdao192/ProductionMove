import React, {useState} from 'react';
import style from './Sidebar.module.scss';
import Logo from '../../img/logo.svg';

// import { SidebarData } from '../Data/Data';
// import {UilSignOutAlt} from '@iconscout/react-unicons';

const Sidebar = ({ itemList }) => {
	const [selected, setSeclected] = useState(0)

	return (
		<div className={style.Sidebar}>
			{/* Logo */}
			<div className={style.logo}>
				<img src={Logo}  alt="Logo"/>
				<p>Big Corp</p>
			</div>
			{/* Menu */}
			<div className={style.menu}>
				{itemList.map((item, index) => {
					return(
						<div className={selected===index?`${style.menuItem} ${style.active}`: style.menuItem} 
							key={index} 
							onClick={()=>setSeclected(index)}>
							<div className={style.head}>
								<item.icon className={style.icon}/>
								<span>
									{item.heading}
								</span>
							</div>
							{
								item.children ? 
									<div className={style.dropdown}>
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