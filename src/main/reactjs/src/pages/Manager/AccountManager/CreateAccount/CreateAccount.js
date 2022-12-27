import style from "./CreateAccount.module.scss";
import React, { useState, useEffect } from "react";
import config from "../../../../config.json";
import { UilPlus } from '@iconscout/react-unicons'
import { typeAccounts } from "../AcountItems.js";
import Authentication from '../../../../services/Authentication/Authentication'

export default function CreateAccount(props) {
    const [user, setUser] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        unitId: -1,
        role: "Manufacture"
    });
    const [units, setUnits] = useState([{
        unitId: -1,
        name: " - Chưa chọn - "
    }]);

    function onUserRoleSelect(event) {
        setUser({
            ...user,
            role: event.target.value
        })

        let role = event.target.value
        console.log(role)
        let url = "";
        switch(role) {
            case "Manufacture": 
                url = config.server.api.factory.list.url;
                break;
            case "Distributor":
                url = config.server.api.distributor.list.url;
                break;
            case "Warranty":
                url = config.server.api.warranty.list.url;
                break;
        }
        console.log(url)
        if (url !== "") {
            fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': Authentication.generateAuthorizationHeader()
                }
            }).then((response) => {
                return response.json()
            }).then((data) => {
                console.log(data)
                setUnits([{
                    unitId: -1,
                    name: " - Chưa chọn - "
                }].concat(data))
            })
        }
    }

    // Thẩm định cuối
    function validationForm(event) {
        event.preventDefault();
        
    }

    function onSubmitButtonClick(event) {
        event.preventDefault();
        if (validation()) {
            console.log(user)
            fetch(config.server.api.account.create.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authentication.generateAuthorizationHeader()
                }, 
                body: JSON.stringify({
                    unitId: user.unitId,
                    username: user.username,
                    password: user.password,
                    role: user.role == "Warranty" ? "Warranty center" : user.role
                })
            }).then((response) => {
                if (response.ok) return response.json()
            }).then((data) => console.log(data))
        }
    }

    function validation() {
        if(!/^\S+$/.test(user.username)) {
            alert("Username is not valid")
            return false;
        }
        if (!/^\S{7,20}$/.test(user.password)) {
            alert("Password must not contain space and length from 8 - 20")
            return false;
        }

        if (user.password !== user.confirmPassword) {
            alert("Password and confirm password not the same.")
            return false;
        }

        if (user.role === "None") {
            alert("You must select role")
            return false;
        }

        if (user.unitId === -1) {
            alert("You must select unit")
            return false;
        }

        return true;
    }

    return (
        <>
            <div className={style.container}>
                <h2 className={style.title}>Tạo tài khoản</h2>
                <form className={style.form} action="" method="post">
                    <div className={style.name}>
                        <div className={style.action}>
                            <label htmlFor={style.nameInput}>Tên tài khoản</label>
                            <input
                                type="text"
                                name="name"
                                id={style.nameInput}
                                placeholder="Nhập tên tài khoản"
                                value={user.username}
                                onChange={(e) => setUser({
                                    ...user,
                                    username: e.target.value
                                })}
                            />
                        </div>
                    </div>
                    <div className={style.password}>
                        <div className={style.action}>
                            <label htmlFor={style.password}>Mật khẩu</label>
                            <input
                                placeholder="Nhập mật khẩu"
                                type={"password"}
                                name="pass"
                                id={style.password}
                                value={user.password}
                                onChange={(e) => setUser({
                                    ...user,
                                    password: e.target.value
                                })}
                            />
                        </div>
                    </div>
                    <div className={style.confirmPassword}>
                        <div className={style.action}>
                            <label htmlFor={style.confirmPassword}>Xác nhận mật khẩu</label>
                            <input
                                placeholder="Xác nhận mật khẩu"
                                type={"password"}
                                name="confirmPassword"
                                id={style.confirmPassword}
                                value={user.confirmPassword}
                                onChange={(e) => setUser({
                                    ...user,
                                    confirmPassword: e.target.value
                                })}
                            />
                        </div>
                    </div>
                    <div className={style.accountType}>
                        <div className={style.action}>
                            <label htmlFor={style.accountTypeSelect}>Loại tài khoản</label>
                            <select
                                name="type-acount"
                                id={style.accountTypeSelect}
                                onChange={(e) => onUserRoleSelect(e)}
                            >
                                <option value="None"> - Chưa chọn - </option>
                                {typeAccounts.map((item, index) => {
                                    return (
                                        <option value={item.key} key={index}>
                                            {item.value}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className={style.unit}>
                        <div className={style.action}>
                            <label htmlFor={style.unitSelect}>Chọn đơn vị</label>
                            <select
                                name="type-acount"
                                id={style.unitSelect}
                                onChange={(e) => setUser({
                                    ...user,
                                    unitId: parseInt(e.target.value)
                                })}
                            >
                                {units.map((unit, index) => {
                                    return (
                                        <option value={unit.unitId} key={index}>
                                            {unit.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className={style.submitButton}>
                        <button type="submit" onClick={(e) => onSubmitButtonClick(e)}>
                                <UilPlus className={style.icon}/>
                                <span>Tạo tài khoản</span>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
