import "./CreateAccount.css";
import React, { useState, useEffect } from "react";
import config from "../../../../config.json";

import { typeAccounts } from "../AcountItems.js";


export default function CreateAccount(props) {
    const [user, setUser] = useState({role: "Manufacture"});
    const [profile, setProfile] = useState({});
    const [message, setMessage] = useState({});

    // Thẩm định cuối
    function validationForm(event) {
        event.preventDefault();
        let request = new XMLHttpRequest();
        request.open("POST", config.server.api.account.create.url);
        request.setRequestHeader("Content-type", "application/json");
        
        request.onreadystatechange = function() {
            if (request.readyState == 4 && (request.status == 200 || request.status == 202)) {
                let result = JSON.parse(request.response);
                console.log(result);

                let request2 = new XMLHttpRequest();
                let requestUrl = '';
                switch(user.role) {
                    case "Manufacture": requestUrl = config.server.api.factory.create.url;
                        break;
                    case "Distributor": requestUrl = config.server.api.distributor.create.url;
                        break;
                    case "Warranty center": requestUrl = config.server.api.warranty.create.url;
                        break;
                }
                request2.open("POST", requestUrl);
                request2.setRequestHeader("Content-type", "application/json");
                request2.send(JSON.stringify({
                    name: profile.name,
                    userId: result.content.user.id,
                    address: profile.address,
                    phoneNumber: profile.phoneNumber
                }))

            }
        }
        request.send(JSON.stringify({
            username: user.username,
            password: user.password,
            role: user.role
        }));
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
                                value={user.username}
                                onChange={(e) => setUser({
                                    ...user,
                                    username: e.target.value
                                })}
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
                                value={user.password}
                                onChange={(e) => setUser({
                                    ...user,
                                    password: e.target.value
                                })}
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
                                value={user.confirmPassword}
                                onChange={(e) => setUser({
                                    ...user,
                                    confirmPassword: e.target.value
                                })}
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
                                onChange={(e) => setUser({
                                    ...user,
                                    role: e.target.value
                                })}
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
                                value={profile.name}
                                onChange={(e) => setProfile({
                                    ...profile,
                                    name: e.target.value
                                })}
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
                                value={profile.address}
                                onChange={(e) => setProfile({
                                    ...profile,
                                    address: e.target.value
                                })}
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
                                value={profile.phoneNumber}
                                onChange={(e) => setProfile({
                                    ...profile,
                                    phoneNumber: e.target.value
                                })}
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
