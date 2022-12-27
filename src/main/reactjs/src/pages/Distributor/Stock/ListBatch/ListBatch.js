import style from './ListBatch.module.scss'
import {
    Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, 
    Box, Tab, Tabs, TabPanel, Typography} from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import config from '../../../../config.json'
import { useReducer } from 'react';
import { red } from '@nextui-org/react';
import Authentication from '../../../../services/Authentication/Authentication';
import { display } from '@mui/system';
import { Link } from 'react-router-dom';

export default function ListBatch() {
    const [productBatchs, setProductBatchs] = useState([])
    const [notImportBatchs, setNotImportBatchs] = useState([])
    const [reducer, forceUpdate] = useReducer(x => x + 1, 0);
    const [page, setPage] = useState(0);
    const [instockBatches, setInStockBatches] = useState([]);

    const [distributor, setDistributor] = useState();
    const user = Authentication.getCurrentUser();

    function loadDistributor() {
        return new Promise((resolve, reject) => {
            let url = config.server.api.distributor.get.url + "?unitId=" + user.unit.id;
            fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': Authentication.generateAuthorizationHeader()
                }
            }).then((response) => {
                if (response.status == 200) {
                    return response.json()
                }
            }).then((distributor) => {
                if (distributor != undefined) {
                    resolve(distributor);
                }
            })
        })
    }

    function resetComponent() {
        setProductBatchs([])
        setNotImportBatchs([])
        forceUpdate()
    }

    function loadInStockBatch(distributorId) {
        let url = config.server.api.distributor.stock.list.url;
        fetch(`${url}?distributorId=${distributorId}`, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        })
        .then((response) => {
            if (response.status == 200) {
                return response.json();
            }
        }).then((data) => {
            if (data != undefined) setInStockBatches(data)
        })
    }

    useEffect(() => {
        loadDistributor()
            .then((distributor) => {
                console.log(distributor);
                setDistributor(distributor);
                loadInStockBatch(distributor.id)
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
                        <Tab label="Trong kho" value="0"/>
                        <Tab label="Chưa nhập kho" value="1"/>
                        <Tab label="Đã sản xuất" value="2"/>
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
                <div style={{
                    display: 'none'
                }} value="2" index={2}>
                    Item Three
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
                                <TableCell align="center">Tùy chọn</TableCell>
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
                                    <TableCell align="center">
                                        <div className={style.action}>
                                            <Link to='/distributor/warehouse/show_batch' state={{productBatch: productBatch}}>
                                                <button className={style.button}>Xem chi tiết</button>
                                            </Link>
                                        </div>
                                    </TableCell>
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
                page == 0 ? <InStockBatchTable/> : <></>
            }
        </div>
    )
}