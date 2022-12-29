import style from './CreateUnit.module.scss'
import { UilPlus } from '@iconscout/react-unicons'
import { useReducer, useState } from 'react'
import config from '../../../config.json'
import { typeAccounts } from '../AccountManager/AcountItems'
import Authentication from '../../../services/Authentication/Authentication';
import ServerMessageParser from '../../../services/ServerMessageParser';
import Validator from '../../../services/validator/Validator';
import { toast } from 'react-toastify'

export default function CreateUnit() {
    const [reducer, forceReset] = useReducer(x => x + 1, 0);
    const [data, setData] = useState({ 
        type: "None",
        name: "",
        address: "",
        phoneNumber: ""
    });

    function resetComponent() {
        setData({ 
            type: "None",
            name: "",
            address: "",
            phoneNumber: ""
        });
        forceReset();
    }

    function onCreateButtonClick(event) {
        event.preventDefault();
        if (validation()) {
            sendRequest();
        }
    }

    function validation() {
        if (Validator.isEmpty(data.type)) {
            toast.error('Bạn chưa chọn loại đơn vị')
            return false;
        }
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
                url = config.server.api.factory.create.url; 
                break;
            case 'Distributor':
                url = config.server.api.distributor.create.url;
                break;
            case 'Warranty':
                url = config.server.api.warranty.create.url;
                break;
        }

        fetch (url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Authentication.generateAuthorizationHeader()
            },
            body: JSON.stringify({
                name: data.name,
                address: data.address,
                phoneNumber: data.phoneNumber
            })
        }).then((response) => {
            if (response.status == 200) {
                toast.success("Tạo đơn vị mới thành công")
                resetComponent()
            } else {
                toast.error("Tạo đơn vị mới không thành công")
            }
        })
    }

    return (
        <div className={`${style.createUnit}`}>
            <form action="">
                <p className={style.title}>
                    Tạo đơn vị mới
                </p>
                <div>
                    <label htmlFor={style.unitType}>
                        Loại đơn vị
                    </label>
                    <select name="type" id={style.unitType}
                        onChange={(e) => setData({
                            ...data,
                            type: e.target.value
                        })}
                    >
                        <option value="None"> - Chưa chọn - </option>
                        <option value="Manufacture">Cơ sở sản xuất</option>
                        <option value="Distributor">Đại lý</option>
                        <option value="Warranty">Trung tâm bảo hành</option>
                    </select>
                </div>
                <div>
                    <label htmlFor={style.nameInput}>
                        Tên {data.type !== "None" ? typeAccounts[data.type] : "đơn vị"}
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
                    <UilPlus className={style.icon}/>
                    <span>Tạo mới</span>
                </button>
            </form>
        </div>
    )

}