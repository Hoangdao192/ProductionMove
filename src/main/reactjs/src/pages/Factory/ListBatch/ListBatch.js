import style from './ListBatch.module.scss'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import config from '../../../config.json'
import { useReducer } from 'react';
import { red } from '@nextui-org/react';

export default function ListBatch() {
    const [productBatchs, setProductBatchs] = useState([])
    const [notImportBatchs, setNotImportBatchs] = useState([])
    const [reducer, forceUpdate] = useReducer(x => x + 1, 0);

    function resetComponent() {
        setProductBatchs([])
        setNotImportBatchs([])
        forceUpdate()
    }

    function loadProductBatch() {
        let url = config.server.api.productBatch.list.url;
        fetch(`${url}?factoryId=35`)
        .then((response) => {
            if (response.status == 200) {
                return response.json()
            }
        }).then((data) => {
            if (data != undefined) setProductBatchs(data)
            console.log(data)
        })
    }

    function loadNotImportedBatch() {
        let url = config.server.api.productBatch.list.notImport.url;
        fetch(`${url}?factoryId=35`)
        .then((response) => {
            if (response.status == 200) {
                return response.json()
            }
        }).then((data) => {
            if (data != undefined) setNotImportBatchs(data)
            console.log(data)
        })
    }

    function importBatch(productBatch) {
        let url = config.server.api.productBatch.import.url;
        let formData = new FormData()
        formData.append("factoryId", productBatch.factory.id);
        formData.append("batchId", productBatch.id);
        fetch(url, {
            method: "POST",
            body: formData
        }).then((response) => {
            if (response.status == 200) {
                alert("OK")
                forceUpdate()
            } else response.text();
        }).then((data) => {
            if (data != undefined) alert(data)
        })
    }

    useEffect(() => {
        loadProductBatch()
        loadNotImportedBatch()
    }, [reducer])

    function formatDate(date) {
        let [year, month, day] = date.split("-")
        return day + " - " + month + " - " + year;
    }

    return (
        <div className={style.container}>
            <p className={style.title}>
                Quản lý lô hàng
            </p>
            <p className={style.secondTitle}>
                Lô sản phẩm chưa nhập kho
            </p>
            <div className={style.notImportBatchTable}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">STT</TableCell>
                            <TableCell align="center">Mã lô hàng</TableCell>
                            <TableCell align="center">Mã dòng sản phẩm</TableCell>
                            <TableCell align="center">Tên dòng sản phẩm</TableCell>
                            <TableCell align="center">Ngày sản xuất</TableCell>
                            <TableCell align="center">Số lượng sản phẩm</TableCell>
                            <TableCell align="center">Tùy chọn</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {notImportBatchs.map((productBatch, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="center">{index}</TableCell>
                                <TableCell align="center">{productBatch.id}</TableCell>
                                <TableCell align="center">{productBatch.productLine.id}</TableCell>
                                <TableCell align="center">{productBatch.productLine.productName}</TableCell>
                                <TableCell align="center">{formatDate(productBatch.manufacturingDate)}</TableCell>
                                <TableCell align="center">{productBatch.productQuantity}</TableCell>
                                <TableCell align="center">
                                    <div className={style.action}>
                                        <button onClick={(e) => importBatch(productBatch)} className={style.button}>
                                            Nhập kho
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            
            <p className={style.secondTitle}>
                Lô sản phẩm đã sản xuất
            </p>
            <div className={style.batchTable}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">STT</TableCell>
                            <TableCell align="center">Mã lô hàng</TableCell>
                            <TableCell align="center">Mã dòng sản phẩm</TableCell>
                            <TableCell align="center">Tên dòng sản phẩm</TableCell>
                            <TableCell align="center">Ngày sản xuất</TableCell>
                            <TableCell align="center">Số lượng sản phẩm</TableCell>
                            {/* <TableCell align="center">Tùy chọn</TableCell> */}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {productBatchs.map((productBatch, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="center">{index}</TableCell>
                                <TableCell align="center">{productBatch.id}</TableCell>
                                <TableCell align="center">{productBatch.productLine.id}</TableCell>
                                <TableCell align="center">{productBatch.productLine.productName}</TableCell>
                                <TableCell align="center">{formatDate(productBatch.manufacturingDate)}</TableCell>
                                <TableCell align="center">{productBatch.productQuantity}</TableCell>
                                {/* <TableCell align="center">
                                    <div className={style.action}>
                                        <button className={style.button}>Sửa</button>
                                        <button 
                                            className={style.button}>Xóa</button>
                                    </div>
                                </TableCell> */}
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            
        </div>
    )
}