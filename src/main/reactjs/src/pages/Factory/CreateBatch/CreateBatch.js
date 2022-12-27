import style from './CreateBatch.module.scss'
import config from '../../../config.json'
import { useReducer } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { UilPlus } from '@iconscout/react-unicons'

export default function CreateBatch() {
    const [reducer, setReducer] = useReducer(x => x + 1, 0)
    const [productLines, setProductLines] = useState([]);
    const [productBatch, setProductBatch] = useState({
        productLineId: "None",
        factoryId: 35,
        manufactureDate: "",
        productQuantity: "",
        warrantyPeriod: ""
    });

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

    function validation() {
        console.log(productBatch)

        if (productBatch.productLineId == "None") {
            alert("empty field")
            return false;
        }

        if (productBatch.manufactureDate == "") {
            alert("empty field")
            return false;
        }

        if (productBatch.productQuantity == "") {
            alert("empty field")
            return false;
        }

        if (productBatch.productQuantity < 1 || productBatch.productQuantity > 100) {
            alert("too big")
            return false;
        }

        if (productBatch.warrantyPeriod == "") {
            alert("empty");
            return false;
        }

        if (productBatch.warrantyPeriod < 1 || productBatch.warrantyPeriod > 1000) {
            alert("Invalid");
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
                    "Content-Type": "application/json"
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
                    alert("OK")
                    resetComponent()
                } else response.text()
            }).then((data) => {
                if (data != undefined) console.log(data)
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