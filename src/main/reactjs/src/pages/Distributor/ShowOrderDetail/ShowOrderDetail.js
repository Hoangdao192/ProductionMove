import { Link, useLocation } from 'react-router-dom'
import style from './ShowOrderDetail.module.scss'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

export default function ShowOrderDetail() {
    const order = useLocation().state.order;

    return (
        <div className={style.container}>
            <p className={style.title}>
                Chi tiết đơn hàng
            </p>
            <p className={style.orderId}>
                Mã đơn hàng : <span>{order.id}</span>
            </p>

            <div className={style.tableContainer}>
                <div>
                    <TableContainer sx={{padding: 0, margin: 0}}>
                        <Table sx={{ margin: 0, padding: 0, '& td, th' : {paddingLeft: 0, paddingRight: 0}, }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2}><p className={style.customerInfo}>Thông tin khách hàng</p></TableCell>
                                </TableRow>
                                <TableRow>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell align="left"><p className={style.customerTitle}>Mã khách hàng</p></TableCell>
                                    <TableCell align='right'><p className={style.customerValue}>{order.customer.id}</p></TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{'&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell align="left"><p className={style.customerTitle}>Tên khách hàng</p></TableCell>
                                    <TableCell align='right'><p className={style.customerValue}>
                                        {order.customer.firstName + " " + order.customer.lastName}</p></TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell align="left"><p className={style.customerTitle}>Địa chỉ</p></TableCell>
                                    <TableCell align='right'><p className={style.customerValue}>{order.customer.address}</p></TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell align="left"><p className={style.customerTitle}>Số điện thoại</p></TableCell>
                                    <TableCell align='right'><p className={style.customerValue}>{order.customer.phoneNumber}</p></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div>
                    <TableContainer sx={{ padding: 0, margin: 0}}>
                        <Table sx={{ margin: 0, padding: 0 }} aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{'& th': {paddingLeft: 0}}}>
                                    <TableCell  colSpan={5}><p className={style.customerInfo}>Thông tin sản phẩm</p></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='left' sx={{paddingLeft: 0}}>STT</TableCell>
                                    <TableCell align='center'>Mã sản phẩm</TableCell>
                                    <TableCell align='center'>Tên sản phẩm</TableCell>
                                    <TableCell align='center'>Số lượng</TableCell>
                                    {/* <TableCell align='right' sx={{paddingRight: 0}}>
                                        Tùy chọn
                                    </TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    order.orderDetails.map((orderDetail, index) => {
                                        return (
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                <TableCell align='left' sx={{paddingLeft: 0}}>{index}</TableCell>
                                                <TableCell align='center'>{orderDetail.product.id}</TableCell>
                                                <TableCell align='center'>{orderDetail.productLine.productName}</TableCell>
                                                <TableCell align='center'>{orderDetail.quantity}</TableCell>
                                                {/* <TableCell align='right' sx={{paddingRight: 0}}>
                                                    <Link to='/manager/product_line/show' state={{productLine: orderDetail.productLine}}>
                                                        <button className={style.actionButton}>
                                                            Xem sản phẩm
                                                        </button>
                                                    </Link>
                                                </TableCell> */}
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}