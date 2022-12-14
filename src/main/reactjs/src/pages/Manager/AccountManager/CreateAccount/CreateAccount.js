import "./CreateAccount.css";
import React, { useState, useEffect } from "react";
import config from "../../../../config.json";

import { typeAccounts } from "../AcountItems.js";
import {
    nameValidation,
    userValidation,
    passValidation,
    passAgainValidation,
    emailValidation,
    typeAcountValidation,
    avatartValidation,
} from "../Validation/ValidationFrom.js";

export default function CreateAccount(props) {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [passAgain, setPassAgain] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [typeAcount, setTypeAcount] = useState(-1);
    const [avatar, setAvatar] = useState("");
    const [message, setMessage] = useState({
        name: null,
        user: null,
        pass: null,
        passAgain: null,
        email: null,
        typeAcount: null,
        avatar: null,
    });

    // Hiển thị trước avatar
    useEffect(() => {
        // effect
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    // Hiển thị trước avatar
    const handleAvatar = (e) => {
        const file = e.target.files[0];

        if (file) {
            file.preview = URL.createObjectURL(file);
            console.log(file.preview);
        }

        setAvatar(file);
    };

    // Thẩm định cuối
    function validationForm(event) {
        console.log("Validation!");
        const result = {};
        result.name = nameValidation(name);
        result.user = userValidation(user);
        result.pass = passValidation(pass);
        result.passAgain = passAgainValidation(pass, passAgain);
        result.email = emailValidation(email);
        result.typeAcount = typeAcountValidation(typeAcount);
        result.avatar = avatartValidation(avatar);

        setMessage(result);
        event.preventDefault();
        if (
            !(
                result.name.validation &&
                result.user.validation &&
                result.pass.validation &&
                result.passAgain.validation &&
                result.typeAcount.validation
            )
        ) {
            console.log("NOT RUN") 
            
            
        } else {
            console.log("RUN")
            let request = new XMLHttpRequest();
            request.open("POST", config.server.api.account.create.url);
            request.setRequestHeader("Content-type", "application/json");
            let data = {
                username: name,
                password: pass,
                type: typeAcount,
                name: user,
                phoneNumber: "54666"
            }
            console.log(data);
            request.send(JSON.stringify(data));
        }
    }

    return (
        <>
            <div className="container">
                <h2 className="title">Tạo tài khoản</h2>
                <form action="" method="post">
                    <div className="name">
                        <div className="action">
                            <label htmlFor="name">Tên tài khoản</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Trần Đình Cường"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="alert">
                            {message.name && !message.name.validation && (
                                <p>{message.name.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="pass">
                        <div className="action">
                            <label htmlFor="pass">Mật khẩu</label>
                            <input
                                type="password"
                                name="pass"
                                id="pass"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                            />
                        </div>
                        <div className="alert">
                            {message.pass && !message.pass.validation && (
                                <p>{message.pass.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="pass-again">
                        <div className="action">
                            <label htmlFor="pass-again">Xác nhận mật khẩu</label>
                            <input
                                type="password"
                                name="pass-again"
                                id="pass-again"
                                value={passAgain}
                                onChange={(e) => setPassAgain(e.target.value)}
                            />
                        </div>
                        <div className="alert">
                            {message.passAgain && !message.passAgain.validation && (
                                <p>{message.passAgain.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="type-acount">
                        <div className="action">
                            <label htmlFor="type-acount">Loại tài khoản</label>
                            <select
                                name="type-acount"
                                id="type-acount"
                                onChange={(e) => setTypeAcount(e.target.value)}
                            >
                                {typeAccounts.map((item, index) => {
                                    return (
                                        <option value={item.key} key={index}>
                                            {item.value}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="alert">
                            {message.typeAcount && !message.typeAcount.validation && (
                                <p>{message.typeAcount.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="user">
                        <div className="action">
                            <label htmlFor="user">Tên người dùng</label>
                            <input
                                type="text"
                                name="user"
                                id="user"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                            />
                        </div>
                        <div className="alert">
                            {message.user && !message.user.validation && (
                                <p>{message.user.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="address">
                        <div className="action">
                            <label htmlFor="address">Địa chỉ</label>
                            <input
                                name="address"
                                id="address"
                                placeholder="Nhập địa chỉ"
                            />
                        </div>
                        <div className="alert">
                            {message.passAgain && !message.passAgain.validation && (
                                <p>{message.passAgain.message}</p>
                            )}
                        </div>
                    </div>     
                    <div className="phoneNumber">
                        <div className="action">
                            <label htmlFor="phoneNumber">Số điện thoại</label>
                            <input
                                name="phoneNumber"
                                id="phoneNumber"
                                placeholder="Nhập số điện thoại"
                            />
                        </div>
                        <div className="alert">
                            {message.passAgain && !message.passAgain.validation && (
                                <p>{message.passAgain.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="button-summit">
                        <button type="submit" onClick={(e) => validationForm(e)}>
                            Tạo tài khoản
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
