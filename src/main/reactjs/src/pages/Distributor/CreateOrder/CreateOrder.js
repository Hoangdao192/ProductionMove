import style from './CreateOrder.module.scss';
import { UilPlus } from '@iconscout/react-unicons'
import { useState } from 'react';
import config from '../../../config.json';
import { useEffect } from 'react';
import { useReducer } from 'react';
import Authentication from "../../../services/Authentication/Authentication";

export default function CreateOrder() {
    const [reducer, setReducer] = useReducer(x => x + 1, 0)
    const [products, setProducts] = useState([])
    const [orderDetail, setOrderDetail] = useState({
        productLineId: "",
        productName: "",
        quantity: 1,
        productId: ""
    })
    const [orderDetailList, setOrderDetailList] = useState([])
    const [customer, setCustomer] = useState({})
    const [order, setOrder] = useState({
        orderDate: "",
        customerId: ""
    })
    const [isAddProductShow, setShowAddProduct] = useState(false)
    const [isCustomerValid, setIsCustomerValid] = useState(true)

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

        if (!isCustomerValid) {
            alert("Invalid customer");
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
                    'Content-Type': 'application/json',
                    'Authorization': Authentication.generateAuthorizationHeader()
                },
                body: JSON.stringify({
                    distributorId: distributor.id,
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
            method: "GET",
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            console.log(response.body)
            if (response.status == 200) {
                setIsCustomerValid(true)
                return response.json()
            }
        }).then((data) => {
            if (data != undefined) setCustomer(data)
            else {
                setIsCustomerValid(false)
                setCustomer({})
            }
        })
    }

    function loadProductLine() {
        let url = config.server.api.productLine.list.url;
        fetch(url, {
            method: "GET",
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json();
            }
        }).then((data) => {
            if (data != undefined) setProducts(data)
        })
    }

    function validateOrderDetail(orderDetail) {
        console.log(orderDetail)
        if (orderDetail.productLineId == "None" || orderDetail.productLineId == "") {
            return false;
        }
        if (!/^\d+$/.test(orderDetail.productId)) {
            alert("Invalid")
            return false;
        }

        for (let i = 0; i < orderDetailList.length; ++i) {
            if (orderDetailList[i].productId === orderDetail.productId) {
                alert("Product id exisst");
                return false;
            }
        }
        return true;
    }

    function addOrderDetail(newOrderDetail) {
        if (!validateOrderDetail(newOrderDetail)) {
            alert("Invalid order detail");
            return;
        }

        newOrderDetail.quantity = parseInt(newOrderDetail.quantity);

        setOrderDetailList(
            [
                ...orderDetailList,
                newOrderDetail
            ]
        )
    }

    function deleteOrderDetail(deleteOrderDetail) {
        let newOrderDetailList = [];
        orderDetailList.forEach((orderDetail) => {
            if (orderDetail.productId != deleteOrderDetail.productId) {
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
            quantity: orderDetail.quantity,
            productId: orderDetail.productId
        })
        
        setOrderDetail({
            productLineId: "",
            productName: "",
            quantity: 1,
            productId: ""
        })
        setShowAddProduct(false)
    }

    useEffect(() => {
        loadDistributor().then((distributor) => {
            setDistributor(distributor);
            loadProductLine();
        })
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

                {
                    !isCustomerValid ? <p style={{
                    fontWeight: 500,
                    color: 'red'
                }} >* Khách hàng không tồn tại</p> : <></>
                }

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
                        <label className={style.label} htmlFor="">Mã máy</label>
                            <input onChange={(e) => {
                                setOrderDetail({
                                    ...orderDetail,
                                    productId: e.target.value
                                }) }}
                                value={orderDetail.productId} placeholder='Nhập mã máy' type="text" className={style.input}/>
                    </div>
                    <button type='button' onClick={(e) => {acceptAddProduct(e)}}>Chấp nhận</button>
                    <button type='button' onClick={(e) => {cancelAddProduct(e)}}>Hủy</button>
                </div>}

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã dòng sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Mã sản phẩm</th>
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
                                        <td>{orderDetail.productId}</td>
                                        <td>{orderDetail.quantity}</td>
                                        <td>
                                            <button type='button' 
                                            onClick={(e) => deleteOrderDetail(orderDetail)}>Xóa</button>
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