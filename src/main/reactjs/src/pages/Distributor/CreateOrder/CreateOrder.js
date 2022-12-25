import style from './CreateOrder.module.scss';
import { UilPlus } from '@iconscout/react-unicons'
import { useState } from 'react';
import config from '../../../config.json';
import { useEffect } from 'react';
import { useReducer } from 'react';

export default function CreateOrder() {
    const [reducer, setReducer] = useReducer(x => x + 1, 0)
    const [products, setProducts] = useState([])
    const [orderDetail, setOrderDetail] = useState({
        productLineId: "",
        productName: "",
        quantity: ""
    })
    const [orderDetailList, setOrderDetailList] = useState([])
    const [customer, setCustomer] = useState({})
    const [order, setOrder] = useState({
        orderDate: "",
        customerId: ""
    })
    const [isAddProductShow, setShowAddProduct] = useState(false)

    function resetComponent() {
        setProducts([])
        setOrderDetail({
            productLineId: "",
            productName: "",
            quantity: ""
        })
        setOrderDetailList([])
        setCustomer({})
        setOrder({
            orderDate: "",
            customerId: ""
        })
        setShowAddProduct(false)
        setReducer()
    }

    function validation() {
        if (!/^\d+$/.test(order.customerId)) {
            alert("Invalid customer id")
            return false;
        }

        if (order.orderDate == "") {
            alert("Invalid orderDate");
            return false;
        }

        if (orderDetailList.length == 0) {
            alert("Invalid order detail");
            return false;
        }
        return true;
    }

    function sendRequest() {
        if (validation()) {
            let url = config.server.api.order.create.url;
            fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderDate: order.orderDate,
                    customerId: order.customerId,
                    orderDetailList: orderDetailList
                })
            }).then((response) => {
                if (response.status == 200) {
                    alert("Success")
                    resetComponent()
                } else {
                    handleRequestError(response)
                }
            }).catch((error) => {
                console.log("ERROR")
                console.log(error)
            })
        }
    }

    async function handleRequestError(response) {
        let text = await response.text();
        console.log(text);
    }

    function validateCustomer() {
        if (!/^\d+$/.test(order.customerId)) {
            alert("customerId must be integer.")
        }

        let url = `${config.server.api.customer.get.url}?customerId=${order.customerId}`
        fetch(url, {
            method: "GET"
        }).then((response) => {
            console.log(response.body)
            if (response.status == 200) {
                return response.json()
            }
        }).then((data) => {
            if (data != undefined) setCustomer(data)
            else setCustomer({})
        })
    }

    function loadProductLine() {
        let url = config.server.api.productLine.list.url;
        fetch(url).then((response) => {
            return response.json();
        }).then((data) => {
            if (data != undefined) setProducts(data)
        })
    }

    function validateOrderDetail(orderDetail) {
        if (orderDetail.productLineId == "None" || orderDetail.productLineId == "" || orderDetail.quantity == "") {
            return false;
        }
        return true;
    }

    function addOrderDetail(newOrderDetail) {
        if (!validateOrderDetail(newOrderDetail)) {
            alert("Invalid order detail");
            return;
        }

        newOrderDetail.quantity = parseInt(newOrderDetail.quantity);

        let exists = false;
        let newOrderDetailList = [...orderDetailList];
        for (let i = 0; i < newOrderDetailList.length; ++i) {
            if (newOrderDetailList[i].productLineId === newOrderDetail.productLineId) {
                newOrderDetailList[i].quantity += newOrderDetail.quantity;
                setOrderDetailList(newOrderDetailList);
                exists = true;
                break;
            }
        }
        if (!exists) {
            setOrderDetailList(
                [
                    ...orderDetailList,
                    newOrderDetail
                ]
            )
        }
    }

    function deleteOrderDetail(productLineId) {
        let newOrderDetailList = [];
        orderDetailList.forEach((orderDetail) => {
            if (orderDetail.productLineId != productLineId) {
                newOrderDetailList.push(orderDetail)
            }
                
        })
        setOrderDetailList(newOrderDetailList)
    }

    function cancelAddProduct(event) {
        setOrderDetail({
            productLineId: "",
            productName: "",
            quantity: ""
        })
        setShowAddProduct(false)
    }

    function acceptAddProduct(event) {
        addOrderDetail({
            productLineId: orderDetail.productLineId,
            productName: orderDetail.productName,
            quantity: orderDetail.quantity
        })
        
        setOrderDetail({
            productLineId: "",
            productName: "",
            quantity: ""
        })
        setShowAddProduct(false)
    }

    useEffect(() => {
        loadProductLine()
    }, [reducer])

    return (
        <div className={style.createOrder}>
            <div className={style.form}>
                <p className={style.title}>Tạo đơn hàng</p>
                <label className={style.label} htmlFor={style.dateInput}>Ngày mua hàng</label>
                <input onChange={(e) => setOrder({
                    ...order,
                    orderDate: e.target.value
                })} value={order.orderDate} type="date" id={style.dateInput} className={style.input}/>

                <label className={style.label}>Mã khách hàng</label>
                <input onChange={(e) => setOrder({
                    ...order,
                    customerId: e.target.value
                })} onBlur={(e) => validateCustomer()}
                    value={order.customerId} placeholder='Nhập mã khách hàng' type="text" className={style.input}/>

                <div className={`${style.customerInfo} ${customer.id != undefined ? style.show : ''}`}>
                    <p><span>Mã khách hàng:</span> {customer.id}</p>
                    <p><span>Tên khách hàng:</span> {customer.firstName} {customer.lastName}</p>
                    <p><span>Địa chỉ:</span> {customer.address}</p>
                    <p><span>Số điện thoại:</span> {customer.phoneNumber}</p>
                </div>

                <p className={style.orderDetailTitle}>Chi tiết đơn hàng</p>

                {!isAddProductShow ? <button onClick={(e) => setShowAddProduct(true)} 
                type='button' className={style.addProductButton}>
                    <UilPlus className={style.icon}/>
                    Thêm sản phẩm
                </button> :

                <div className={style.addProduct}>
                    <div>
                        <label className={style.label} htmlFor="">Dòng sản phẩm</label>
                        <select name="" id="" className={style.select}
                            onChange={(e) => {
                                setOrderDetail({
                                    ...orderDetail,
                                    productLineId: e.target.value,
                                    productName: e.target.options[e.target.selectedIndex].text
                                })
                            }}
                        >
                            <option value="None"> - Chưa chọn - </option>
                            {
                                products.map((product, index) => {
                                    return (
                                        <option value={product.id}>{product.productName}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label className={style.label} htmlFor="">Số lượng</label>
                        <input onChange={(e) => {
                            setOrderDetail({
                                ...orderDetail,
                                quantity: e.target.value
                            })
                        }} min={1} max={100} placeholder='Nhập số lượng' type="number" className={style.input}/>
                    </div>
                    <button type='button' onClick={(e) => {acceptAddProduct(e)}}>Chấp nhận</button>
                    <button type='button' onClick={(e) => {cancelAddProduct(e)}}>Hủy</button>
                </div>}

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Tuỳ chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderDetailList.map((orderDetail, index) => {
                                return (
                                    <tr>
                                        <td>{index}</td>
                                        <td>{orderDetail.productLineId}</td>
                                        <td>{orderDetail.productName}</td>
                                        <td>{orderDetail.quantity}</td>
                                        <td>
                                            <button type='button' 
                                            onClick={(e) => deleteOrderDetail(orderDetail.productLineId)}>Xóa</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <button onClick={(e) => sendRequest()} className={style.createOrderButton}>
                    <UilPlus className={style.icon}/>
                    Tạo đơn hàng
                </button>
            </div>
        </div>
    )
}