import { useEffect, useReducer, useState } from 'react'
import style from './StockExport.module.scss'
import config from '../../../config.json';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

export default function StockExport() {
    const [distributors, setDistributor] = useState([]);
    const [reducer, forceUpdate] = useReducer(x => x + 1, 0);

    const [exportDistributor, setExportDistributor] = useState()
    const [exportBatches, setExportBatches] = useState([])

    const [batches, setBatches] = useState([])
    const [selectedBatches, setSelectedBatches] = useState(new Map());

    function validation() {
        if (exportDistributor == -1) {
            alert("ERROR");
            return false;
        }
        if (exportBatches.length == 0) {
            alert("ERROR");
            return false;
        }
        return true;
    }

    function sendExportRequest() {
        if (validation()) {
            let url = config.server.api.factory.stock.export.url;
            console.log(exportBatches.map((batch) => {return batch.id}))
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    factoryId: 35,
                    distributorId: exportDistributor,
                    exportBatchIds: exportBatches.map((batch) => {return batch.id})
                })
            })
        }
    }

    function loadDistributors() {
        let url = config.server.api.distributor.list.url;
        fetch(url)
        .then((response) => {
            if (response.status == 200) {
                return response.json()
            }
        }).then((data) => {
            if (data != undefined) {
                setDistributor(data)
            }
        })
    }

    function loadBatches() {
        let url = config.server.api.factory.stock.batch.list.url;
        fetch(`${url}?factoryId=35`)
        .then((response) => {
            if (response.status == 200) {
                return response.json();
            }
        }).then((data) => {
            if (data != undefined) setBatches(data)
        })
    }

    function selectBatch(batch) {
        if (!selectedBatches.has(batch.id)) {
            let newSelectedBatches = new Map();
            selectedBatches.forEach((value, key) => {
                newSelectedBatches.set(key, value);
            })

            newSelectedBatches.set(batch.id, batch)
            setSelectedBatches(newSelectedBatches)
            setExportBatches([...exportBatches, batch]);
        }
    }

    function unSelectBatch(deleteBatch) {
        let newSelectedBatches = new Map();
        selectedBatches.forEach((value, key) => {
            newSelectedBatches.set(key, value);
        })
        newSelectedBatches.delete(deleteBatch.id)
        setSelectedBatches(newSelectedBatches)

        let newExportBatches = [];
        exportBatches.forEach((batch) => {
            if (batch.id != deleteBatch.id) {
                newExportBatches.push(batch);
            }
        })
        setExportBatches(newExportBatches)
    }

    useEffect(() => {
        loadDistributors();
        loadBatches();
    }, [reducer])
    
    function formatDate(date) {
        let [year, month, day] = date.split("-")
        return day + " - " + month + " - " + year;
    }

    return (
        <div className={style.container}>
            <p className={style.title}>
                Xuất kho
            </p>

            <button onClick={(e) => sendExportRequest()} className={style.exportButton}>Xuất hàng</button>

            <label htmlFor="" className={style.label}>
                Đại lý nhận hàng
            </label>
            <select value={exportDistributor} className={style.select} name="" id=""
                onChange={(e) => setExportDistributor(parseInt(e.target.value))}>
                <option value={-1} key={-1}>
                    - Chưa chọn -
                </option>
                {
                    distributors.map((distributor, index) => {
                        return (
                            <option value={distributor.id} key={index}>
                                {distributor.name}
                            </option>
                        )
                    })
                }
            </select>
            <label htmlFor="" className={style.label + " " + style.exportLabel}>
                Danh sách lô hàng sẽ xuất đi
            </label>
            <div>
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
                        {exportBatches.length > 0 ? exportBatches.map((productBatch, index) => (
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
                                        <button onClick={(e) => unSelectBatch(productBatch)}>
                                            Xóa
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )) : <TableRow><TableCell align="center" colSpan={7}>Chưa có lô hàng nào</TableCell></TableRow>
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <label htmlFor="" className={style.label + " " + style.exportLabel}>
                Danh sách lô hàng trong kho
            </label>
            <div>
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
                        {batches.length > 0 ? batches.map((productBatch, index) => (
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
                                        <button className={style.button} disabled={selectedBatches.has(productBatch.id) ? true : false}  
                                            onClick={(e) => selectBatch(productBatch)}>
                                            Chọn
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )) : <TableRow><TableCell align="center" colSpan={7}>Chưa có lô hàng nào</TableCell></TableRow>
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}