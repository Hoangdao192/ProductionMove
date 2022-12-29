import { useEffect } from 'react';
import { useState } from 'react';
import style from './ListProductLine.module.scss';
import config from '../../../../config.json';
import { useReducer } from 'react';
import { Link } from 'react-router-dom';

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import Authentication from '../../../../services/Authentication/Authentication';
import { toast } from 'react-toastify';

export default function ListProductLine() {
    const [productLines, setProductLines] = useState([])
    const [reducer, forceUpdate] = useReducer(x => x + 1, 0)


    useEffect(() => {
        let url = config.server.api.productLine.list.url;
        fetch(url, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        })
        .then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {
                toast.error("Tải dữ liệu thất bại.");
            }
        }).then((data) => {
            if (data != undefined) setProductLines(data)
        })
    }, [reducer])

    function sendDeleteProductLineRequest(productLineId) {
        let url = `${config.server.api.productLine.delete.url}/${productLineId}`;
        fetch(url, {
            method: "DELETE",
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                toast.success("Xóa dòng sản phẩm thành công.");
                forceUpdate()
            } else {
                toast.error("Xóa dòng sản phẩm không thành công.");
            }
        })
    }

    return (
        <div className={style.showProductLine}>
            <p className={style.title}>Danh sách dòng sản phẩm</p>
            
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">STT</TableCell>
                        <TableCell align="center">Mã dòng sản phẩm</TableCell>
                        <TableCell align="center">Tên dòng sản phẩm</TableCell>
                        <TableCell align="center">Tùy chọn</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {productLines.map((productLine, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="center">{index}</TableCell>
                            <TableCell align="center">{productLine.id}</TableCell>
                            <TableCell align="center">{productLine.productName}</TableCell>
                            <TableCell align="center">
                                <div className={style.action}>
                                    <Link to={'/manager/product_line/show'} state={{productLine: productLine}}>
                                        <button className={style.actionButton}>Xem chi tiết</button>
                                    </Link>
                                    <Link to='/manager/product_line/edit' state={{productLine : productLine}}>
                                        <button className={style.actionButton}>Sửa</button>
                                    </Link>
                                    <button className={style.actionButton} 
                                        onClick={(e) => sendDeleteProductLineRequest(productLine.id)}>Xóa</button>
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