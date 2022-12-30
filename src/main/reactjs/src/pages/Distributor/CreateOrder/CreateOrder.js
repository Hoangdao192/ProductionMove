import style from './CreateOrder.module.scss';
import { UilPlus } from '@iconscout/react-unicons'
import { useState } from 'react';
import config from '../../../config.json';
import { useEffect } from 'react';
import { useReducer } from 'react';
import Authentication from "../../../services/Authentication/Authentication";
import Validator from '../../../services/validator/Validator';
import { toast } from 'react-toastify';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CreateOrder() {
    const [isDialogOpen, setDialogVisibility] = useState(false);
    const [productsInStock, setProductsInStock] = useState([]);

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
        if (Validator.isEmpty(order.customerId)) {
            toast.error("Mã khách hàng không được để trống.")
            return false;
        }

        if (!Validator.containNumberOnly(order.customerId)) {
            toast.error("Mã khách hàng phải là số")
            return false;
        }

        if (Validator.isEmpty(order.orderDate)) {
            toast.error("Bạn chưa nhập ngày mua hàng hoặc ngày mua hàng không hợp lệ.");
            return false;
        }

        if (orderDetailList.length == 0) {
            toast.error("Danh sách mua hàng trống");
            return false;
        }

        if (!isCustomerValid) {
            toast.error("Khách hàng không hợp lệ");
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
                    toast.success("Tạo đơn hàng thành công");
                    resetComponent()
                } else toast.error("Tạo đơn hàng không thành công");
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

        for (let i = 0; i < orderDetailList.length; ++i) {
            if (orderDetailList[i].productId === orderDetail.productId) {
                toast.error("Bạn chọn sản phẩm này rồi");
                return false;
            }
        }
        return true;
    }

    function addOrderDetail(newOrderDetail) {
        if (!validateOrderDetail(newOrderDetail)) {
            return false;
        }

        newOrderDetail.quantity = parseInt(newOrderDetail.quantity);

        setOrderDetailList(
            [
                ...orderDetailList,
                newOrderDetail
            ]
        )

        return true;
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

    function loadProduct(distributorId) {
        let url = config.server.api.distributor.stock.product.list.sellable.url;
        fetch(url + "?distributorId=" + distributorId, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }  
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            } else toast.error("Không thể tải dữ liệu");
        }).then((data) => setProductsInStock(data));
    }

    useEffect(() => {
        loadDistributor().then((distributor) => {
            setDistributor(distributor);
            loadProductLine();
            loadProduct(distributor.id)
        })
    }, [reducer])


    function PickProductDialog() {
        function ProductTable() {
            return (
                <TableContainer>
                    <Table  aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="center">Mã sản phẩm</TableCell>
                            <TableCell align="center">Mã dòng sản phẩm</TableCell>
                            <TableCell align="center">Tên sản phẩm</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {productsInStock.map((product, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="center">
                                    <Button onClick={(e)  => {
                                        if (addOrderDetail({
                                            productLineId: product.productLine.id,
                                            productId: product.id,
                                            quantity: 1,
                                            productName: product.productLine.productName
                                        })) setDialogVisibility(false); 
                                    }}>Chọn</Button>
                                </TableCell>
                                <TableCell align="center">{product.id}</TableCell>
                                <TableCell align="center">{product.productLine.id}</TableCell>
                                <TableCell align="center">{product.productLine.productName}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }

        function onClose(e) {

        }

        return (
            <Dialog open={isDialogOpen} onClose={(e) => onClose(e)}>
                <DialogTitle>Chọn sản phẩm</DialogTitle>
                <DialogContent>
                    <ProductTable/>
                </DialogContent>
                <DialogActions>
                <Button onClick={(e) => setDialogVisibility(false)}>Hủy</Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <div className={style.createOrder}>
            <PickProductDialog/>
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

                <button onClick={(e) => setDialogVisibility(true)} 
                type='button' className={style.addProductButton}>
                    <UilPlus className={style.icon}/>
                    Thêm sản phẩm
                </button>

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