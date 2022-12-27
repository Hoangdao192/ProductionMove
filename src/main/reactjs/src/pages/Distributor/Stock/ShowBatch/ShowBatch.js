import { useLocation } from 'react-router-dom';
import style from './ShowBatch.module.scss';

import {
    Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, 
    Box, Tab, Tabs, TabPanel, Typography} from '@mui/material';
import { useState } from 'react';

export default function ShowBatch() {
    const productBatch = useLocation().state.productBatch;
    const [products, setProducts] = useState([])

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
                            {products.length > 0 ? products.map((productBatch, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell align="center">{index}</TableCell>
                                    <TableCell align="center">{productBatch.id}</TableCell>
                                </TableRow>
                            )) : <TableCell align="center" colSpan={6}>Không có sản phẩm nào</TableCell>}
                            </TableBody>
                        </Table>
                    </TableContainer>
            </div>
        </div>
    )
}