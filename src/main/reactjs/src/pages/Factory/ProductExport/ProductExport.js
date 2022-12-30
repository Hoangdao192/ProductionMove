import style from './ProductExport.module.scss';
import config from '../../../config.json';
import Authentication from '../../../services/Authentication/Authentication';
import { toast } from 'react-toastify';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import { useState } from 'react';
import { useReducer } from 'react';
import { useEffect } from 'react';
import ServerAPI from '../../../services/ServerAPI';
import ProductStatus from '../../Data/ProductStatus'

export default function ProductExport() {
    const [distributors, setDistributor] = useState([]);
    const [reducer, forceUpdate] = useReducer(x => x + 1, 0);

    const [exportDistributor, setExportDistributor] = useState(-1)
    const [exportProducts, setExportProducts] = useState([])
    const [products, setProducts] = useState([]);
    
    const [selectedProducts, setSelectedProducts] = useState(new Map());

    const [factory, setFactory] = useState();
    const user = Authentication.getCurrentUser();
    
    function resetComponent() {
        setDistributor([])
        setExportDistributor(-1)
        setExportProducts([])
        setProducts([])
        setSelectedProducts(new Map())
        forceUpdate()
    }

    function validation() {
        if (exportDistributor == -1) {
            toast.error("Bạn chưa chọn đại lý nhận hàng.")
            return false;
        }
        if (exportProducts.length == 0) {
            toast.error("Bạn chưa chọn sản phẩm xuất đi.")
            return false;
        }
        return true;
    }

    function sendExportRequest() {
        if (validation()) {
            let url = config.server.api.factory.stock.product.export.url;
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': Authentication.generateAuthorizationHeader()
                },
                body: JSON.stringify({
                    factoryId: factory.id,
                    distributorId: exportDistributor,
                    productIds: exportProducts.map((product) => {return product.id})
                })
            }).then((response) => {
                if (response.status == 200) {
                    toast.success("Xuất hàng thành công.")
                    resetComponent()
                } else {
                    toast.error("Xuất hàng thất bại.")
                }
            })
        }
    }

    function loadDistributors() {
        let url = config.server.api.distributor.list.url;
        fetch(url, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        })
        .then((response) => {
            if (response.status == 200) {
                return response.json()
            }
        }).then((data) => {
            if (data != undefined) {
                setDistributor(data)
            }
        })
    }

    function loadProductInStock(factoryId) {
        let url = config.server.api.factory.stock.product.list.exportAble.url;
        fetch(`${url}?factoryId=${factoryId}`, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        })
        .then((response) => {
            if (response.status == 200) {
                return response.json();
            } else toast.error("Không thể tải dữ liệu sản phẩm");
        }).then((data) => {
            if (data != undefined) setProducts(data)
        })
    }

    function selectProduct(product) {
        if (!selectedProducts.has(product.id)) {
            let newSelectedProducts = new Map();
            selectedProducts.forEach((value, key) => {
                newSelectedProducts.set(key, value);
            })

            newSelectedProducts.set(product.id, product)
            setSelectedProducts(newSelectedProducts)
            setExportProducts([...exportProducts, product]);
        }
    }

    function unSelectProduct(deleteProduct) {
        let newSelectedProducts = new Map();
        selectedProducts.forEach((value, key) => {
            newSelectedProducts.set(key, value);
        })
        newSelectedProducts.delete(deleteProduct.id)
        setSelectedProducts(newSelectedProducts)

        let newExportProducts = [];
        exportProducts.forEach((product) => {
            if (product.id != deleteProduct.id) {
                newExportProducts.push(product);
            }
        })
        setExportProducts(newExportProducts)
    }

    useEffect(() => {
        ServerAPI.getFactoryByUnitId(user.unit.id)
            .then((factory) => {
                setFactory(factory)    
                loadDistributors();
                loadProductInStock(factory.id);
            })
    }, [reducer])
    
    function formatDate(date) {
        let [year, month, day] = date.split("-")
        return day + " - " + month + " - " + year;
    }

    return (
        <div className={style.container}>
            <p className={style.title}>
                Xuất kho
            </p>

            <button onClick={(e) => sendExportRequest()} className={style.exportButton}>Xuất hàng</button>

            <label htmlFor="" className={style.label}>
                Đại lý nhận hàng
            </label>
            <select value={exportDistributor} className={style.select} name="" id=""
                onChange={(e) => setExportDistributor(parseInt(e.target.value))}>
                <option value={-1} key={-1}>
                    - Chưa chọn -
                </option>
                {
                    distributors.map((distributor, index) => {
                        return (
                            <option value={distributor.id} key={index}>
                                {distributor.name}
                            </option>
                        )
                    })
                }
            </select>
            <label htmlFor="" className={style.label + " " + style.exportLabel}>
                Danh sách lô hàng sẽ xuất đi
            </label>
            <div>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">STT</TableCell>
                            <TableCell align="center">Mã sản phẩm</TableCell>
                            <TableCell align="center">Mã dòng sản phẩm</TableCell>
                            <TableCell align="center">Tên sản phẩm</TableCell>
                            <TableCell align="center">Ngày sản xuất</TableCell>
                            <TableCell align="center">Trạng thái</TableCell>
                            <TableCell align="center">Tùy chọn</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {exportProducts.length > 0 ? exportProducts.map((product, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="center">{index}</TableCell>
                                <TableCell align="center">{product.id}</TableCell>
                                <TableCell align="center">{product.productLine.id}</TableCell>
                                <TableCell align="center">{product.productLine.productName}</TableCell>
                                <TableCell align="center">{product.batch.manufacturingDate}</TableCell>
                                <TableCell align="center">{ProductStatus[product.status]}</TableCell>
                                <TableCell align="center">
                                    <div className={style.action}>
                                        <button onClick={(e) => unSelectProduct(product)}>
                                            Xóa
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )) : <TableRow><TableCell align="center" colSpan={7}>Chưa có lô hàng nào</TableCell></TableRow>
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <label htmlFor="" className={style.label + " " + style.exportLabel}>
                Danh sách sản phẩm trong kho
            </label>
            <div>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">STT</TableCell>
                            <TableCell align="center">Mã sản phẩm</TableCell>
                            <TableCell align="center">Mã dòng sản phẩm</TableCell>
                            <TableCell align="center">Tên sản phẩm</TableCell>
                            <TableCell align="center">Ngày sản xuất</TableCell>
                            <TableCell align="center">Trạng thái</TableCell>
                            <TableCell align="center">Tùy chọn</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {products.length > 0 ? products.map((product, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="center">{index}</TableCell>
                                <TableCell align="center">{product.id}</TableCell>
                                <TableCell align="center">{product.productLine.id}</TableCell>
                                <TableCell align="center">{product.productLine.productName}</TableCell>
                                <TableCell align="center">{product.batch.manufacturingDate}</TableCell>
                                <TableCell align="center">{ProductStatus[product.status]}</TableCell>
                                <TableCell align="center">
                                    <div className={style.action}>
                                        <button className={style.button} disabled={selectedProducts.has(product.id) ? true : false}  
                                            onClick={(e) => selectProduct(product)}>
                                            Chọn
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )) : <TableRow><TableCell align="center" colSpan={7}>Chưa có lô hàng nào</TableCell></TableRow>
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}