import style from "./ListWarranty.module.scss";
import React, { useEffect, useState } from "react";
import { 
    Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper} from "@mui/material";
import config from '../../../../config.json';
import Authentication from "../../../../services/Authentication/Authentication";

let status = [];
status['Waiting'] = "Đang chờ bảo hành";
status['Doing'] = "Đang được bảo hành";
status['Done'] = "Đã bảo hành xong";

function ShowWarrantyForm() {
    const [productWarrantyList, setProductWarrantyList] = useState([]);

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

    function loadWarrantyList(distributorId) {
        let url = config.server.api.distributor.warranty.list.url + "?distributorId=" + distributorId;
        fetch(url, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            }
        }).then((data) => {
            if (data != undefined) setProductWarrantyList(data)
        })
    }

    useEffect(() => {
        loadDistributor().then((distributor) => {
            loadWarrantyList(distributor.id);
        })
    }, [])

    function formatDate(date) {
        let [year, month, day] = date.split("-")
        return day + " - " + month + " - " + year;
    }


	return (
		<div className={style.ShowWarrantyForm}>
			<p className={style.title}>Danh sách đơn bảo hành</p>
            <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">STT</TableCell>
                        <TableCell align="center">Mã đơn bảo hành</TableCell>
                        <TableCell align="center">Mã khách hàng</TableCell>
                        <TableCell align="center">Tên khách hàng</TableCell>
                        <TableCell align="center">Mã sản phẩm</TableCell>
                        <TableCell align="center">Tên sản phẩm</TableCell>
                        <TableCell align="center">Ngày bảo hành</TableCell>
                        <TableCell align="center">Trạng thái</TableCell>
                        <TableCell align="center">Tùy chọn</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {   productWarrantyList.length > 0 ? productWarrantyList.map((productWarranty, index) => {
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
                                <span style={{whiteSpace: 'nowrap'}}>{formatDate(productWarranty.startWarrantyDate)}</span>
                            </TableCell>
                            <TableCell align="center">{status[productWarranty.status]}</TableCell>
                            <TableCell align="center">
                                <div className={style.action}>
                                    <button className={style.editButton}>Sửa</button>
                                    <button className={style.deleteButton}>Xóa</button>
                                </div>
                            </TableCell>
                        </TableRow>
                    )
                }) : <TableRow><TableCell colSpan={8} align="center">Không có đơn bảo hành nào</TableCell></TableRow>
                }
                </TableBody>
            </Table></TableContainer>
		</div>
	);
}

export default ShowWarrantyForm;
