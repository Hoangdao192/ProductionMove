import style from './EditProductLine.module.scss'
import { UilSave } from '@iconscout/react-unicons'
import { useState } from 'react'
import config from '../../../../config.json';
import Authentication from '../../../../services/Authentication/Authentication';
import Validator from '../../../../services/validator/Validator';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

export default function EditProductLine() {

    const [productLine, setProductLine] = useState(useLocation().state.productLine)
    const navigate = useNavigate();

    function validation() {
        if (Validator.isEmpty(productLine.productName)) {
            toast.error("Tên dòng sản phẩm không được để trống.")
            return false;
        }
        if (Validator.isEmpty(productLine.audioAndSpeaker)) {
            toast.error("Thông số loa không được để trống")
            return false;
        }
        if (Validator.isEmpty(productLine.battery)) {
            toast.error("Thông số pin không được để trống")
            return false;
        }
        if (Validator.isEmpty(productLine.camera)) {
            toast.error("Thông số camera không được để trống")
            return false;
        }
        if (Validator.isEmpty(productLine.display)) {
            toast.error("Thông số màn hình không được để trống")
            return false;
        }
        if (Validator.isEmpty(productLine.hardDrive)) {
            toast.error("Thông số ổ cứng không được để trống")
            return false;
        }
        if (Validator.isEmpty(productLine.memory)) {
            toast.error("Thông số bộ nhớ không được để trống")
            return false;
        }
        if (Validator.isEmpty(productLine.operatingSystem)) {
            toast.error("Hệ điều hành không được để trống")
            return false;
        }
        if (Validator.isEmpty(productLine.processor)) {
            toast.error("Chip xử lý không được để trống")
            return false;
        }
        if (Validator.isEmpty(productLine.videoCard)) {
            toast.error("Card đồ họa không được để trống")
            return false;
        }
        if (Validator.isEmpty(productLine.wireless)) {
            toast.error("Thiết bị không dây không được để trống")
            return false;
        }
        return true;
    }

    function sendCreateProductLineRequest() {
        let url = config.server.api.productLine.update.url;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': Authentication.generateAuthorizationHeader()
            },
            body: JSON.stringify(productLine)
        }).then((response) => {
            if (response.status == 200) {
                toast.success("Cập nhập dòng sản phẩm thành công.")
                navigate(-1)
            } else {
                toast.success("Cập nhập dòng sản phẩm không thành công.")
            }
        })
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
                    <UilSave className={style.icon}/>
                    <span>Cập nhập dòng sản phẩm</span>
                </button>
            </div>
        </div>
    )
}