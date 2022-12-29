import style from './ShowUnit.module.scss'
import { typeAccounts } from '../AccountManager/AcountItems'
import { useState } from 'react'
import config from '../../../config.json'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useReducer } from 'react';

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import Authentication from '../../../services/Authentication/Authentication';
import { toast } from 'react-toastify';

export default function ShowUnit () {

    const [factories, setFactories] = useState([]);
    const [unitType, setUnitType] = useState('Manufacture');
    const [ignore, forceUpdate] = useReducer(x => x + 1, 0);

    function onUnitTypeSelect(e) {
        setUnitType(e.target.value)
        loadData(e.target.value)
    }

    function loadData(unitType) {
        let url = "";

        switch(unitType) {
            case 'Manufacture': 
                url = config.server.api.factory.list.url; 
                break;
            case 'Distributor':
                url = config.server.api.distributor.list.url;
                break;
            case 'Warranty':
                url = config.server.api.warranty.list.url;
                break;
        }

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {
                toast.info("Không thể tải thông tin.")
                setFactories([])
            }
        }).then((data) => {
            if (data != undefined) setFactories(data)
        })
    }

    function deleteUnit(unit) {
        let url = "";

        let formData = new FormData();
        switch(unitType) {
            case 'Manufacture': 
                url = config.server.api.factory.delete.url; 
                formData.append('factoryId', unit.id);
                break;
            case 'Distributor':
                url = config.server.api.distributor.delete.url;
                formData.append('distributorId', unit.id);
                break;
            case 'Warranty':
                url = config.server.api.warranty.delete.url;
                formData.append('warrantyCenterId', unit.id);
                break;
        }

        if (url !== "") {

            fetch(url, {
                method: "DELETE",
                headers: {
                    'Authorization': Authentication.generateAuthorizationHeader()
                },
                body: formData
            }).then((response) => {
                if (response.status == 200) {
                    toast.success("Xóa đơn vị thành công.");
                    forceUpdate();
                } else {
                    toast.error("Xóa đơn vị không thành công.");
                }
            })
        }
    }

    useEffect(() => {
        loadData(unitType)
    },[ignore])

    return (
        <div className={style.showUnit}>
            <p className={style.title}>
                Danh sách các {typeAccounts[unitType]}
            </p>
            <select name="unitTypeSelect" id={style.unitTypeSelect}
                value={unitType}
                onChange={(e) => onUnitTypeSelect(e)}>
                {
                    typeAccounts.map((item, index) => {
                        return (
                            item.key !== 'Admin' ? <option value={item.key}>{item.value}</option> : <></>
                        )
                    })
                }
            </select>

            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">STT</TableCell>
                        <TableCell align="center">{`Mã ${typeAccounts[unitType].toLowerCase()}`}</TableCell>
                        <TableCell align="center">{`Tên ${typeAccounts[unitType].toLowerCase()}`}</TableCell>
                        <TableCell align="center">Địa chỉ</TableCell>
                        <TableCell align="center">Số điện thoại</TableCell>
                        <TableCell align="center">Tùy chọn</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {factories.map((unit, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="center">{index}</TableCell>
                            <TableCell align="center">{unit.id}</TableCell>
                            <TableCell align="center">{unit.name}</TableCell>
                            <TableCell align="center">{unit.address}</TableCell>
                            <TableCell align="center">{unit.phoneNumber}</TableCell>
                            <TableCell align="center">
                                <div className={style.action}>
                                    <Link to="/manager/unit/edit" state={{unit: {...unit, type: unitType}}}>
                                        <button className={style.editButton}>Sửa</button>
                                    </Link>
                                    <button className={style.deleteButton} onClick={(e) => {
                                        deleteUnit(unit)
                                    }}>Xóa</button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}