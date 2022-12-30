import style from './WarrantyHistory.module.scss';
import Authentication from '../../../../services/Authentication/Authentication';
import config from '../../../../config.json';

import { Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, 
    Box, Tab, Tabs, TabPanel, Typography  } from "@mui/material";
import { useReducer } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import ProductWarrantyStatus from '../ProductWarrantyStatus';

export default function WarrantyHistory() {
    const [finishWarrantyList, setFinishWarrantyList] = useState([]);

    const [reducer, forceUpdate] = useReducer(x => x + 1, 0);
    const [warrantyCenter, setWarrantyCenter] = useState({});
    const user = Authentication.getCurrentUser();

    function loadWarrantyCenter() {
        return new Promise((resolve, reject) => {
            let url = config.server.api.warranty.get.url + "?unitId=" + user.unit.id;
            fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': Authentication.generateAuthorizationHeader()
                }
            }).then((response) => {
                if (response.status == 200) {
                    return response.json()
                }
            }).then((warrantyCenter) => {
                if (warrantyCenter != undefined) {
                    resolve(warrantyCenter);
                }
            })
        })
    }

    function loadFinishedWarrantyList(warrantyCenterId) {
        let url = config.server.api.warranty.warranty.history.url + "?warrantyCenterId=" + warrantyCenterId;
        fetch(url, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            } else toast.error("Không thể tải dữ liệu")
        }).then((data) => {
            if (data != undefined) setFinishWarrantyList(data)
        })
    }

    useEffect(() => {
        loadWarrantyCenter().then((warrantyCenter) => {
            loadFinishedWarrantyList(warrantyCenter.id);
        })
    }, [reducer])

    return (
        <div className={style.container}>
            <p className={style.title}>
                Lịch sử bảo hành
            </p>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">STT</TableCell>
                        <TableCell align="center">Mã đơn bảo hành</TableCell>
                        <TableCell align="center">Mã khách hàng</TableCell>
                        <TableCell align="center">Tên khách hàng</TableCell>
                        <TableCell align="center">Mã sản phẩm</TableCell>
                        <TableCell align="center">Tên sản phẩm</TableCell>
                        <TableCell align="center">Ngày bắt đầu</TableCell>
                        <TableCell align="center">Ngày kết thúc</TableCell>
                        <TableCell align="center">Đại lý yêu cầu</TableCell>
                        <TableCell align="center">Trạng thái</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {   finishWarrantyList.length > 0 ? finishWarrantyList.map((productWarranty, index) => {
                    return (
                        <TableRow
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center">{productWarranty.id}</TableCell>
                            <TableCell align="center">{productWarranty.customerProduct.customer.id}</TableCell>
                            <TableCell align="center">{
                                productWarranty.customerProduct.customer.firstName + " " + 
                                productWarranty.customerProduct.customer.lastName
                            }</TableCell>
                            <TableCell align="center">{productWarranty.customerProduct.productId}</TableCell>
                            <TableCell align="center">{productWarranty.customerProduct.product.productLine.productName}</TableCell>
                            <TableCell align="center">
                                <span style={{whiteSpace: 'nowrap'}}>{productWarranty.startWarrantyDate}</span>
                            </TableCell>
                            <TableCell align="center">
                                <span style={{whiteSpace: 'nowrap'}}>{productWarranty.endWarrantyDate}</span>
                            </TableCell>
                            <TableCell align="center">{productWarranty.requestWarrantyDistributor.name}</TableCell>
                            <TableCell align="center">{ProductWarrantyStatus[productWarranty.status]}</TableCell>
                        </TableRow>
                    )
                }) : <TableRow><TableCell colSpan={8} align="center">Không có đơn bảo hành nào</TableCell></TableRow>
                }
                </TableBody>
            </Table>
        </div>
    )
}