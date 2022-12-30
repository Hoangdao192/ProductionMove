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
import ServerAPI from '../../../services/ServerAPI';
import { toast } from 'react-toastify';

export default function ListProduct() {

    const [errorProductList, setErrorProductList] = useState([]);
    const [productList, setProductList] = useState([]);

    const [factory, setFactory] = useState();
    const user = Authentication.getCurrentUser();

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

    useEffect(() => {
        ServerAPI.getFactoryByUnitId(user.unit.id).then((factory) => {
            loadProductInStock(factory.id);
        }).catch((message) => toast.error(message))
    }, [])

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

    return (
        <div className={style.container}>
            <p className={style.title}>
                Danh sách sản phẩm trong kho
            </p>
            <ProductList/>
        </div>
    )
}
