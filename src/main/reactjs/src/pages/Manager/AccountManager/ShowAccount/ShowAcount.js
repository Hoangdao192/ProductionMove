import style from "./ShowAcount.module.scss";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { acounts, typeAccounts } from "../AcountItems.js";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import userAvatar from "./user.jpg";
import config from "../../../../config.json";

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

import EditAcount from "../Edit/EditAcount";
import { useReducer } from "react";
import Authentication from "../../../../services/Authentication/Authentication";

function ShowAcount() {
    const [users, setUsers] = useState([]);
    const [reset, setRest] = useState([]);
    const [ignore, forceUpdate] = useReducer(x => x + 1, 0)
    const navigate = useNavigate()

    useEffect(() => {
        let request = new XMLHttpRequest();
        request.open("GET", "http://localhost:5000/api/account/list");
        request.setRequestHeader('Authorization', Authentication.generateAuthorizationHeader());
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
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            },
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

            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">STT</TableCell>
                        <TableCell align="center">Mã tài khoản</TableCell>
                        <TableCell align="center">Tên tài khoản</TableCell>
                        <TableCell align="center">Loại tài khoản</TableCell>
                        <TableCell align="center">Tùy chọn</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {users.map((user, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="center">{index}</TableCell>
                            <TableCell align="center">{user.id}</TableCell>
                            <TableCell align="center">{user.username}</TableCell>
                            <TableCell align="center">{typeAccounts[user.role == 'Warranty center' ? "Warranty" : user.role]}</TableCell>
                            <TableCell align="center">
                                <div className={style.action}>
                                    <Link to="/manager/account/edit" state={{user: user}}>
                                        <button className={style.editButton}>Sửa</button>
                                    </Link>
                                    <button className={style.deleteButton} onClick={(e) => deleteAccount(user.id)}>Xóa</button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ShowAcount
