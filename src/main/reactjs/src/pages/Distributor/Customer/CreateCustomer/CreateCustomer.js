import style from './CreateCustomer.module.scss';

import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { UilPlus } from '@iconscout/react-unicons'

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from 'react';

const theme = createTheme();

export default function CreateCustomer() {
    const [customer, setCustomer] = useState({
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: ""
    })

    return (
        <div className={style.container}>
            <p className={style.title}>
                Tạo khách hàng mới 
            </p>
            <div>
                <label htmlFor="" className={style.label}>
                    Họ
                </label>
                <input type="text" className={style.input} placeholder="Nhập họ" />
            </div>
            <div>
                <label htmlFor="" className={style.label}>
                    Tên
                </label>
                <input type="text" className={style.input} placeholder="Nhập tên" />
            </div>
            <div>
                <label htmlFor="" className={style.label}>
                    Địa chỉ
                </label>
                <input type="text" className={style.input} placeholder="Nhập địa chỉ" />
            </div>
            <div>
                <label htmlFor="" className={style.label}>
                    Số điện thoại
                </label>
                <input type="text" className={style.input} placeholder="Nhập số điện thoại" />
            </div>

            <button className={style.actionButton}>
                <UilPlus className={style.icon}/>
                <span>Tạo khách hàng mới</span>
            </button>
        </div>
    )
}