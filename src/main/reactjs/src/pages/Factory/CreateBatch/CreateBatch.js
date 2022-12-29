import style from './CreateBatch.module.scss'
import config from '../../../config.json'
import { useReducer } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { UilPlus } from '@iconscout/react-unicons'
import Authentication from '../../../services/Authentication/Authentication';
import Validator from '../../../services/validator/Validator';
import { toast } from 'react-toastify';

export default function CreateBatch() {
    const [reducer, setReducer] = useReducer(x => x + 1, 0)
    const [productLines, setProductLines] = useState([]);
    const [productBatch, setProductBatch] = useState({
        productLineId: "None",
        factoryId: "",
        manufactureDate: "",
        productQuantity: "",
        warrantyPeriod: ""
    });

    const [factory, setFactory] = useState();
    const user = Authentication.getCurrentUser();

    function loadFactory() {
        return new Promise((resolve, reject) => {
            let url = config.server.api.factory.get.url + "?unitId=" + user.unit.id;
            fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': Authentication.generateAuthorizationHeader()
                }
            }).then((response) => {
                if (response.status == 200) {
                    return response.json()
                }
            }).then((factory) => {
                if (factory != undefined) {
                    resolve(factory);
                }
            })
        })
    }

    useEffect(() => {
        loadFactory().then((factory) => {
            setFactory(factory)
            setProductBatch({
                ...productBatch,
                factoryId: factory.id
            })
            let url = config.server.api.productLine.list.url;
            fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': Authentication.generateAuthorizationHeader()
                }
            })
            .then((response) => {
                if (response.status == 200) {
                    return response.json()
                }
            }).then((data) => {
                if (data != undefined) setProductLines(data)
            })
        })
    }, [reducer])

    function validation() {
        console.log(productBatch)

        if (Validator.isEmpty(productBatch.productLineId)) {
            toast.error("Bạn chưa chọn dòng sản phẩm")
            return false;
        }

        if (Validator.isEmpty(productBatch.manufactureDate)) {
            toast.error("Bạn chưa chọn ngày sản xuất")
            return false;
        }

        if (Validator.isEmpty(productBatch.warrantyPeriod)) {
            toast.error("Bạn chưa nhập thời gian bảo hành");
            return false;
        }
        if (productBatch.warrantyPeriod < 1 || productBatch.warrantyPeriod > 1000) {
            toast.error("Thời gian bảo hành nằm trong khoảng 1 - 1000");
            return false;
        }

        if (Validator.isEmpty(productBatch.productQuantity)) {
            toast.error("Bạn chưa nhập số lượng sản phẩm")
            return false;
        }
        if (productBatch.productQuantity < 1 || productBatch.productQuantity > 100) {
            toast.error("Số lượng sản phẩm nằm trong khoảng 1 - 100")
            return false;
        }
      
        return true;
    }

    function resetComponent() {
        setProductBatch({
            productLineId: "None",
            factoryId: 35,
            manufactureDate: "",
            productQuantity: "",
            warrantyPeriod: ""
        });
        setReducer()
    }

    function onCreateBatchClick() {
        if (validation()) {
            let url = config.server.api.productBatch.create.url;
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': Authentication.generateAuthorizationHeader()
                },
                body: JSON.stringify({
                    productLineId: productBatch.productLineId,
                    factoryId: productBatch.factoryId,
                    manufacturingDate: productBatch.manufactureDate,
                    productQuantity: productBatch.productQuantity,
                    warrantyPeriod: productBatch.warrantyPeriod
                })
            }).then((response) => {
                if (response.status == 200) {
                    toast.success("Tạo lô sản phẩm thành công")
                    resetComponent()
                } else toast.error("Tạo lô sản phẩm không thành công")
            })
        }
    }

    return (
        <div className={style.container}>
            <p className={style.title}>
                Tạo lô sản phẩm
            </p>
            <div className={style.form}>
                <label htmlFor="" className={style.label}>
                    Chọn dòng sản phẩm
                </label>
                <select name="" id="" className={style.select}
                    value={productBatch.productLineId}
                    onChange={(e) => setProductBatch({
                        ...productBatch,
                        productLineId: parseInt(e.target.value)
                    })}>
                    <option value="None"> - Chưa chọn - </option>
                    {
                        productLines.map((productLine) => {
                            return (
                                <option value={productLine.id}>{productLine.productName}</option>
                            )
                        })
                        
                    }
                </select>
                <label htmlFor="" className={style.label}>
                    Nhập ngày sản xuất
                </label>
                <input type="date"  className={style.input} placeholder="Nhập ngày sản xuất"
                    value={productBatch.manufactureDate}
                    onChange={(e) => setProductBatch({
                        ...productBatch,
                        manufactureDate: e.target.value                   
                    })}
                />

                <label htmlFor="" className={style.label}>
                    Thời gian bảo hành (Theo tháng)
                </label>
                <input type="number"  className={style.input} placeholder="Nhập thời gian bảo hành"
                    value={productBatch.warrantyPeriod}
                    onChange={(e) => setProductBatch({
                        ...productBatch,
                        warrantyPeriod: e.target.value                   
                    })}
                />

                <label htmlFor="" className={style.label}>
                    Nhập số lượng sản phẩm
                </label>
                <input type="number"  className={style.input} placeholder="Nhập số lượng sản phẩm"
                    value={productBatch.productQuantity}
                    onChange={(e) => setProductBatch({
                        ...productBatch,
                        productQuantity: parseInt(e.target.value)
                    })}
                />
                <button onClick={(e) => onCreateBatchClick()} className={style.actionButton}>
                    <UilPlus className={style.icon}/>
                    <span>Tạo mới</span>
                </button>
            </div>
        </div>
    )
}