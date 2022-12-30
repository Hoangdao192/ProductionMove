import style from "./ListWarranty.module.scss";
import React, { useEffect, useState } from "react";
import { 
    Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper,
    Box, Tab, Tabs, TabPanel, Typography} from "@mui/material";
import config from '../../../../config.json';
import Authentication from "../../../../services/Authentication/Authentication";
import { useReducer } from "react";
import { toast } from "react-toastify";

let status = [];
status['Waiting'] = "Đang chờ bảo hành";
status['Doing'] = "Đang được bảo hành";
status['Done'] = "Đã bảo hành xong";
status['Returned'] = "Đã trả lại khách hàng";
status['Cannot warranty'] = "Lỗi cần trả về nhà máy";
status['Error returned warranty'] = "Lỗi đã trả về nhà máy";

function ShowWarrantyForm() {
    const [productWarrantyList, setProductWarrantyList] = useState([]);
    const [warrantyFinishList, setWarrantyFinishList] = useState([]);
    const [reducer, forceUpdate] = useReducer(x => x + 1, 0);
    const [distributor, setDistributor] = useState();
    const user = Authentication.getCurrentUser();

    const [page, setPage] = useState(0);

    function resetComponent() {
        setProductWarrantyList([]);
        setWarrantyFinishList([]);
        setDistributor();
        forceUpdate();
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

    function loadFinishedWarrantyList(distributorId) {
        let url = config.server.api.distributor.warranty.finish.url + "?distributorId=" + distributorId;
        fetch(url, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            }
        }).then((data) => {
            if (data != undefined) setWarrantyFinishList(data)
        })
    }

    function sendReturnProductCustomerRequest(productWarrantyId) {
        let url = config.server.api.distributor.warranty.return.url;
        let formData = new FormData();
        formData.append("productWarrantyId", productWarrantyId);
        fetch(url, {
            method: "POST",
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            },
            body: formData
        }).then((response) => {
            if (response.status == 200) {
                toast.success("Thành công")
                forceUpdate()
            } else toast.error("Không thành công")
        })
    }

    function sendReturnProductFactoryRequest(productWarrantyId) {
        let url = config.server.api.factory.stock.product.errorReturn.url;
        let formData = new FormData();
        formData.append("productWarrantyId", productWarrantyId);
        fetch(url, {
            method: "POST",
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            },
            body: formData
        }).then((response) => {
            if (response.status == 200) {
                toast.success("Thành công")
                forceUpdate()
            } else toast.error("Không thành công")
        })
    }

    useEffect(() => {
        loadDistributor().then((distributor) => {
            loadWarrantyList(distributor.id);
            loadFinishedWarrantyList(distributor.id);
        })
    }, [reducer])

    function formatDate(date) {
        let [year, month, day] = date.split("-")
        return day + " - " + month + " - " + year;
    }

    function TabLayout() {
        return (
            <div>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs sx={{color: 'black', '& button': {color: 'black'}}} 
                        onChange={(e, value) => setPage(parseInt(value))} 
                        value={page.toString()} aria-label="basic tabs example">
                        <Tab label="Đang bảo hành" value="0"/>
                        <Tab label="Đã hoàn tất bảo hành" value="1"/>
                    </Tabs>
                </Box>
                <div style={{
                    display: 'none'
                }} value="0" index={0}>
                    Item One
                </div>
                <div style={{
                    display: 'none'
                }} value="1" index={1}>
                    Item Two
                </div>
                <div style={{
                    display: 'none'
                }} value="2" index={2}>
                    Item Three
                </div>
            </div>
        )
    }

    function UnderWarrantyTable() {
        return (
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
                            {   productWarranty.status == "Done" ?
                                <TableCell align="center">
                                    <div className={style.action}>
                                        <button onClick={(e) => sendReturnProductCustomerRequest(productWarranty.id)} 
                                        className={style.editButton}>Trả lại khách hàng</button>
                                    </div>
                                </TableCell> : 
                                productWarranty.status == "Cannot warranty" ?
                                <TableCell align="center">
                                    <div className={style.action}>
                                        <button onClick={(e) => sendReturnProductFactoryRequest(productWarranty.id)} 
                                        className={style.editButton}>Trả lại nhà máy</button>
                                    </div>
                                </TableCell> : <></>
                            }
                        </TableRow>
                    )
                }) : <TableRow><TableCell colSpan={8} align="center">Không có đơn bảo hành nào</TableCell></TableRow>
                }
                </TableBody>
            </Table>
        </TableContainer>
        )}

    function FinishWarrantyTable() {
        return (
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {   warrantyFinishList.length > 0 ? warrantyFinishList.map((productWarranty, index) => {
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
                            </TableRow>
                        )
                    }) : <TableRow><TableCell colSpan={8} align="center">Không có đơn bảo hành nào</TableCell></TableRow>
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
	return (
		<div className={style.ShowWarrantyForm}>
			<p className={style.title}>Danh sách bảo hành</p>
            <TabLayout/>
            {
                page == 0 ? <UnderWarrantyTable/> : <FinishWarrantyTable/>
            }
		</div>
	);
}

export default ShowWarrantyForm;
