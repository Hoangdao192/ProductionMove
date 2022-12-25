import { useState } from 'react';
import { useEffect } from 'react';
import style from './ShowOrder.module.scss';
import config from '../../../config.json';
import { useReducer } from 'react';

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
            <table className={style.table}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã đơn hàng</th>
                        <th>Ngày mua hàng</th>
                        <th>Mã khách hàng</th>
                        <th>Tên khách hàng</th>
                        <th>Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order, index) => {
                            return (
                                <tr>
                                    <td>{index}</td>
                                    <td>{order.id}</td>
                                    <td>{formatDate(order.orderDate)}</td>
                                    <td>{order.customer.id}</td>
                                    <td>{order.customer.firstName + " " + order.customer.lastName}</td>
                                    <td className={style.action}>
                                        {/* <Link to="/manager/unit/edit" state={{unit: {...factory, type: unitType}}}>
                                            <button className={style.editButton}>Sửa</button>
                                        </Link> */}
                                        <button className={style.button}>Sửa</button>
                                        <button onClick={(e) => sendDeleteOrderRequest(order.id)} 
                                            className={style.button}>Xóa</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}