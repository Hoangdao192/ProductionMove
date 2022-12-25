import style from "./EditAccount.module.scss";
import React, { useState, useEffect } from "react";
import config from "../../../../config.json";
import { UilPlus } from '@iconscout/react-unicons'
import { typeAccounts } from "../AcountItems.js";
import { useLocation } from "react-router-dom";


export default function EditAccount() {
    const [user, setUser] = useState(useLocation().state.user);


    function onSubmitButtonClick(event) {
        event.preventDefault();
        if (validation()) {
            console.log(user)
            fetch(config.server.api.account.update.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({
                    id: user.id,
                    username: user.username,
                    password: user.password,
                    role: user.role
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
                                readOnly
                                value={user.username}
                            />
                        </div>
                    </div>
                    <div className={style.password}>
                        <div className={style.action}>
                            <label htmlFor={style.password}>Mật khẩu</label>
                            <input
                                placeholder="Nhập mật khẩu"
                                type={"password"}
                                name="password"
                                id={style.password}
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
                            <label htmlFor={style.accountTypeInput}>Loại tài khoản</label>
                            <input
                                type={"text"}
                                name="accountType"
                                id={style.accountTypeInput}
                                readOnly
                                value={typeAccounts[user.role]}
                            />
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
