import style from "./CreateAccount.module.scss";
import React, { useState, useEffect, useReducer } from "react";
import config from "../../../../config.json";
import { UilPlus } from '@iconscout/react-unicons'
import Authentication from '../../../../services/Authentication/Authentication'
import { toast } from "react-toastify";
import Validator from "../../../../services/validator/Validator";

const typeAccounts = [
    { key: "Manufacture", value: "Cơ sở sản xuất"},
    { key: "Distributor", value: "Đại lý"},
    { key: "Warranty", value: "Trung tâm bảo hành"}
];
typeAccounts["Manufacture"] = "Cơ sở sản xuất";
typeAccounts["Distributor"] = "Đại lý";
typeAccounts["Warranty"] = "Trung tâm bảo hành";

export default function CreateAccount() {
    const [reducer, forceReset] = useReducer(x => x + 1, 0);
    const [user, setUser] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        unitId: -1,
        role: "None"
    });
    const [units, setUnits] = useState([{
        unitId: -1,
        name: " - Chưa chọn - "
    }]);

    function resetComponent() {
        setUser({
            username: "",
            password: "",
            confirmPassword: "",
            unitId: -1,
            role: "None"
        });
        setUnits([{
            unitId: -1,
            name: " - Chưa chọn - "
        }]);
    }

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

        if (url !== "") {
            fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': Authentication.generateAuthorizationHeader()
                }
            }).then((response) => {
                if (response.status == 200) {
                    return response.json();
                } else toast.warn("Không thể tải dữ liệu.")
            }).then((data) => {
                if (data != undefined) {
                    setUnits([{
                        unitId: -1,
                        name: " - Chưa chọn - "
                    }].concat(data))
                }
            })
        }
    }

    function onSubmitButtonClick(event) {
        event.preventDefault();
        if (validation()) {
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
                if (response.status == 200) {
                    toast.success("Tạo tài khoản thành công.")
                    resetComponent();
                } else {
                    toast.error("Tạo tài khoản không thành công.")
                }
            })
        }
    }

    function validation() {
        if (Validator.isEmpty(user.username)) {
            toast.error("Tên tài khoản không được để trống.")
            return false;
        }
        if(!Validator.isUserNameValid(user.username)) {
            toast.error("Tên tài khoản không chứa dấu cách.")
            return false;
        }
        if (Validator.isEmpty(user.password)) {
            toast.error("Mật khẩu không được để trống.")
            return false;
        }
        if (!Validator.isPasswordValid(user.password)) {
            toast.error("Mật khẩu phải từ 8 đến 20 kí tự và không chứa dấu cách.")
            return false;
        }
        if (Validator.isEmpty(user.confirmPassword)) {
            toast.error("Bạn chưa xác nhận mật khẩu")
        }
        if (user.password !== user.confirmPassword) {
            toast.error("Mật khẩu và xác nhận mật khẩu không giống nhau.")
            return false;
        }

        if (Validator.isEmpty(user.role)) {
            toast.error("Bạn chưa chọn loại tài khoản")
            return false;
        }

        if (user.unitId === -1) {
            toast.error("Bạn chưa chọn đơn vị cấp tài khoản")
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
