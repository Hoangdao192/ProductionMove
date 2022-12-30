import style from './ListCustomer.module.scss';
import config from '../../../../config.json';
import Authentication from '../../../../services/Authentication/Authentication';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { useReducer } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ListCustomer() {

    const [reducer, forceUpdate] = useReducer(x => x + 1, 0);

    const [customers, setCustomers] = useState([]);

    const [distributor, setDistributor] = useState({});
    const user = Authentication.getCurrentUser();

    function restComponent() {
        setCustomers([])
        setDistributor({})
        forceUpdate()
    }

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
                } else toast.error("Không thể tải dữ liệu")
            }).then((distributor) => {
                if (distributor != undefined) {
                    resolve(distributor);
                }
            })
        })
    }

    function loadCustomer(distributorId) {
        let url = config.server.api.customer.list.url + "?distributorId=" + distributorId;
        fetch(url, {
            method: "GET",
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {
                toast.error("Không thể tải danh sách khách hàng")
            }
        }).then((data) => {
            if (data != undefined) setCustomers(data)
        })
    }

    function deleteCustomer(customerId) {
        let url = config.server.api.customer.delete.url + "/" + customerId;
        fetch(url, {
            method: "DELETE",
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                toast.success("Xóa khách hàng thành công");
                restComponent();
            } else {
                toast.error("Không thể xóa khách hàng")
            }
        })
    }

    useEffect(() => {
        loadDistributor().then((distributor) => {
            setDistributor(distributor)
            loadCustomer(distributor.id)
        })
    }, [reducer])

    return (
        <div className={style.container}>
            <p className={style.title}>Danh sách khách hàng của đại lý</p>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">STT</TableCell>
                        <TableCell align="center">Mã khách hàng</TableCell>
                        <TableCell align="center">Tên khách hàng</TableCell>
                        <TableCell align="center">Số điện thoại</TableCell>
                        <TableCell align="center">Địa chỉ</TableCell>
                        <TableCell align="center">Tùy chọn</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {customers.map((customer, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="center">{index}</TableCell>
                            <TableCell align="center">{customer.id}</TableCell>
                            <TableCell align="center">{customer.firstName + " " + customer.lastName}</TableCell>
                            <TableCell align="center">{customer.phoneNumber}</TableCell>
                            <TableCell align="center">{customer.address}</TableCell>
                            <TableCell align="center">
                                <div className={style.action}>
                                    <Link to="/distributor/customer/edit" state={{customer: customer}}>
                                        <button className={style.button}>Sửa</button>
                                    </Link>
                                    <button className={style.button} onClick={(e) => deleteCustomer(customer.id)}>Xóa</button>
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