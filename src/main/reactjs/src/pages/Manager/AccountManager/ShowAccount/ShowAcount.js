import style from "./ShowAcount.module.scss";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { acounts, typeAccounts } from "../AcountItems.js";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import userAvatar from "./user.jpg";
import config from "../../../../config.json";

import EditAcount from "../Edit/EditAcount";
import { useReducer } from "react";

function ShowAcount() {
    const [users, setUsers] = useState([]);
    const [reset, setRest] = useState([]);
    const [ignore, forceUpdate] = useReducer(x => x + 1, 0)
    const navigate = useNavigate()

    useEffect(() => {
        let request = new XMLHttpRequest();
        request.open("GET", "http://localhost:5000/api/account/list");
        request.onload = () => {
            if (request.status == 200) {
                console.log(JSON.parse(request.response));
                setUsers(JSON.parse(request.response).content.users);
            }
        }
        request.send();
    }, [ignore]);

    function deleteAccount(userId) {
        let formData = new FormData();
        formData.append('userId', userId)
        fetch(config.server.api.account.delete.url, {
            method: 'POST',
            body: formData
        }).then((response) => {
            if (response.status == 200) {
                console.log("OKKKK")
                forceUpdate();
                setRest("")
                navigate("/manager/account/list")
            }
        })
    }
    
    return (
        <div className={style.showAccount}>
            <p className={style.title}>
                Danh sách tài khoản
            </p>
            <table className={style.table}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>ID</th>
                        <th>Tên tài khoản</th>
                        <th>Loại tài khoản</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                {
                    users.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{typeAccounts[user.role]}</td>
                                <td>
                                    <Link to="/manager/account/edit" state={{user: user}}>
                                        <button className={style.editButton}>Sửa</button>
                                    </Link>
                                    <button className={style.deleteButton} onClick={(e) => deleteAccount(user.id)}>Xóa</button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

export default ShowAcount
