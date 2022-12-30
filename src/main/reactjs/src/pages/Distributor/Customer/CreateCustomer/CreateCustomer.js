import style from './CreateCustomer.module.scss';
import { UilPlus } from '@iconscout/react-unicons'

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from 'react';

import config from '../../../../config.json';
import Authentication from '../../../../services/Authentication/Authentication';
import { toast } from 'react-toastify';
import ServerAPI from '../../../../services/ServerAPI';

export default function CreateCustomer() {
    const user = Authentication.getCurrentUser();

    const [customer, setCustomer] = useState({
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: ""
    })

    function resetComponent() {
        setCustomer({
            firstName: "",
            lastName: "",
            address: "",
            phoneNumber: ""
        })
    }

    function validation() {
        if (customer.firstName === "") {
            toast.error("Bạn chưa nhập họ của khách hàng")
            return false;
        }
        if (customer.lastName === "") {
            toast.error("Bạn chưa nhập tên khách hàng")
            return false;
        }
        if (customer.address === "") {
            toast.error("Bạn chưa nhập địa chỉ của khách hàng")
            return false;
        }
        if (customer.phoneNumber === "") {
            toast.error("Bạn chưa nhập số điện thoại của khách hàng")
            return false;
        } else if (!/^\d+$/.test(customer.phoneNumber)) {
            toast.error("Số điện thoại của khách hàng không hợp lệ")
            return false;
        } else if (customer.phoneNumber.length < 10) {
            toast.error("Số điện thoại phải có ít nhất 10 chữ số");
            return false;
        }
        return true;
    }

    function sendCreateCustomerRequest() {
        if (validation()) {
            ServerAPI.getDistributorByUnitId(user.unit.id)
                .then((distributor) => {
                    let url = config.server.api.customer.create.url;
                    fetch(url, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': Authentication.generateAuthorizationHeader()
                        },
                        body: JSON.stringify({
                            ...customer,
                            distributorId: distributor.id
                        })
                    }).then((response) => {
                        if (response.status === 200) {
                            toast.success("Tạo khách hàng thành công")
                            resetComponent()
                        } else {
                            toast.error("Tạo khách hàng không thành công")
                        }
                    })
                })
        }
    }

    return (
        <div className={style.container}>
            <p className={style.title}>
                Tạo khách hàng mới 
            </p>
            <div>
                <label htmlFor="" className={style.label}>
                    Họ
                </label>
                <input value={customer.firstName} onChange={(e) => {
                    setCustomer({ ...customer, firstName: e.target.value})    
                }} type="text" className={style.input} placeholder="Nhập họ" />
            </div>
            <div>
                <label htmlFor="" className={style.label}>
                    Tên
                </label>
                <input value={customer.lastName} onChange={(e) => {
                    setCustomer({ ...customer, lastName: e.target.value})    
                }} type="text" className={style.input} placeholder="Nhập tên" />
            </div>
            <div>
                <label htmlFor="" className={style.label}>
                    Địa chỉ
                </label>
                <input value={customer.address} onChange={(e) => {
                    setCustomer({ ...customer, address: e.target.value})    
                }} type="text" className={style.input} placeholder="Nhập địa chỉ" />
            </div>
            <div>
                <label htmlFor="" className={style.label}>
                    Số điện thoại
                </label>
                <input value={customer.phoneNumber} onChange={(e) => {
                    setCustomer({ ...customer, phoneNumber: e.target.value})    
                }} type="text" className={style.input} placeholder="Nhập số điện thoại" />
            </div>

            <button className={style.actionButton} onClick={(e) => sendCreateCustomerRequest()}>
                <UilPlus className={style.icon}/>
                <span>Tạo khách hàng mới</span>
            </button>
        </div>
    )
}