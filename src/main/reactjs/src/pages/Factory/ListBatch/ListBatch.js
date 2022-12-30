import style from './ListBatch.module.scss'
import {
    Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, 
    Box, Tab, Tabs, TabPanel, Typography} from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import config from '../../../config.json'
import { useReducer } from 'react';
import { red } from '@nextui-org/react';
import Authentication from '../../../services/Authentication/Authentication';
import { display } from '@mui/system';
import { toast } from 'react-toastify';

export default function ListBatch() {
    const [productBatchs, setProductBatchs] = useState([])
    const [notImportBatchs, setNotImportBatchs] = useState([])
    const [reducer, forceUpdate] = useReducer(x => x + 1, 0);
    const [page, setPage] = useState(0);
    const [instockBatches, setInStockBatches] = useState([]);

    const [factory, setFactory] = useState();
    const user = Authentication.getCurrentUser();

    function loadFactory() {
        return new Promise((resolve, reject) => {
            let url = config.server.api.factory.get.url + "?unitId=" + user.unit.id;
            fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': Authentication.generateAuthorizationHeader()
                }
            }).then((response) => {
                if (response.status == 200) {
                    return response.json()
                } else {
                    toast.error("Không thể tải dữ liệu");
                }
            }).then((factory) => {
                if (factory != undefined) {
                    resolve(factory);
                }
            })
        })
    }

    function resetComponent() {
        setProductBatchs([])
        setNotImportBatchs([])
        forceUpdate()
    }

    function loadInStockBatch(factoryId) {
        let url = config.server.api.factory.stock.batch.list.url;
        fetch(`${url}?factoryId=${factoryId}`, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        })
        .then((response) => {
            if (response.status == 200) {
                return response.json();
            } else {
                toast.error("Không thể tải dữ liệu");
            }
        }).then((data) => {
            if (data != undefined) setInStockBatches(data)
        })
    }

    function loadProductBatch(factoryId) {
        let url = config.server.api.productBatch.list.url;
        fetch(`${url}?factoryId=${factoryId}`, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        })
        .then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {
                toast.error("Không thể tải dữ liệu");
            }
        }).then((data) => {
            if (data != undefined) setProductBatchs(data)
        })
    }

    function loadNotImportedBatch(factoryId) {
        let url = config.server.api.factory.stock.batch.notImport.url;
        fetch(`${url}?factoryId=${factoryId}`, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        })
        .then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {
                toast.error("Không thể tải dữ liệu");
            }
        }).then((data) => {
            if (data != undefined) setNotImportBatchs(data)
        })
    }

    function importBatch(productBatch) {
        let url = config.server.api.productBatch.import.url;
        let formData = new FormData()
        formData.append("factoryId", productBatch.factory.id);
        formData.append("batchId", productBatch.id);
        fetch(url, {
            method: "POST",
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            },
            body: formData
        }).then((response) => {
            if (response.status == 200) {
                toast.success("Nhập kho thành công.")
                forceUpdate()
            } else {
                toast.error("Nhập kho không thành công");
            }
        })
    }

    useEffect(() => {
        loadFactory()
            .then((factory) => {
                console.log(factory);
                setFactory(factory);
                loadProductBatch(factory.id)
                loadNotImportedBatch(factory.id)
                loadInStockBatch(factory.id)
            })
    }, [reducer])

    function formatDate(date) {
        let [year, month, day] = date.split("-")
        return day + " - " + month + " - " + year;
    }

    function TabLayout() {
        return (
            <div>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs sx={{color: 'black', '& button': {color: 'black'}}} 
                        onChange={(e, value) => setPage(parseInt(value))} 
                        value={page.toString()} aria-label="basic tabs example">
                        <Tab label="Chưa nhập kho" value="0"/>
                        <Tab label="Đã sản xuất" value="1"/>
                    </Tabs>
                </Box>
                <div style={{
                    display: 'none'
                }} value="0" index={0}>
                    Item One
                </div>
                <div style={{
                    display: 'none'
                }} value="1" index={1}>
                    Item Two
                </div>
            </div>
        )
    }

    function InStockBatchTable() {
        return (
            <>
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
                            {instockBatches.length > 0 ? instockBatches.map((productBatch, index) => (
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
                            )) : <TableCell align="center" colSpan={6}>Không có lô hàng nào</TableCell>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </>
        )
    }

    function NotImportBatchTable() {
        return (
            <>
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
                                <TableCell align="center">Tùy chọn</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {notImportBatchs.length > 0 ? notImportBatchs.map((productBatch, index) => (
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
                                            <button onClick={(e) => importBatch(productBatch)}
                                                className={style.button}>Nhập kho</button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )) : <TableCell align="center" colSpan={7}>Không có lô hàng nào</TableCell>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </>
        )
    }

    function ProducedBatchTable() {
        return (
            <>
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
                            {productBatchs.length > 0 ? productBatchs.map((productBatch, index) => (
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
                            )) : <TableCell align="center" colSpan={6}>Không có lô hàng nào</TableCell>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </>
        )
    }

    return (
        <div className={style.container}>
            <p className={style.title}>
                Quản lý lô hàng
            </p>
            <TabLayout/>
            {
                page == 0 ? <NotImportBatchTable/> :
                page == 1 ? <ProducedBatchTable/> : <></>
            }
        </div>
    )
}