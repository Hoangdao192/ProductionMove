import style from './EditCustomer.module.scss';
import Authentication from '../../../../services/Authentication/Authentication';
import config from '../../../../config.json';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UilSave } from '@iconscout/react-unicons';

export default function EditCustomer() {
    const [customer, setCustomer] = useState(useLocation().state.customer)
    const [isNavigateBack, setNavigateBack] = useState(false);
    const navigate = useNavigate()

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
            alert("Bạn chưa nhập họ của khách hàng")
            return false;
        }
        if (customer.lastName === "") {
            alert("Bạn chưa nhập tên khách hàng")
            return false;
        }
        if (customer.address === "") {
            alert("Bạn chưa nhập địa chỉ của khách hàng")
            return false;
        }
        if (customer.phoneNumber === "") {
            alert("Bạn chưa nhập số điện thoại của khách hàng")
            return false;
        } else if (!/^\d+$/.test(customer.phoneNumber)) {
            alert("Số điện thoại của khách hàng không hợp lệ")
            return false;
        } else if (customer.phoneNumber.length < 10) {
            alert("Số điện thoại phải có ít nhất 10 chữ số");
            return false;
        }
        return true;
    }

    function sendCreateCustomerRequest() {
        if (validation()) {
            let url = config.server.api.customer.update.url;
            fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authentication.generateAuthorizationHeader()
                },
                body: JSON.stringify(customer)
            }).then((response) => {
                if (response.status === 200) {
                    alert("Cập nhập thông tin thành công")
                    navigate(-1)
                } else {
                    alert("Không thành công")
                }
            })
        }
    }

    return (
        <div className={style.container}>
            <p className={style.title}>
                Sửa thông tin khách hàng
            </p>
            <div>
                <label htmlFor="" className={style.label}>
                    Mã khách hàng
                </label>
                <input value={customer.id} readOnly type="text" className={style.input} placeholder="Nhập họ" />
            </div>
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
                <UilSave className={style.icon}/>
                <span>Lưu thông tin</span>
            </button>
        </div>
    )
}