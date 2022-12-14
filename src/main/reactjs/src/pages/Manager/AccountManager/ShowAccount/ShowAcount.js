import style from "./ShowAcount.module.scss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { acounts, typeAccounts } from "../AcountItems.js";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import userAvatar from "./user.jpg";
import config from "../../../../config.json";

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
            <div className={(!edit.edit && !create) ? style.category : style.hiddenPage}>
                <div className={style.search}>
                    <div className={style.searchName}>
                        <input
                            type="text"
                            name="search-name"
                            id={style.searchName}
                            placeholder="Tìm kiếm tên tài khoản"
                            onChange={(e) => handleSearch(e)}
                        />
                    </div>
                    <div className={style.typeAcountSearch}>
                        <label htmlFor="type-acount">Loại tài khoản</label>
                        <select name="type-acount" id={style.typeAccount}>
                            <option value="">Không chọn</option>
                            {typeAccounts.map((item, index) => {
                                return (
                                    <option value={item.key} key={index}>
                                        {item.value}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className={style.btnSearch}>
                        <button onClick={hadleClickSearch}>Tìm kiếm</button>
                    </div>
                </div>

                <ul className={style.listAccount}>
                    <li className={style.tbHeadAccount}>
                        <div className={style.col1} onClick={sortByName}>
                            STT
                        </div>
                        <div className={`${style.col2} ${style.pointer}`} onClick={sortByName}>
                            Tên tài khoản {sorted.sorted === "name" ? renderArrow() : null}
                        </div>
                        <div className={`${style.col5} ${style.pointer}`} onClick={sortByTypeAcount}>
                            Loại tài khoản{" "}
                            {sorted.sorted === "type-acount" ? renderArrow() : null}
                        </div>
                        <div className={style.col6}>Hành động</div>
                    </li>
                    {
                        users.map((item, index) => {
                            return (
                                <li className={style.tbRowAccount} key={index}>
                                    <div className={style.col1} data-label="ID">
                                        {index}
                                    </div>
                                    <div className={style.col2} data-label="Tên tài khoản">
                                        {item.username}
                                    </div>
                                    <div className={style.col5} data-label="Loại tài khoản">
                                        {typeAccounts[item.role]}
                                    </div>
                                    <div className={style.col6} data-label="Hành động">
                                        <Link to="/manager/account/edit" state={{account: item}}>
                                            <MdEdit
                                                className={style.edit}
                                                title="Chỉnh sửa"
                                            />
                                        </Link>
                                        <MdDelete className={style.delete} title="Xóa" />
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
            {/* <div className={edit.edit ? style.edit : style.hiddenPage}>
                <EditAcount handleAcount={handleAcount} edit={edit} />
            </div> */}
        </>
    );
}

export default ShowAcount
