import style from './EditUnit.module.scss'
import { UilSave } from '@iconscout/react-unicons'
import { useState } from 'react'
import config from '../../../config.json'
import { typeAccounts } from '../AccountManager/AcountItems'
import { useLocation, useNavigate } from 'react-router-dom'
import Authentication from '../../../services/Authentication/Authentication';
import Validator from '../../../services/validator/Validator'
import { toast } from 'react-toastify'

export default function EditUnit() {

    const { unit } = useLocation().state
    const [data, setData] = useState(unit)

    const navigate = useNavigate()

    function onCreateButtonClick(event) {
        event.preventDefault();
        if (validation()) {
            sendRequest();
        }
    }

    function validation() {
        if (Validator.isEmpty(data.name)) {
            toast.error('Tên không được để trống')
            return false;
        }
        if (Validator.isEmpty(data.address)) {
            toast.error('Địa chỉ không được để trống')
            return false;
        }
        if (Validator.isEmpty(data.phoneNumber)) {
            toast.error('Số điện thoại không được để trống.')
            return false;
        }
        if (!Validator.isPhoneNumberValid(data.phoneNumber)) {
            toast.error('Số điện thoại không hợp lệ')
            return false;
        }

        return true;
    }

    function sendRequest() {
        let url = "";

        switch(data.type) {
            case 'Manufacture': 
                url = config.server.api.factory.update.url; 
                break;
            case 'Distributor':
                url = config.server.api.distributor.update.url;
                break;
            case 'Warranty':
                url = config.server.api.warranty.update.url;
                break;
        }

        fetch (url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Authentication.generateAuthorizationHeader()
            },
            body: JSON.stringify({
                id: data.id,
                name: data.name,
                address: data.address,
                phoneNumber: data.phoneNumber
            })
        }).then((response) => {
            if (response.status == 200) {
                toast.success("Cập nhập đơn vị thành công")
                navigate(-1)
            } else {
                toast.error("Cập nhập đơn vị không thành công")
            }
        })
    }

    return (
        <div className={`${style.createUnit}`}>
            <form action="">
                <p className={style.title}>
                    Sửa đơn vị
                </p>
                <div>
                    <label htmlFor={style.unitType}>
                        Loại đơn vị
                    </label>
                    <input className={style.input} type="text" readOnly value={typeAccounts[data.type]} />
                </div>
                <div>
                    <label htmlFor={style.nameInput}>
                        Tên {typeAccounts[data.type]}
                    </label>
                    <input type="text" required
                        value={data.name}
                        onChange={(e) => setData({
                            ...data,
                            name: e.target.value
                        })}
                        placeholder='Nhập tên' name="name" 
                        id={style.nameInput} className={style.input}/>
                </div>
                <div>
                    <label htmlFor={style.addressInput}>
                        Địa chỉ
                    </label>
                    <input type="text" required
                        value={data.address}
                        onChange={(e) => setData({
                            ...data,
                            address: e.target.value
                        })}
                        placeholder='Nhập địa chỉ' name="address" 
                        id={style.addressInput} className={style.input}/>
                </div>
                <div>
                    <label htmlFor={style.phoneInput}>
                        Số điện thoại
                    </label>
                    <input type="tel" required
                        maxLength={20}
                        minLength={10}
                        value={data.phoneNumber}
                        onChange={(e) => setData({
                            ...data,
                            phoneNumber: e.target.value
                        })}
                        placeholder='Nhập số điên thoại' name="phoneNumber" 
                        id={style.phoneInput} className={style.input}/>
                </div>

                <button className={style.createButton}
                    onClick={
                        (e) => onCreateButtonClick(e)
                    }>
                    <UilSave className={style.icon}/>
                    <span>Cập nhập</span>
                </button>
            </form>
        </div>
    )

}