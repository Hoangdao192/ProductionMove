import "./Navbar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const Navbar = () => {
  const [menuMobile, setMenuMobile] = useState(false);

  const handleClick = () => setMenuMobile(!menuMobile);
  const closeMobile = () => setMenuMobile(false);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          CDD
          <i className="fab fa-firstdraft"></i>
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={menuMobile ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        <ul className={menuMobile ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobile}>
              Trang chủ
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-links" onClick={closeMobile}>
              Dòng sản phẩm
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/location" className="nav-links" onClick={closeMobile}>
              Cơ sở
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/login"
              className="nav-links-mobile"
              onClick={closeMobile}
            >
              Đăng nhập
            </Link>
          </li>
        </ul>
        <Button />
      </nav>
    </>
  );
};

export default Navbar;
