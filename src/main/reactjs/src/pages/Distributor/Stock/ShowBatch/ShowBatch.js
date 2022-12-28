import { useLocation } from 'react-router-dom';
import style from './ShowBatch.module.scss';
import config from '../../../../config.json';
import Authentication from '../../../../services/Authentication/Authentication';

import { DataGrid } from '@mui/x-data-grid';

import {
    Table, TableBody, TableCell, TablePagination,
    TableContainer, TableHead, TableRow, 
    Box, Tab, Tabs, TabPanel, Typography} from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

export default function ShowBatch() {
    const productBatch = useLocation().state.productBatch;
    const [products, setProducts] = useState([])

    const columns = [
        { field: 'stt', headerName: 'STT', flex: 1},
        { field: 'productId', headerName: 'Mã sản phẩm', flex: 1},
        { field: 'productLineId', headerName: 'Mã dòng sản phẩm', flex: 1},
        { field: 'productLineName', headerName: 'Tên dòng sản phẩm', flex: 1}
      ];

    useEffect(() => {
        let url = config.server.api.productBatch.product.list.url + "?productBatchId=" + productBatch.id;
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
                setProducts(data);
            }
        })
    }, [])

    return (
        <div className={style.container}>
            <p className={style.title}>
                Chi tiết lô hàng
            </p>
            <div className={style.productBatchInfo}>
                <p>Thông tin lô hàng</p>
                <div>
                    <p>Mã lô hàng</p>
                    <p>{productBatch.id}</p>
                </div>
                <div>
                    <p>Ngày sản xuất</p>
                    <p>{productBatch.manufacturingDate}</p>
                </div>
                <div>
                    <p>Mã sở sản xuất</p>
                    <p>{productBatch.factory.id}</p>
                </div>
                <div>
                    <p>Tên cơ sở sản xuất</p>
                    <p>{productBatch.factory.name}</p>
                </div>
                <div>
                    <p>Mã dòng sản phẩm</p>
                    <p>{productBatch.productLine.id}</p>
                </div>
                <div>
                    <p>Tên dòng sản phẩm</p>
                    <p>{productBatch.productLine.productName}</p>
                </div>
                <div>
                    <p>Số lượng sản phẩm</p>
                    <p>{productBatch.productQuantity}</p>
                </div>
            </div>
            <div className={style.productList}>
                <p>Danh sách sản phẩm</p>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={products.map((product, index) => {
                            return {
                                id: product.id,
                                stt: index + 1,
                                productId: product.id,
                                productLineId: product.productLine.id,
                                productLineName: product.productLine.productName
                            }
                        })}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
                
                <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="center">STT</TableCell>
                                <TableCell align="center">Mã sản phẩm</TableCell>
                                <TableCell align="center">Mã dòng sản phẩm</TableCell>
                                <TableCell align="center">Tên dòng sản phẩm</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {products.length > 0 ? products.map((product, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell align="center">{index}</TableCell>
                                    <TableCell align="center">{product.id}</TableCell>
                                    <TableCell align="center">{product.productLine.id}</TableCell>
                                    <TableCell align="center">{product.productLine.productName}</TableCell>
                                </TableRow>
                            )) : <TableCell align="center" colSpan={6}>Không có sản phẩm nào</TableCell>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                            rowsPerPageOptions={[10, 20, 50]}
                            component="div"
                            count={products.length}
                            rowsPerPage={5}/>
            </div>
        </div>
    )
}