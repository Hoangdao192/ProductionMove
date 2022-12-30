import style from './ImportProduct.module.scss';
import config from '../../../../config.json';
import Authentication from '../../../../services/Authentication/Authentication';
import { useState } from 'react';
import {
    Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, 
    Box, Tab, Tabs, TabPanel, Typography} from '@mui/material';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import ServerAPI from '../../../../services/ServerAPI';
import { useReducer } from 'react';

export default function ImportProduct() {
    const [distributor, setDistributor] = useState({});
    const [productTransactions, setProductTransactions] = useState([]);
    const [reducer, forceReset] = useReducer(x => x + 1, 0);

    const user = Authentication.getCurrentUser();

    function resetComponent() {
        setDistributor({});
        setProductTransactions([]);
    }

    //  Load thông tin đơn vận chuyển đang được chuyển đến Đại lý
    function loadIncomingProductTransaction(distributorId) {
        let url = config.server.api.distributor.producTransaction.inComing.url;
        fetch(`${url}?distributorId=${distributorId}`, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json();
            } else toast.error("Không thể tải dữ liệu vận chuyển.")
        }).then((data) => {
            if (data != undefined) {
                
                setProductTransactions(data);
            }
        })
    }

    function sendImportRequest(productTransactionId) {
        let url = config.server.api.distributor.producTransaction.import.url;
        let formData = new FormData();
        formData.append("productTransactionId", productTransactionId);
        fetch(url, {
            method: "POST",
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            },
            body: formData
        }).then((response) => {
            if (response.status == 200) {
                toast.success("Nhập hàng thành công")
            } else toast.error("Nhập hàng không thành công")
        })
    }

    useEffect(() => {
        ServerAPI.getDistributorByUnitId(user.unit.id)
            .then((distributor) => {
                setDistributor(distributor);
                loadIncomingProductTransaction(distributor.id);
            })
    }, [])

    return (
        <div className={style.container}>
            <p className={style.title}>
                Nhập kho
            </p>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">STT</TableCell>
                        <TableCell align="center">Mã vận chuyển</TableCell>
                        <TableCell align="center">Mã đơn vị xuất hàng</TableCell>
                        <TableCell align="center">Đơn vị xuất hàng</TableCell>
                        <TableCell align="center">Tùy chọn</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {productTransactions.length > 0 ? productTransactions.map((productTransaction, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="center">{index}</TableCell>
                            <TableCell align="center">{productTransaction.id}</TableCell>
                            <TableCell align="center">{productTransaction.factory.id}</TableCell>
                            <TableCell align="center">{productTransaction.factory.name}</TableCell>
                            <TableCell align="center">
                                <div className={style.action}>
                                    <button onClick={(e) => sendImportRequest(productTransaction.id)}
                                        className={style.button}>Nhập kho</button>
                                </div>
                            </TableCell>
                        </TableRow>
                    )) : <TableCell align="center" colSpan={6}>Không có đơn vận chuyển nào</TableCell>}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}