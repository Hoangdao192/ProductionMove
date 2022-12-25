import style from './ShowUnit.module.scss'
import { typeAccounts } from '../AccountManager/AcountItems'
import { useState } from 'react'
import config from '../../../config.json'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useReducer } from 'react';

export default function ShowUnit () {

    const [factories, setFactories] = useState([]);
    const [distributors, setDistributors] = useState([]);
    const [warrantyCenters, setwarrantyCenters] = useState([]);
    const [unitType, setUnitType] = useState('Manufacture');
    const [ignore, forceUpdate] = useReducer(x => x + 1, 0);

    function onUnitTypeSelect(e) {
        setUnitType(e.target.value)
        // setFactories([])
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
            method: 'GET'
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            } else setFactories([])
        }).then((data) => {
            console.log(data)
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
                body: formData
            }).then((response) => {
                if (response.status == 200) {
                    forceUpdate();
                }
                return response.text();
            }).then((response) => {
                console.log(response)
            })
        }
    }

    useEffect(() => {

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
            method: 'GET'
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            } else setFactories([])
        }).then((data) => {
            console.log(data)
            if (data != undefined) setFactories(data)
        })
    },[ignore])

    let Thead = () => {
        return (
            <thead>
                <tr>
                    <th>STT</th>
                    <th>ID</th>
                    <th>Tên {typeAccounts[unitType]}</th>
                    <th>Địa chỉ</th>
                    <th>Số điện thoại</th>
                    <th>Hành động</th>
                </tr>
            </thead>
        )
    }

    let Tbody = () => {
        return (
            <tbody>
                {
                    factories.map((factory, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{factory.id}</td>
                                <td>{factory.name}</td>
                                <td>{factory.address}</td>
                                <td>{factory.phoneNumber}</td>
                                <td>
                                    <Link to="/manager/unit/edit" state={{unit: {...factory, type: unitType}}}>
                                        <button className={style.editButton}>Sửa</button>
                                    </Link>
                                    <button className={style.deleteButton} onClick={(e) => {
                                        deleteUnit(factory)
                                    }}>Xóa</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        )
    }

    let Table = () => {
        return (<table className={style.table}>
                    <Thead/>
                    <Tbody/>
                </table>)}

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
            <Table/>
        </div>
    )
}