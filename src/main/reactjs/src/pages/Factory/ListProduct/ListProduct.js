import style from  './ListProduct.module.scss';
import config from '../../../config.json';
import Authentication from '../../../services/Authentication/Authentication';
import { useState } from 'react';
import {
    Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, 
    Box, Tab, Tabs, TabPanel, Typography} from '@mui/material';
import { useEffect } from 'react';
import ProductStatus from '../../Data/ProductStatus';
import Util from '../../../util/Util';

export default function ListProduct() {

    const [errorProductList, setErrorProductList] = useState([]);
    const [productList, setProductList] = useState([]);

    const [factory, setFactory] = useState();
    const user = Authentication.getCurrentUser();

    const [page, setPage] = useState(0);

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
                }
            }).then((factory) => {
                if (factory != undefined) {
                    resolve(factory);
                }
            })
        })
    }

    function formatDate(date) {
        let [year, month, day] = date.split("-")
        return day + " - " + month + " - " + year;
    }

    function loadProductInStock(factoryId) {
        let url =  config.server.api.factory.stock.product.list.url + "?factoryId=" + factoryId;
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
                setProductList(data);
            }
        })
    }

    function loadErrorProduct(factoryId) {
        let url =  config.server.api.factory.stock.product.errorList.url + "?factoryId=" + factoryId;
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
                setErrorProductList(data);
            }
        })
    }

    useEffect(() => {
        loadFactory().then((factory) => {
            loadErrorProduct(factory.id);
            loadProductInStock(factory.id);
        })
    }, [])
    
    function ErrorProduct() {
        return (
            <>
                <div className={style.batchTable}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="center">STT</TableCell>
                                <TableCell align="center">Mã sản phẩm</TableCell>
                                <TableCell align="center">Mã lô hàng</TableCell>
                                <TableCell align="center">Mã dòng sản phẩm</TableCell>
                                <TableCell align="center">Tên sản phẩm</TableCell>
                                <TableCell align="center">Ngày sản xuất</TableCell>
                                <TableCell align="center">Thông tin lỗi</TableCell>
                                <TableCell align="center">Trạng thái</TableCell>
                                {/* <TableCell align="center">Tùy chọn</TableCell> */}
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {errorProductList.length > 0 ? errorProductList.map((errorProduct, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell align="center">{index}</TableCell>
                                    <TableCell align="center">{errorProduct.product.id}</TableCell>
                                    <TableCell align="center">{errorProduct.product.batch.id}</TableCell>
                                    <TableCell align="center">{errorProduct.product.productLine.id}</TableCell>
                                    <TableCell align="center">{errorProduct.product.productLine.productName}</TableCell>
                                    <TableCell align="center">{errorProduct.product.batch.manufacturingDate}</TableCell>
                                    <TableCell align="center">{errorProduct.error}</TableCell>
                                    <TableCell align="center">{errorProduct.product.status}</TableCell>
                                    {/* <TableCell align="center">
                                        <div className={style.action}>
                                            <button className={style.button}>Sửa</button>
                                            <button 
                                                className={style.button}>Xóa</button>
                                        </div>
                                    </TableCell> */}
                                </TableRow>
                            )) : <TableCell align="center" colSpan={6}>Không có sản phẩm lỗi</TableCell>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </>
        )
    }

    function ProductList() {
        return (
            <>
                <div className={style.batchTable}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="center">STT</TableCell>
                                <TableCell align="center">Mã sản phẩm</TableCell>
                                <TableCell align="center">Mã lô hàng</TableCell>
                                <TableCell align="center">Mã dòng sản phẩm</TableCell>
                                <TableCell align="center">Tên sản phẩm</TableCell>
                                <TableCell align="center">Ngày sản xuất</TableCell>
                                <TableCell align="center">Trạng thái</TableCell>
                                {/* <TableCell align="center">Tùy chọn</TableCell> */}
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {productList.length > 0 ? productList.map((product, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell align="center">{index}</TableCell>
                                    <TableCell align="center">{product.id}</TableCell>
                                    <TableCell align="center">{product.batch.id}</TableCell>
                                    <TableCell align="center">{product.productLine.id}</TableCell>
                                    <TableCell align="center">{product.productLine.productName}</TableCell>
                                    <TableCell align="center">
                                        {Util.convertSQLDateToNormalDate(product.batch.manufacturingDate)}
                                    </TableCell>
                                    <TableCell align="center">{ProductStatus[product.status]}</TableCell>
                                    {/* <TableCell align="center">
                                        <div className={style.action}>
                                            <button className={style.button}>Sửa</button>
                                            <button 
                                                className={style.button}>Xóa</button>
                                        </div>
                                    </TableCell> */}
                                </TableRow>
                            )) : <TableCell align="center" colSpan={6}>Không có sản phẩm lỗi</TableCell>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </>
        )
    }

    function TabLayout() {
        return (
            <div>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs sx={{color: 'black', '& button': {color: 'black'}}} 
                        onChange={(e, value) => setPage(parseInt(value))} 
                        value={page.toString()} aria-label="basic tabs example">
                        <Tab label="Trong kho" value="0"/>
                        <Tab label="Lỗi" value="1"/>
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

    return (
        <div className={style.container}>
            <p className={style.title}>
                Danh sách sản phẩm trong kho
            </p>
            <TabLayout/>
            {
                page == 0 ? <ProductList/> : <ErrorProduct/>
            }
        </div>
    )
}
