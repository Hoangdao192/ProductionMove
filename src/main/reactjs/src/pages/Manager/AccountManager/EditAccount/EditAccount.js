import style from "./EditAccount.module.scss";
import React, { useState, useEffect } from "react";
import config from "../../../../config.json";
import { UilSave } from '@iconscout/react-unicons'
import { typeAccounts } from "../AcountItems.js";
import { useLocation, useNavigate } from "react-router-dom";
import Authentication from '../../../../services/Authentication/Authentication'
import Validator from "../../../../services/validator/Validator";
import { toast } from "react-toastify";

export default function EditAccount() {
    let oldUser = useLocation().state.user;
    const [user, setUser] = useState({
        ...oldUser,
        password: "",
        unitId: oldUser.unit.id,
        confirmPassword: ""
    });

    const navigate = useNavigate();

    function onSubmitButtonClick(event) {
        event.preventDefault();
        if (validation()) {
            console.log(user)
            fetch(config.server.api.account.update.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authentication.generateAuthorizationHeader()
                }, 
                body: JSON.stringify({
                    id: user.id,
                    username: user.username,
                    password: user.password,
                    role: user.role,
                    unitId: user.unit.id
                })
            }).then((response) => {
                if (response.status == 200) {
                    toast.success("Đổi mật khẩu thành công");
                    navigate(-1)
                } else {
                    toast.error("Đổi mật khẩu không thành công");
                }
            })
        }
    }

    function validation() {
        if (Validator.isEmpty(user.password)) {
            toast.error("Bạn chưa nhập mật khẩu")
            return false;
        }
        if (!Validator.isPasswordValid(user.password)) {
            toast.error("Mật khẩu phải chưa 8 - 20 kí tự và không có dấu cách.")
            return false;
        }
        if (Validator.isEmpty(user.confirmPassword)) {
            toast.error("Bạn chưa xác nhận mật khẩu")
            return false;
        }
        if (user.password !== user.confirmPassword) {
            alert("Mật khẩu và xác nhận mật khẩu không giống nhau.")
            return false;
        }
        return true;
    }

    return (
        <>
            <div className={style.container}>
                <h2 className={style.title}>Đổi mật khẩu</h2>
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
                            <label htmlFor={style.accountTypeInput}>Loại tài khoản</label>
                            <input
                                type={"text"}
                                name="accountType"
                                id={style.accountTypeInput}
                                readOnly
                                value={typeAccounts[user.role == "Warranty center" ? "Warranty" : user.role]}
                            />
                        </div>
                    </div>
                    <div className={style.submitButton}>
                        <button type="submit" onClick={(e) => onSubmitButtonClick(e)}>
                                <UilSave className={style.icon}/>
                                <span>Cập nhập</span>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
