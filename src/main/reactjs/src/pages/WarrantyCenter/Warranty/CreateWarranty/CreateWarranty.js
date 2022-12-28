import style from './CreateWarranty.module.scss';
import Authentication from '../../../../services/Authentication/Authentication';
import config from '../../../../config.json';
import Checkout from '../../ServiceCenter/ServiceCenter';
import { UilPlus } from '@iconscout/react-unicons'

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

    const [reducer, forceUpdate] = React.useReducer(x => x + 1, 0);

    const [warranty, setWarranty] = useState({
        customerProductId: "",
        startWarrantyDate: "",
        warrantyDate: "",
        warrantyCenterId: ""
    })

    function resetComponent() {
        setCustomer({});
        setProduct({});
        setCustomerValidate(false);
        setProductValidate(false);
        setWarranty({
            customerProductId: "",
            startWarrantyDate: "",
            warrantyDate: "",
            warrantyCenterId: ""
        })
        forceUpdate()
    }

    const [warrantyCenter, setWarrantyCenter] = useState({});
    const user = Authentication.getCurrentUser();

    function loadWarrantyCenter() {
        return new Promise((resolve, reject) => {
            let url = config.server.api.warranty.get.url + "?unitId=" + user.unit.id;
            fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': Authentication.generateAuthorizationHeader()
                }
            }).then((response) => {
                if (response.status == 200) {
                    return response.json()
                }
            }).then((warrantyCenter) => {
                if (warrantyCenter != undefined) {
                    resolve(warrantyCenter);
                }
            })
        })
    }

    function validation() {
        if (!isCustomerValidated) {
            alert("Bạn chưa nhập mã khách hàng hoặc khách hàng không tồn tại")
            return false;
        }

        if (!isProductValidated) {
            alert("Bạn chưa nhập mã sản phẩm hoặc sản phẩm không tồn tại.")
            return false;
        }

        if (warranty.startWarrantyDate == "") {
            alert("Bạn chưa chọn ngày bắt đầu bảo hành hoặc ngày đã chọn không hợp lệ.")
            return false;
        }
        return true;
    }

    function sendRequest() {
        if (!validation()) return;

        let url = config.server.api.warranty.warranty.create.url;
        fetch(url, {
            method: "POST",
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader(),
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                customerProductId: product.id,
                startWarrantyDate: warranty.startWarrantyDate,
                warrantyCenterId: warrantyCenter.id
            })
        }).then((response) => {
            if (response.status == 200) {
                alert("Tạo đơn bảo hành thành công.")
            } else {
                alert("Không thành công")
            }
        })
    }

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

    React.useEffect(() => {
        loadWarrantyCenter().then((warrantyCenter) => {
            setWarrantyCenter(warrantyCenter)
        })
    }, [reducer])

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
                <input value={warranty.startWarrantyDate} 
                    onChange={(e) => setWarranty({
                        ...warranty,
                        startWarrantyDate: e.target.value
                    })} type="date" className={style.input} placeholder="Nhập mã sản phẩm"/>
            </div>
            <button onClick={(e) => sendRequest()} className={style.actionButton}>
                <UilPlus className={style.icon}/>
                Tạo đơn bảo hành
            </button>
        </div>
    )
}