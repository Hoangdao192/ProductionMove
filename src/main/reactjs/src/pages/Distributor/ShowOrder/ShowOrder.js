import { useState } from 'react';
import { useEffect } from 'react';
import style from './ShowOrder.module.scss';
import config from '../../../config.json';
import { useReducer } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import { Link } from 'react-router-dom';

export default function ShowOrder() {
    const [orders, setOrders] = useState([]);
    const [reducer, forceUpdate] = useReducer(x => x + 1, 0)

    useEffect(() => {
        let url = config.server.api.order.list.url;
        fetch(url)
        .then((response) => {
            if (response.status == 200) {
                return response.json();
            }
        }).then((data) => {
            if (data != undefined) setOrders(data);
            console.log(data);
        })
    }, [reducer])

    function formatDate(date) {
        let [year, month, day] = date.split("-")
        return day + " - " + month + " - " + year;
    }

    function sendDeleteOrderRequest(orderId) {
        let url = config.server.api.order.delete.url + "/" + orderId;
        fetch(url, {
            method: "DELETE"
        }).then((response) => {
            if (response.status == 200) {
                alert("OK")
                forceUpdate()
            } else{
                response.text().then((data) => alert(data))
            }
        })
    }

    return (
        <div className={style.showOrder}>
            <p className={style.title}>
                Danh sách đơn hàng
            </p>

            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">STT</TableCell>
                        <TableCell align="center">Mã đơn hàng</TableCell>
                        <TableCell align="center">Ngày mua hàng</TableCell>
                        <TableCell align="center">Mã khách hàng</TableCell>
                        <TableCell align="center">Tên khách hàng</TableCell>
                        <TableCell align="center">Tùy chọn</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {orders.map((order, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="center">{index}</TableCell>
                            <TableCell align="center">{order.id}</TableCell>
                            <TableCell align="center">{formatDate(order.orderDate)}</TableCell>
                            <TableCell align="center">{order.customer.id}</TableCell>
                            <TableCell align="center">{order.customer.firstName + " " + order.customer.lastName}</TableCell>
                            <TableCell align="center">
                                <div className={style.action}>
                                    <Link to={'/distributor/order_detail/get'} state={{order: order}}>
                                        <button className={style.button}>Xem chi tiết</button>
                                    </Link>
                                    <button className={style.button}>Sửa</button>
                                    <button onClick={(e) => sendDeleteOrderRequest(order.id)} 
                                        className={style.button}>Xóa</button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}