import style from './ListProduct.module.scss';
import Authentication from '../../../../services/Authentication/Authentication';
import config from '../../../../config.json';
import {
    Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, 
    Box, Tab, Tabs, TabPanel, Typography} from '@mui/material';
import { useReducer } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import productStatus from '../../../Data/ProductStatus';

export default function ListProduct() {
    const [reducer, forceUpdate] = useReducer(x => x + 1, 0);
    const [page, setPage] = useState(0);
    
    const [inStockProducts, setInStockProducs] = useState([]);
    const [soldProducts, setSoldProducts] = useState([]);

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

    function loadInStockProduct(distributorId) {
        let url = config.server.api.distributor.stock.product.list.url + "?distributorId=" + distributorId;
        fetch(url, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json();
            }
        }).then((data) => {
            if (data != undefined) {
                console.log(data)
                setInStockProducs(data);
            }
        })
    }

    function loadSoldProduct(distributorId) {
        let url = config.server.api.distributor.sold.list.url + "?distributorId=" + distributorId;
        fetch(url, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json();
            }
        }).then((data) => {
            if (data != undefined) {
                console.log(data)
                setSoldProducts(data);
            }
        })
    }
    
    useEffect(() => {
        loadDistributor().then((distributor) => {
            loadInStockProduct(distributor.id)
            loadSoldProduct(distributor.id)
        });
    }, [])

    function resetComponent() {
        // setProductBatchs([])
        // setNotImportBatchs([])
        // forceUpdate()
    }

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
                        <Tab label="Đã bán" value="1"/>
                        {/* <Tab label="Đã sản xuất" value="2"/> */}
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

    function InStockProductTable() {
        return (
            <>
                <div className={style.batchTable}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="center">STT</TableCell>
                                <TableCell align="center">Mã sản phẩm</TableCell>
                                <TableCell align="center">Mã dòng sản phẩm</TableCell>
                                <TableCell align="center">Tên sản phẩm</TableCell>
                                <TableCell align="center">Ngày sản xuất</TableCell>
                                <TableCell align="center">Mã lô hàng</TableCell>
                                <TableCell align="center">Trạng thái</TableCell>
                                {/* <TableCell align="center">Tùy chọn</TableCell> */}
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {inStockProducts.length > 0 ? inStockProducts.map((product, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell align="center">{index}</TableCell>
                                    <TableCell align="center">{product.id}</TableCell>
                                    <TableCell align="center">{product.productLine.id}</TableCell>
                                    <TableCell align="center">{product.productLine.productName}</TableCell>
                                    <TableCell align="center">{product.batch.manufacturingDate}</TableCell>
                                    <TableCell align="center">{product.batch.id}</TableCell>
                                    <TableCell align="center">{productStatus[product.status]}</TableCell>
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

    function SoldProductTable() {
        return (
            <>
                <div className={style.batchTable}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                            <TableCell align="center">STT</TableCell>
                                <TableCell align="center">Mã sản phẩm</TableCell>
                                <TableCell align="center">Mã dòng sản phẩm</TableCell>
                                <TableCell align="center">Tên sản phẩm</TableCell>
                                <TableCell align="center">Ngày bán</TableCell>
                                <TableCell align="center">Mã lô hàng</TableCell>
                                <TableCell align="center">Mã khách hàng</TableCell>
                                <TableCell align="center">Tên khách hàng</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {soldProducts.length > 0 ? soldProducts.map((product, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell align="center">{index}</TableCell>
                                    <TableCell align="center">{product.id}</TableCell>
                                    <TableCell align="center">{product.productLine.id}</TableCell>
                                    <TableCell align="center">{product.productLine.productName}</TableCell>
                                    <TableCell align="center">{product.order.orderDate}</TableCell>
                                    <TableCell align="center">{product.batch.id}</TableCell>
                                    <TableCell align="center">{product.customerProduct.customer.id}</TableCell>
                                    <TableCell align="center">{
                                        product.customerProduct.customer.firstName + " " +
                                        product.customerProduct.customer.lastName
                                        }</TableCell>
                                </TableRow>
                            )) : <TableCell align="center" colSpan={7}>Không có lô hàng nào</TableCell>}
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
                Danh sách sản phẩm
            </p>
            <TabLayout/>
            {
                page == 0 ? <InStockProductTable/> :
                page == 1 ? <SoldProductTable/> : <></>
            }
        </div>
    )
}