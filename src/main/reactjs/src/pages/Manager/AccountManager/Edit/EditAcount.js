import "./EditAcount.css";
import React, { useState, useEffect } from "react";
import userAvatar from "./user.jpg";
import { acounts, typeAccounts } from "../AcountItems.js";
import config from "../../../../config.json";
import {
    nameValidation,
    userValidation,
    passValidation,
    passAgainValidation,
    emailValidation,
    typeAcountValidation,
    avatartValidation,
} from "../Validation/ValidationFrom.js";
import { useLocation } from "react-router-dom";
import ReactModal from "react-modal";

export default function EditAcount(props) {
    const { account } = useLocation().state;
    const [userData, setUserData] = useState({});
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
        /**Load user data */
        let requestUrl = "";
        switch (account.role) {
            case "Distributor": requestUrl = config.server.api.distributor.get.url; break;
            case "Manufacture": requestUrl = config.server.api.factory.get.url; break;
            case "Warranty": requestUrl = config.server.api.warranty.get.url; break;
        }
        let request = new XMLHttpRequest();
        if (requestUrl != "") {
            request.open("GET", requestUrl + `?userId=${account.id}`);
            request.onload = () => {
                if (request.status == 200) {
                    let data;
                    switch (account.role) {
                        case "Distributor":
                            data = JSON.parse(request.response).content.distributor;
                            break;
                        case "Manufacture":
                            data = JSON.parse(request.response).content.factory;
                            break;
                        case "Warranty":
                            data = JSON.parse(request.response).content.warranty;
                            break;
                    }
                    setUserData(data);
                }
            }
            request.send();
        }
    }, []);

    const [modalIsOpen, setIsOpen] = useState(false);
    const [modelMessage, setModelMessage] = useState("");
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const [message, setMessage] = useState({
        name: null,
        user: null,
        pass: null,
        passAgain: null,
        email: null,
        typeAcount: null,
        avatar: null,
    });

    // Thẩm định cuối
    function validationForm(event) {
        const result = {};
        result.name = nameValidation(userData.name);
        result.user = userValidation(userData.user.username);
        // result.avatar = avatartValidation(avatar);

        setMessage(result);

        // event.preventDefault();
        if (
            !(
                result.name.validation &&
                result.user.validation
            )
        ) {
            event.preventDefault();
        } else {
            props.handleAcount("show")
        }
    }

    /**
     * Gửi request update đến server
     */
    function submitForm() {
        let requestUrl = "";
        switch (account.role) {
            case "Distributor": requestUrl = config.server.api.distributor.update.url; break;
            case "Manufacture": requestUrl = config.server.api.factory.update.url; break;
            case "Warranty": requestUrl = config.server.api.warranty.update.url; break;
        }
        if (requestUrl != "") {
            let request = new XMLHttpRequest();
            request.setRequestHeader("Content-type", "application/json");
            request.open("POST", config.server.api.account.update);
            request.onload = function () {
                if (this.status == 200) {
                    let request2 = new XMLHttpRequest();
                    request2.setRequestHeader("Content-type", "application/json");
                    request2.open("POST", requestUrl);
                    request2.onload = function() {
                        if (request2.status == 200) {
                            /**TODO: UI notify */
                        }
                    }
                    request2.send(JSON.stringify(userData));
                }
            }
            let accountData = account;
            accountData.username = username;
            request.send(JSON.stringify(accountData));
        }
    }

    return (
        <div className="acount-container-edit">
            <h2 className="title">Chỉnh sửa tài khoản</h2>
            <form action="" method="post">
                <div className="name">
                    <div className="action">
                        <label htmlFor="name">Tên tài khoản</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Trần Đình Cường"
                            value={userData.user.username}
                            onChange={(e) => setUserData(
                                {
                                    ...userData, 
                                    user : {
                                        ...userData.user,
                                        username: e.target.value
                                    }
                                }
                            )}
                        />
                    </div>
                    <div className="alert">
                        {message.name && !message.name.validation && (
                            <p>{message.name.message}</p>
                        )}
                    </div>
                </div>
                <div className="user">
                    <div className="action">
                        <label htmlFor="user">Tên {typeAccounts[account.role].toLowerCase()}</label>
                        <input
                            type="text"
                            name="user"
                            id="user"
                            value={userData.name}
                            onChange={(e) => setUserData(
                                {
                                    ...userData,
                                    name: e.target.value
                                }
                            )}
                        />
                    </div>
                    <div className="alert">
                        {message.user && !message.user.validation && (
                            <p>{message.user.message}</p>
                        )}
                    </div>
                </div>
                <div className="phoneNumber">
                    <div className="action">
                        <label htmlFor="phoneNumber">Số điện thoại</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="Nhập số điện thoại"
                            value={userData.phoneNumber}
                            onChange={(e) => setPhoneNumber(
                                {
                                    ...userData,
                                    phoneNumber: e.value.target
                                }
                            )}
                        />
                    </div>
                    <div className="alert">
                        {message.email && !message.email.validation && (
                            <p>{message.email.message}</p>
                        )}
                    </div>
                </div>
                <div className="address">
                    <div className="action">
                        <label htmlFor="address">Địa chỉ</label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Nhập địa chỉ"
                            value={userData.address}
                            onChange={(e) => setAddress(
                                {
                                    ...userData,
                                    address: e.target.value
                                }
                            )}
                        />
                    </div>
                    <div className="alert">
                        {message.email && !message.email.validation && (
                            <p>{message.email.message}</p>
                        )}
                    </div>
                </div>
                <div className="type-acount">
                    <div className="action">
                        <p>Loại tài khoản</p>
                        <p>{typeAccounts[userData.user.role]}</p>
                    </div>
                    <div className="alert">
                        {message.typeAcount && !message.typeAcount.validation && (
                            <p>{message.typeAcount.message}</p>
                        )}
                    </div>
                </div>
                <div className="button-summit">
                    <button type="submit" onClick={(e) => validationForm(e)}>
                        Sửa tài khoản
                    </button>
                </div>
            </form>
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <p>{modelMessage}</p>
            </ReactModal>
        </div>
    );
}
