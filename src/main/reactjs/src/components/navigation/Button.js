import './Button.css'
import React from 'react';
import { Link } from 'react-router-dom';

const Button = () => {
    return (
        <Link to='/'>
            <button className='btn'>
                Đăng nhập
            </button>
        </Link>
    );
}

export default Button;
