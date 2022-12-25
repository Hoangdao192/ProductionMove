import React, {Fragment, useState} from 'react';
import style from './Sidebar.module.scss';
import Logo from '../../img/logo.svg';
import { UilAngleRightB } from '@iconscout/react-unicons'
import { UilTimes } from '@iconscout/react-unicons'
import { UilBars } from '@iconscout/react-unicons'
import { Link, redirect, useNavigate } from 'react-router-dom';

// import { SidebarData } from '../Data/Data';
// import {UilSignOutAlt} from '@iconscout/react-unicons';

const Sidebar = ({ itemList, className }) => {
	const [selected, setSeclected] = useState(0)
    const [selectedChild, setSeclectedChild] = useState(0);
    const [isMobileSidebarOpen, setOpenMobileSidebar] = useState(false);
    const navigate = useNavigate();


    const onItemClick = (item, index) => {
        console.log(item);
        setSeclected(index);
        if (item.action != undefined) {
            navigate(item.action);
            const loader = async () => {
                return redirect(item.action);
              };
              loader();
            
        } else {
            const loader = async () => {
                return redirect(item.children[0].action);
            };
            navigate(item.children[0].action);
        }
    };

    function openMobileSidebar() {
        setOpenMobileSidebar(true);
    }

    function closeMobileSidebar() {
        setOpenMobileSidebar(false)
    }

	return (
        <Fragment>
            <div className={style.topBar}>
                <UilBars className={style.openMenu} onClick={(e) => openMobileSidebar()}/>
                <div className={style.logo}>
                    <img src={Logo}  alt="Logo"/>
                    <p>Big Corp</p>
                </div>
            </div>
            <div className={`${style.Sidebar} ${className}`}>
                {/* Logo */}
                <div className={style.logo}>
                    <img src={Logo}  alt="Logo"/>
                    <p>Big Corp</p>
                </div>
                {/* <UilAngleRightB className={style.openSidebar}/> */}
                {/* Menu */}
                <div className={style.menu}>
                    {itemList.map((item, index) => {
                        return(
                            <div className={selected===index?`${style.menuItem} ${style.active}`: style.menuItem} 
                                key={index}>
                                <div className={style.head} onClick={()=>onItemClick(item, index)}>
                                    <item.icon className={style.icon}/>
                                    <span>
                                        {item.heading}
                                    </span>
                                </div>
                                {
                                    item.children ? 
                                        <div className={style.dropdown}>
                                            {
                                                item.children.map((child, index) => {
                                                    return (
                                                        <Link to={child.action}
                                                            key={index}
                                                            className={selectedChild === index ? style.activeChild : ""}
                                                            onClick={()=>setSeclectedChild(index)}
                                                        >{child.heading}</Link>
                                                    )
                                                })
                                            }
                                        </div> : ""
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={`${style.SidebarMobile} ${isMobileSidebarOpen ? style.expanded : ''}`}>
                {/* Logo */}
                <div className={style.logo}>
                    <img src={Logo}  alt="Logo"/>
                    <p>Big Corp</p>
                </div>
                <UilTimes className={style.closeMenu} onClick={(e) => closeMobileSidebar()}/>
                
                {/* <UilAngleRightB className={style.openSidebar}/> */}
                {/* Menu */}
                <div className={style.menu}>
                    {itemList.map((item, index) => {
                        return(
                            <div className={selected===index?`${style.menuItem} ${style.active}`: style.menuItem} 
                                key={index}>
                                <div className={style.head} onClick={()=>onItemClick(item, index)}>
                                    <item.icon className={style.icon}/>
                                    <span>
                                        {item.heading}
                                    </span>
                                </div>
                                {
                                    item.children ? 
                                        <div className={style.dropdown}>
                                            {
                                                item.children.map((child, index) => {
                                                    return (
                                                        <Link to={child.action}
                                                            key={index}
                                                            className={selectedChild === index ? style.activeChild : ""}
                                                            onClick={()=>setSeclectedChild(index)}
                                                        >{child.heading}</Link>
                                                    )
                                                })
                                            }
                                        </div> : ""
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        </Fragment>
	)
}

export default Sidebar