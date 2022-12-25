import { useEffect } from 'react';
import { useState } from 'react';
import style from './ListProductLine.module.scss';
import config from '../../../../config.json';
import { useReducer } from 'react';
import { Link } from 'react-router-dom';

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

export default function ListProductLine() {
    const [productLines, setProductLines] = useState([])
    const [reducer, forceUpdate] = useReducer(x => x + 1, 0)


    useEffect(() => {
        let url = config.server.api.productLine.list.url;
        fetch(url)
        .then((response) => {
            if (response.status == 200) {
                return response.json()
            }
        }).then((data) => {
            if (data != undefined) setProductLines(data)
        })
    }, [reducer])

    function sendDeleteProductLineRequest(productLineId) {
        let url = `${config.server.api.productLine.delete.url}/${productLineId}`;
        fetch(url, {
            method: "DELETE"
        }).then((response) => {
            if (response.status == 200) {
                alert("OK")
                forceUpdate()
            }
            else response.text()
        }).then((data) => {
            console.log(data)
        })
    }

    return (
        <div className={style.showProductLine}>
            <p className={style.title}>Danh sách dòng sản phẩm</p>
            
            <TableContainer component={Paper}>
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
                                    <button className={style.actionButton}>Sửa</button>
                                    <button className={style.actionButton} 
                                        onClick={(e) => sendDeleteProductLineRequest(productLine.id)}>Xóa</button>
                                </div>
                                </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <table className={style.table}>
                <thead>
                    <tr>
                        <td>STT</td>
                        <td>Mã dòng sản phẩm</td>
                        <td>Tên dòng sản phẩm</td>
                        <td>Tùy chọn</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        productLines.map((productLine, index) => {
                            return (
                                <tr>
                                    <td>{index}</td>
                                    <td>{productLine.id}</td>
                                    <td>{productLine.productName}</td>
                                    <td className={style.action}>
                                        <Link to={'/manager/product_line/show'} state={{productLine: productLine}}>
                                            <button>Xem chi tiết</button>
                                        </Link>
                                        <button>Sửa</button>
                                        <button onClick={(e) => sendDeleteProductLineRequest(productLine.id)}>Xóa</button>
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