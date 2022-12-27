import style from './CreateProductLine.module.scss'
import { UilPlus } from '@iconscout/react-unicons'
import { useState } from 'react'
import config from '../../../../config.json';
import Authentication from '../../../../services/Authentication/Authentication';

export default function CreateProductLine() {
    const [productLine, setProductLine] = useState({
        productName: "",
        audioAndSpeaker: "",
        battery: "",
        camera: "",
        display: "",
        hardDrive: "",
        memory: "",
        operatingSystem: "",
        processor: "",
        videoCard: "",
        wireless: ""
    })

    function resetComponent() {
        setProductLine({
            productName: "",
            audioAndSpeaker: "",
            battery: "",
            camera: "",
            display: "",
            hardDrive: "",
            memory: "",
            operatingSystem: "",
            processor: "",
            videoCard: "",
            wireless: ""
        })
    }

    function validation() {
        if (productLine.productName == "") {
            alert("empty field")
            return false;
        }
        if (productLine.audioAndSpeaker == "") {
            alert("empty field")
            return false;
        }
        if (productLine.battery == "") {
            alert("empty field")
            return false;
        }
        if (productLine.camera == "") {
            alert("empty field")
            return false;
        }
        if (productLine.display == "") {
            alert("empty field")
            return false;
        }
        if (productLine.hardDrive == "") {
            alert("empty field")
            return false;
        }
        if (productLine.memory == "") {
            alert("empty field")
            return false;
        }
        if (productLine.operatingSystem == "") {
            alert("empty field")
            return false;
        }
        if (productLine.processor == "") {
            alert("empty field")
            return false;
        }
        if (productLine.videoCard == "") {
            alert("empty field")
            return false;
        }
        if (productLine.wireless == "") {
            alert("empty field")
            return false;
        }
        return true;
    }

    function sendCreateProductLineRequest() {
        let url = config.server.api.productLine.create.url;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': Authentication.generateAuthorizationHeader()
            },
            body: JSON.stringify(productLine)
        }).then((response) => {
            if (response.status == 200) {
                alert("OK")
                resetComponent()
            } else requestErrorHandle(response)
        })
    }

    async function requestErrorHandle(response) {
        let text = await response.text();
        alert(text);
    }

    function onSubmitButtonClick() {
        if (validation()) {
            sendCreateProductLineRequest();
        }
    }

    return (
        <div className={style.createProductLine}>
            <p className={style.title}>
                Tạo dòng sản phẩm mới
            </p>
            <div className={style.form}>
                <label htmlFor="" className={style.label}>Tên dòng sản phẩm</label>
                <input placeholder='Nhập tên dòng sản phẩm' type="text" 
                        value={productLine.productName} onChange={(e) => {
                            setProductLine({
                                ...productLine,
                                productName: e.target.value
                            })
                        }} className={style.input}/>

                <p className={style.secondTitle}>Thông số dòng sản phẩm</p>
                <div className={style.productLineInfo}>
                    <div>
                        <label htmlFor="" className={style.label}>Loa</label>
                        <input placeholder='Nhập thông số loa' type="text" 
                            value={productLine.audioAndSpeaker} onChange={(e) => {
                                setProductLine({
                                    ...productLine,
                                    audioAndSpeaker: e.target.value
                                })
                            }} className={style.input}/>
                    </div>
                    <div>
                        <label htmlFor="" className={style.label}>Pin</label>
                        <input placeholder='Nhập thông số' type="text" 
                            value={productLine.battery} onChange={(e) => {
                                setProductLine({
                                    ...productLine,
                                    battery: e.target.value
                                })
                            }} className={style.input}/>
                    </div>
                    <div>
                        <label htmlFor="" className={style.label}>Camera</label>
                        <input placeholder='Nhập thông số' type="text" 
                            value={productLine.camera} onChange={(e) => {
                                setProductLine({
                                    ...productLine,
                                    camera: e.target.value
                                })
                            }} className={style.input}/>
                    </div>
                    <div>
                        <label htmlFor="" className={style.label}>Màn hình</label>
                        <input placeholder='Nhập thông số' type="text" 
                            value={productLine.display} onChange={(e) => {
                                setProductLine({
                                    ...productLine,
                                    display: e.target.value
                                })
                            }} className={style.input}/>
                    </div>
                    <div>
                        <label htmlFor="" className={style.label}>Ổ cứng</label>
                        <input placeholder='Nhập thông số' type="text" 
                            value={productLine.hardDrive} onChange={(e) => {
                                setProductLine({
                                    ...productLine,
                                    hardDrive: e.target.value
                                })
                            }} className={style.input}/>
                    </div>
                    <div>
                        <label htmlFor="" className={style.label}>RAM</label>
                        <input placeholder='Nhập thông số' type="text" 
                            value={productLine.memory} onChange={(e) => {
                                setProductLine({
                                    ...productLine,
                                    memory: e.target.value
                                })
                            }} className={style.input}/>
                    </div>
                    <div>
                        <label htmlFor="" className={style.label}>Hệ điều hành</label>
                        <input placeholder='Nhập thông số' type="text" 
                            value={productLine.operatingSystem} onChange={(e) => {
                                setProductLine({
                                    ...productLine,
                                    operatingSystem: e.target.value
                                })
                            }} className={style.input}/>
                    </div>
                    <div>
                        <label htmlFor="" className={style.label}>CPU</label>
                        <input placeholder='Nhập thông số' type="text" 
                            value={productLine.processor} onChange={(e) => {
                                setProductLine({
                                    ...productLine,
                                    processor: e.target.value
                                })
                            }} className={style.input}/>
                    </div>
                    <div>
                        <label htmlFor="" className={style.label}>Card đồ họa</label>
                        <input placeholder='Nhập thông số' type="text" 
                            value={productLine.videoCard} onChange={(e) => {
                                setProductLine({
                                    ...productLine,
                                    videoCard: e.target.value
                                })
                            }} className={style.input}/>
                    </div>
                    <div>
                        <label htmlFor="" className={style.label}>Wi-fi</label>
                        <input placeholder='Nhập thông số' type="text" 
                            value={productLine.wireless} onChange={(e) => {
                                setProductLine({
                                    ...productLine,
                                    wireless: e.target.value
                                })
                            }} className={style.input}/>
                    </div>
                </div>

                <button onClick={(e) => onSubmitButtonClick()} className={style.createButton}>
                    <UilPlus className={style.icon}/>
                    <span>Tạo dòng sản phẩm</span>
                </button>
            </div>
        </div>
    )
}