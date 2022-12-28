import style from './CreateWarranty.module.scss';
import Authentication from '../../../../services/Authentication/Authentication';
import config from '../../../../config.json';
import Checkout from '../../ServiceCenter/ServiceCenter';

import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import {ListItem, Paper} from "@mui/material";
import { useState } from 'react';

export default function CreateWarranty() {
    const [customer, setCustomer] = useState({});
    const [product, setProduct] = useState({});
    const [isCustomerValidated, setCustomerValidate] = useState(false);
    const [isProductValidated, setProductValidate] = useState(false);



    function loadCustomer(customerId) {

        // const errorHanle = (response) => {
        //     response.json()
        // }

        if (!/^\d+$/.test(customerId)) {
            alert("Mã khách hàng không hợp lệ")
            return;
        }

        let url = config.server.api.customer.get.url + "?customerId=" + customerId;
        fetch(url, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {
                alert("Người dùng không tồn tại")
                setCustomerValidate(false)
                setCustomer({})
            }
        }).then((data) => {
            if (data != undefined) {
                setCustomer(data);
                setCustomerValidate(true);
            }
        })
    }

    function loadProduct(productId) {
        if (!/^\d+$/.test(productId)) {
            alert("Mã sản phẩm không hợp lệ")
            return;
        }

        let url = config.server.api.product.get.url + "?productId=" + productId;
        fetch(url, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {
                alert("Sản phẩm không tồn tại")
                setProductValidate(false)
                setProduct({})
            }
        }).then((data) => {
            if (data != undefined) {
                console.log(data)
                setProductValidate(true)
                setProduct(data);
            }
        })
    }

    return (
        <div className={style.container}>
            <p className={style.title}>Tạo yêu cầu bảo hành</p>
            
            <div>
                <label htmlFor="" className={style.label}>Mã khách hàng</label>
                <input onBlur={(e) => loadCustomer(e.target.value)} type="text" className={style.input} placeholder="Nhập mã khách hàng"/>
            </div>
            { isCustomerValidated ? <div className={style.customerInfo}>
                <Typography variant="h6" gutterBottom>
                    Thông tin khách hàng
                </Typography>
                <ListItem sx={{ mb: 0 }}>
                    Mã khách hàng:
                    <Typography sx={{ ml: 2 }}>{customer.id}</Typography>
                </ListItem>
                <ListItem sx={{ mb: 0 }}>
                    Số điện thoại:
                    <Typography sx={{ ml: 2 }}>{customer.phoneNumber}</Typography>
                </ListItem>
                <ListItem sx={{ mb: 1 }}>
                    Địa chỉ:
                    <Typography sx={{ ml: 2 }}>{customer.address}</Typography>
                </ListItem>
            </div> : <></>}
            <div>
                <label htmlFor="" className={style.label}>Mã sản phẩm</label>
                <input onBlur={(e) => loadProduct(e.target.value)}  type="text" className={style.input} placeholder="Nhập mã sản phẩm"/>
            </div>
            { isProductValidated ? <div className={style.productInfo}>
                <Typography variant="h6">
                    Thông tin sản phẩm
                </Typography>
                <ListItem sx={{ mb: 0 }}>
                    Mã sản phẩm:
                    <Typography sx={{ ml: 2 }}>{product.id}</Typography>
                </ListItem>
                <ListItem sx={{ mb: 0 }}>
                    Mã dòng sản phẩm:
                    <Typography sx={{ ml: 2 }}>{product.productLine.id}</Typography>
                </ListItem>
                <ListItem sx={{ mb: 0 }}>
                    Tên dòng sản phẩm:
                    <Typography sx={{ ml: 2 }}>{product.productLine.productName}</Typography>
                </ListItem>
                <ListItem sx={{ mb: 0 }}>
                    Ngày kích hoạt:
                    <Typography sx={{ ml: 2 }}>{product.date}</Typography>
                </ListItem>
            </div> : <></>}
            <div>
                <label htmlFor="" className={style.label}>Ngày bảo hành</label>
                <input type="date" className={style.input} placeholder="Nhập mã sản phẩm"/>
            </div>
        </div>
    )
}