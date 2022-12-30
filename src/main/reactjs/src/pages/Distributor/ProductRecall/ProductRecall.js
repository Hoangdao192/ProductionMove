import style from './ProductRecall.module.scss';
import config from '../../../config.json';
import Authentication from '../../../services/Authentication/Authentication';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useReducer } from 'react';
import { toast } from 'react-toastify';

export default function ProductRecall() {
    const [productLines, setProductLines] = useState([]);
    const [selectedProductLine, setSelectedProductLine] = useState("-1");

    const [productRecallList, setProductRecallList] = useState([])
    const [warrantyCenterList, setWarrantyCenterList] = useState([]);
    const [warrantyCenter, setWarrantyCenter] = useState("-1");

    const [distributor, setDistributor] = useState();
    const user = Authentication.getCurrentUser();
    const [reducer, forceUpdate] = useReducer(x => x + 1, 0);
    
    function resetComponent() {
        setProductLines([]);
        setSelectedProductLine("-1");
        setProductRecallList([])
        setWarrantyCenterList([]);
        setWarrantyCenter("-1");
        setDistributor();
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
                }
            }).then((distributor) => {
                if (distributor != undefined) {
                    resolve(distributor);
                }
            })
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
            if (data != undefined) setProductLines(data)
        })
    }

    function loadCustomerProduct(productLineId) {
        if (productLineId == "-1") {
            setProductRecallList([])
            return;
        }

        let url = config.server.api.distributor.productRecall.url;
        url += "?distributorId=" + distributor.id + "&productLineId=" + productLineId;
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
            if (data != undefined) setProductRecallList(data)
        })
    }

    function loadWarrantyCenterList() {
        let url = config.server.api.warranty.list.url;
        fetch(url, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            }
        }).then((data) => {
            if (data != undefined) {
                setWarrantyCenterList(data)
            }
        })
    }

    function validation() {
        if (selectedProductLine == "-1") {
            alert("Bạn chưa chọn dòng sản phẩm");
            return false;
        }
        if (warrantyCenter == "-1") {
            alert("Bạn chưa chọn đại lý");
            return false;
        }
        return true;
    }

    function sendRecallRequest() {
        if (!validation()) return;

        let url = config.server.api.distributor.productRecall.url;
        let formData = new FormData();
        formData.append("distributorId", distributor.id);
        formData.append("warrantyCenterId", warrantyCenter);
        formData.append("productLineId", selectedProductLine);
        fetch(url, {
            method: "POST",
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            },
            body: formData
        }).then((response) => {
            if (response.status == 200) {
                resetComponent();
                toast.success("Thành công")
            } else toast.error("Không thành công")
        })
    }

    useEffect(() => {
        loadDistributor().then((distributor) => {
            setDistributor(distributor);
            loadProductLine();
            loadWarrantyCenterList();
        })
    }, [reducer]);

    return (
        <div className={style.container}>
            <p className={style.title}>
                Triệu hồi sản phẩm
            </p>
            <div>
                <label className={style.label} htmlFor="">Chọn dòng sản phẩm cần triệu hồi</label>
                <select value={selectedProductLine} name="" id="" onChange={(e) => {
                        loadCustomerProduct(e.target.value)
                        setSelectedProductLine(e.target.value)}}>
                    <option value="-1">- Chưa chọn -</option>
                    {
                        productLines.map((productLine, index) => {
                            return (
                                <option value={productLine.id}>{productLine.productName}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <label className={style.label} htmlFor="">Chọn trung tâm bảo hành</label>
                <select value={warrantyCenter} name="" id="" onChange={(e) => {
                        setWarrantyCenter(e.target.value)}}>
                    <option value="-1">- Chưa chọn -</option>
                    {
                        warrantyCenterList.map((warrantyCenter, index) => {
                            return (
                                <option value={warrantyCenter.id}>{warrantyCenter.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <h4 style={{ marginTop: '1rem' }}>Danh sách sản phẩm cần triệu hồi</h4>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">STT</TableCell>
                            <TableCell align="center">Mã sản phẩm</TableCell>
                            <TableCell align="center">Tên sản phẩm</TableCell>
                            <TableCell align="center">Mã khách hàng</TableCell>
                            <TableCell align="center">Tên khách hàng</TableCell>
                            <TableCell align="center">Ngày kích hoạt</TableCell>
                            {/* <TableCell align="center">Tùy chọn</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productRecallList.map((customerProduct, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{index}</TableCell>
                                <TableCell align="center">{customerProduct.product.id}</TableCell>
                                <TableCell align="center">{customerProduct.product.productLine.productName}</TableCell>
                                <TableCell align="center">{customerProduct.customer.id}</TableCell>
                                <TableCell align="center">{customerProduct.customer.firstName + " " + 
                                    customerProduct.customer.lastName}</TableCell>
                                <TableCell align="center">{customerProduct.activationDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <button onClick={(e) => sendRecallRequest()} className={style.actionButton}>Triệu hồi</button>
        </div>
    )
}