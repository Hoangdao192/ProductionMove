import style from "./ListWarranty.module.scss";
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, 
    Box, Tab, Tabs, TabPanel, Typography  } from "@mui/material";
import config from '../../../../config.json';
import Authentication from "../../../../services/Authentication/Authentication";
import { useReducer } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function ShowWarrantyForm() {
    const [productWarrantyList, setProductWarrantyList] = useState([]);
    const [doingWarrantyList, setDoingWarrantyList] = useState([]);
    const [finishWarrantyList, setFinishWarrantyList] = useState([]);

    const [reducer, forceUpdate] = useReducer(x => x + 1, 0);
    const [warrantyCenter, setWarrantyCenter] = useState({});
    const user = Authentication.getCurrentUser();
    const [endWarrantyDate, setEndWarrantyDate] = useState("");

    const [page, setPage] = useState(0);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    function resetComponent() {
        setProductWarrantyList([]);
        setWarrantyCenter({});
    }

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

    function loadWarrantyList(warrantyCenterId) {
        let url = config.server.api.warranty.warranty.request.list.url + "?warrantyCenterId=" + warrantyCenterId;
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

    function loadDoingWarrantyList(warrantyCenterId) {
        let url = config.server.api.warranty.warranty.doing.url + "?warrantyCenterId=" + warrantyCenterId;
        fetch(url, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            }
        }).then((data) => {
            if (data != undefined) setDoingWarrantyList(data)
        })
    }

    useEffect(() => {
        loadWarrantyCenter().then((warrantyCenter) => {
            loadWarrantyList(warrantyCenter.id);
            loadDoingWarrantyList(warrantyCenter.id);
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
                        <Tab label="Yêu cầu bảo hành" value="0"/>
                        <Tab label="Đang bảo hành" value="1"/>
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
            </div>
        )
    }

    function ProductWarrantyRequestTable() {
        return (
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
                                    <TableCell align="center">Đại lý yêu cầu</TableCell>
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
                                        <TableCell align="center">{productWarranty.requestWarrantyDistributor.name}</TableCell>
                                        <TableCell align="center">
                                            <div className={style.action}>
                                                <button onClick={(e) => sendAcceptWarrantyRequest(productWarranty.id)}
                                                style={{whiteSpace: 'nowrap'}} className={style.editButton}>Xác nhận</button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            }) : <TableRow><TableCell colSpan={8} align="center">Không có đơn bảo hành nào</TableCell></TableRow>
                            }
                            </TableBody>
                        </Table>
        )
    }

    function DoingWarrantyTable() {
        return (
            <div>
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
                            <TableCell align="center">Đại lý yêu cầu</TableCell>
                            <TableCell align="center">Tùy chọn</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {   doingWarrantyList.length > 0 ? doingWarrantyList.map((productWarranty, index) => {
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
                                <TableCell align="center">{productWarranty.requestWarrantyDistributor.name}</TableCell>
                                <TableCell align="center">
                                    <div className={style.action}>
                                        <button onClick={(e) => setOpen(true)}
                                            style={{whiteSpace: 'nowrap'}} className={style.editButton}>
                                            Bảo hành xong
                                        </button>
                                        <Dialog open={open} onClose={handleClose}>
                                                <DialogTitle>Nhập ngày kết thúc bảo hành</DialogTitle>
                                                <DialogContent>
                                                <input value={endWarrantyDate} onChange={(e) => setEndWarrantyDate(e.target.value)}
                                                    type="date" className={style.input} placeholder="Nhập ngày kết thúc bảo hành" />
                                                </DialogContent>
                                                <DialogActions>
                                                <Button onClick={(e) => setOpen(false)}>Hủy</Button>
                                                <Button onClick={(e) => onDialogAccept(
                                                    productWarranty.id
                                                )}>Đồng ý</Button>
                                                </DialogActions>
                                            </Dialog>
                                        <Link to="/warranty/warranty/return" state={{productWarranty: productWarranty}}>
                                            <button
                                                style={{whiteSpace: 'nowrap'}} className={style.editButton}>
                                                Lỗi không thể bảo hành
                                            </button>
                                            
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    }) : <TableRow><TableCell colSpan={8} align="center">Không có đơn bảo hành nào</TableCell></TableRow>
                    }
                    </TableBody>
                </Table>
                
            </div>
        )
    }

    function sendFinishWarrantyRequest(productWarrantyId, endWarrantyDate) {
        
        // handleClickOpen()
        // return;
        let url = config.server.api.warranty.warranty.finish.url;
        let formData = new FormData();
        formData.append("productWarrantyId", productWarrantyId);
        formData.append("endWarrantyDate", endWarrantyDate);
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
            } else {
                toast.error("Không thành công")
            }
        })
    }

    function sendAcceptWarrantyRequest(productWarrantyId) {
        let url = config.server.api.warranty.warranty.accept.url;
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
                toast.success("Đã xác nhận bảo hành")
                forceUpdate()
            } else {
                toast.error("Không thành công")
            }
        })
    }

    function onDialogAccept(productWarrantyId) {
        if (endWarrantyDate == undefined || endWarrantyDate == "") {
            toast.error("Bạn chưa nhập ngày kết thúc bảo hành.")
            return;
        }
        setOpen(false);
        sendFinishWarrantyRequest(productWarrantyId, endWarrantyDate);
    }

	return (
		<div className={style.ShowWarrantyForm}>
			<p className={style.title}>Danh sách đơn bảo hành</p>
            
            <TabLayout/>
            {
                page == 0 ? <ProductWarrantyRequestTable/> : 
                page == 1 ? <DoingWarrantyTable/> : <></>
            }
		</div>
	);
}

export default ShowWarrantyForm;
