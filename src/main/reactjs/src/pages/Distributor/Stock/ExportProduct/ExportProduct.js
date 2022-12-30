import style from './ExportProduct.module.scss';
import config from '../../../../config.json';
import Authentication from '../../../../services/Authentication/Authentication';
import { toast } from 'react-toastify';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import { useState } from 'react';
import { useReducer } from 'react';
import { useEffect } from 'react';
import ServerAPI from '../../../../services/ServerAPI';
import productStatus from '../../../Data/ProductStatus'

export default function ExportProduct() {
    const [exportType, setExportType] = useState("Error")
    const [factories, setFactories] = useState([]);
    const [reducer, forceUpdate] = useReducer(x => x + 1, 0);

    const [exportFactory, setExportFactory] = useState(-1)
    const [exportProducts, setExportProducts] = useState([])
    const [products, setProducts] = useState([]);
    
    const [selectedProducts, setSelectedProducts] = useState(new Map());

    const [distributor, setDistributor] = useState();
    const user = Authentication.getCurrentUser();
    
    function resetComponent() {
        setDistributor([])
        setExportFactory(-1)
        setExportProducts([])
        setProducts([])
        setSelectedProducts(new Map())
        forceUpdate()
    }

    function validation() {
        if (exportFactory == -1) {
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
            let url = config.server.api.distributor.stock.export.url;
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': Authentication.generateAuthorizationHeader()
                },
                body: JSON.stringify({
                    factoryId: exportFactory,
                    distributorId: distributor.id,
                    productIds: exportProducts.map((product) => {return product.id}),
                    exportType: "Error"
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

    function loadFactories() {
        let url = config.server.api.factory.list.url;
        fetch(url, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        })
        .then((response) => {
            if (response.status == 200) {
                return response.json()
            } else toast.error("Không thể tải dữ liệu cơ sở sản xuất")
        }).then((data) => {
            if (data != undefined) {
                setFactories(data)
            }
        })
    }

    function loadProductInStock(distributorId) {
        let url = config.server.api.distributor.stock.product.list.sellable.url;
        fetch(`${url}?distributorId=${distributorId}`, {
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
        ServerAPI.getDistributorByUnitId(user.unit.id)
            .then((distributor) => {
                setDistributor(distributor)
                loadFactories();
                loadProductInStock(distributor.id)
            })
    }, [reducer])
    
    function formatDate(date) {
        let [year, month, day] = date.split("-")
        return day + " - " + month + " - " + year;
    }

    return (
        <div className={style.container}>
            <p className={style.title}>
                Trả sản phẩm không bán được
            </p>

            <button onClick={(e) => sendExportRequest()} className={style.exportButton}>Xuất hàng</button>

            <label htmlFor="" className={style.label}>
                Cơ sở sản xuất nhận hàng
            </label>
            <select value={exportFactory} className={style.select} name="" id=""
                onChange={(e) => setExportFactory(parseInt(e.target.value))}>
                <option value={-1} key={-1}>
                    - Chưa chọn -
                </option>
                {
                    factories.map((distributor, index) => {
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
                                <TableCell align="center">{productStatus[product.status]}</TableCell>
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
                                <TableCell align="center">{productStatus[product.status]}</TableCell>
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