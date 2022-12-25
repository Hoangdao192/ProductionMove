import style from './EditUnit.module.scss'
import { UilPlus } from '@iconscout/react-unicons'
import { css, Input } from '@nextui-org/react'
import { InputLabel, Select, MenuItem, FormControl } from '@mui/material'
import { UilSave } from '@iconscout/react-unicons'
import { useState } from 'react'
import config from '../../../config.json'
import { typeAccounts } from '../AccountManager/AcountItems'
import { useLocation } from 'react-router-dom'

export default function EditUnit() {

    const { unit } = useLocation().state
    const [data, setData] = useState(unit)
    console.log(unit)

    function onPhoneNumberInput(event) {
        let value = event.target.value;
        if (value.charAt(value.length - 1) < "0" || value.charAt(value.length - 1) > "9") {
            if (value.length > 0) {
                value = value.substr(0, value.length - 1);
            }
            setData({
                ...data,
                phoneNumber: value
            })
        }
    }

    function onCreateButtonClick(event) {
        event.preventDefault();
        if (validation()) {
            sendRequest();
        }
    }

    function validation() {
        if (data.name.length == 0) {
            alert('Tên không được để trống')
            return false;
        }
        if (data.address.length == 0) {
            alert('Địa chỉ không được để trống')
            return false;
        }
        if (data.phoneNumber.length == 0) {
            alert('Số điện thoại không được để trống')
            return false;
        }
        if (data.phoneNumber.length < 10) {
            alert('Số điện thoại không hợp lệ (Độ dài ít nhất là 10 kí tự)')
            return false;
        }

        if (!/^\d+$/.test(data.phoneNumber)) {
            alert('Sai định dạng số điện thoại')
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: data.id,
                name: data.name,
                address: data.address,
                phoneNumber: data.phoneNumber
            })
        }).then((response) => console.log(response))
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
                        onKeyDown={(e) => onPhoneNumberInput(e)}
                        onKeyUp={(e) => onPhoneNumberInput(e)}
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