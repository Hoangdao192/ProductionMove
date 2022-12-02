import "./ShowAcount.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { acounts, typeAccounts } from "../AcountItems.js";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import userAvatar from "./user.jpg";

import EditAcount from "../Edit/EditAcount";

function ShowAcount() {

    const [users, setUsers] = useState([]);
    const [sorted, setSorted] = useState({ sorted: "", reversed: false });
    const [edit, setEdit] = useState({
        edit: false,
        acountId: null
    })
    const [create, setCreate] = useState(false)

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
    }, []);
    

    // Xắp xếp theo tên
    function sortByName() {
        setSorted({ sorted: "name", reversed: !sorted.reversed });

        let productCopy = [...users];
        productCopy.sort(function sortData(a, b) {
            console.log(a.user.localeCompare(b.user));
            if (sorted.reversed) {
                return -a.user.localeCompare(b.user);
            }
            return a.user.localeCompare(b.user);
        });

        setUsers(productCopy);
    }

    // Xắp xếp theo loại tài khoản
    function sortByTypeAcount() {
        setSorted({ sorted: "type-acount", reversed: !sorted.reversed });

        let productCopy = [...users];
        productCopy.sort(function sortData(a, b) {
            console.log(a.typeAcount - b.typeAcount);
            if (sorted.reversed) {
                return -(a.typeAcount - b.typeAcount);
            }
            return a.typeAcount - b.typeAcount;
        });

        setUsers(productCopy);
    }

    // In mũi tên
    function renderArrow() {
        if (sorted.reversed) {
            return <FaArrowUp />;
        } else {
            return <FaArrowDown />;
        }
    }

    // Tìm kiếm theo tên
    function handleSearch(e) {
        setSorted({ sorted: "", reversed: false });

        let value = e.target.value;

        let searchResult = users.filter((item) => {
            return item.user.toLowerCase().includes(value.toLowerCase());
        });

        console.log(searchResult);
        setUsers(searchResult);
    }

    // Tìm kiếm theo loại tài khoản
    function searchByTypeAcount(arr) {
        let typeAcountBar = document.querySelector("#type-acount");
        let value = parseInt(typeAcountBar.value);
        console.log("type-acount " + value);
        if (!isNaN(value)) {
            let result = arr.filter((item) => {
                console.log(item.typeAcount);
                return item.typeAcount === value;
            });
            console.log(result);
            return result;
        } else {
            return arr;
        }
    }

    // Xử lý tìm kiếm chung (nút tìm kiếm)
    function hadleClickSearch() {
        let result = [...users];
        result = searchByTypeAcount(result);
        setUsers(result);
    }

    // Sửa tài khoản
    function handleAcount(page, acountId) {
        if (page === 'show') {
            setEdit({
                edit: false,
                acountId: null
            })
            setCreate(false)
        } else if (page === 'edit') {
            setEdit({
                edit: true,
                acountId: acountId
            })
        } else if (page === 'create') {
            setCreate(true)
        }
    }

    console.log(users)
    return (
        <>
            <div className={(!edit.edit && !create) ? "category" : "hiddenPage"}>
                <div className="search">
                    <div className="search-name">
                        <input
                            type="text"
                            name="search-name"
                            id="search-name"
                            placeholder="Tìm kiếm tên tài khoản"
                            onChange={(e) => handleSearch(e)}
                        />
                    </div>
                    <div className="type-acount-search">
                        <label htmlFor="type-acount">Loại tài khoản</label>
                        <select name="type-acount" id="type-acount">
                            <option value="">Không chọn</option>
                            {typeAccounts.map((item, index) => {
                                return (
                                    <option value={index} key={index}>
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="btn-search">
                        <button onClick={hadleClickSearch}>Tìm kiếm</button>
                    </div>
                </div>

                <ul className="list_product">
                    <li className="tb-head-acount">
                        <div className="col-1" onClick={sortByName}>
                            STT
                        </div>
                        <div className="col-2 pointer" onClick={sortByName}>
                            Tên tài khoản {sorted.sorted === "name" ? renderArrow() : null}
                        </div>
                        <div className="col-3 pointer">
                            Tên người dùng
                        </div>
                        <div className="col-4 pointer">
                            Địa chỉ
                        </div>
                        <div className="col-5 pointer" onClick={sortByTypeAcount}>
                            Loại tài khoản{" "}
                            {sorted.sorted === "type-acount" ? renderArrow() : null}
                        </div>
                        <div className="col-6">Hành động</div>
                    </li>
                    {
                        users.map((item, index) => {
                            return (
                                <li className="tb-row-acount" key={index}>
                                    <div className="col-1" data-label="ID">
                                        {index}
                                    </div>
                                    <div className="col-2" data-label="Tên tài khoản">
                                        {item.username}
                                    </div>
                                    <div className="col-3" data-label="Tên người dùng">
                                        {item.name}
                                    </div>
                                    <div className="col-4" data-label="Địa chỉ">
                                        {item.address}
                                    </div>
                                    <div className="col-5" data-label="Loại tài khoản">
                                        {item.role}
                                    </div>
                                    <div className="col-6" data-label="Hành động">
                                        <MdEdit
                                            className="edit"
                                            title="Chỉnh sửa"
                                            onClick={() => handleAcount('edit', item.id)}
                                        />
                                        <MdDelete className="delete" title="Xóa" />
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
            <div className={edit.edit ? "edit" : "hiddenPage"}>
                <EditAcount handleAcount={handleAcount} edit={edit} />
            </div>
        </>
    );
}

export default ShowAcount
