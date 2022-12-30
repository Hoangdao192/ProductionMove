import style from './ReturnWarrantyFactory.module.scss';
import config from '../../../../config.json';
import Authentication from '../../../../services/Authentication/Authentication';
import { useLocation, useNavigate } from 'react-router-dom';
import { UilRedo } from '@iconscout/react-unicons'
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function ReturnWarrantyFactory() {
    const productWarranty = useLocation().state.productWarranty;

    const [requestParams, setRequestParam] = useState({
        productWarrantyId: productWarranty.id,
        error: ""
    })

    const navigate = useNavigate();

    function validation() {
        if (requestParams.error == "") {
            toast.error("Bạn chưa nhập thông tin lỗi");
            return false;
        }
        return true;
    }

    function sendReturnFactoryRequest() {
        if (validation()) {
            let url = config.server.api.warranty.warranty.returnFactory.url;
            let formData = new FormData();
            formData.append("productWarrantyId", requestParams.productWarrantyId);
            formData.append("error", requestParams.error);
            fetch(url, {
                method: "POST",
                headers: {
                    'Authorization': Authentication.generateAuthorizationHeader()
                },
                body: formData
            }).then((response) => {
                if (response.status == 200) {
                    toast.success("Thành công");
                    navigate(-1)
                } else toast.error("Không thành công")
            })
        }
    }

    return (
        <div className={style.container}>
            <p className={style.title}>
                Thông báo lỗi
            </p>
            <div className={style.infoContainer}>
                <div className={style.warrantyInfo}>
                    <h4>Thông tin bảo hành</h4>
                    <div>
                        <label htmlFor="">Mã bảo hành</label>
                        <p>{productWarranty.id}</p>
                    </div>
                    <div>
                        <label htmlFor="">Mã sản phẩm</label>
                        <p>{productWarranty.customerProduct.productId}</p>
                    </div>
                    <div>
                        <label htmlFor="">Tên sản phẩm</label>
                        <p>{productWarranty.customerProduct.product.productLine.productName}</p>
                    </div>
                    <div>
                        <label htmlFor="">Tên khách hàng</label>
                        <p>{productWarranty.customerProduct.customer.firstName + " "
                            + productWarranty.customerProduct.customer.lastName}</p>
                    </div>
                    <div>
                        <label htmlFor="">Tên đại lý</label>
                        <p>{productWarranty.requestWarrantyDistributor.name}</p>
                    </div>
                </div>

                <div className={style.productInfo}>
                    <h4>Thông tin sản phẩm</h4>
                    <div>
                        <label htmlFor="">Mã sản phẩm</label>
                        <p>{productWarranty.customerProduct.productId}</p>
                    </div>
                    <div>
                        <label htmlFor="">Tên sản phẩm</label>
                        <p>{productWarranty.customerProduct.product.productLine.productName}</p>
                    </div>
                    <div>
                        <label htmlFor="">Mã lô hàng</label>
                        <p>{productWarranty.customerProduct.product.batch.id}</p>
                    </div>
                    <div>
                        <label htmlFor="">Ngày sản xuất</label>
                        <p>{productWarranty.customerProduct.product.batch.manufacturingDate}</p>
                    </div>
                </div>
            </div>
            <div className={style.errorInput}>
                <label htmlFor="">Thông tin lỗi</label>
                <input value={requestParams.error} 
                    onChange={(e) => setRequestParam({
                        ...requestParams,
                        error: e.target.value
                    })}    type="text" placeholder='Nhập thông tin lỗi' />
            </div>
            <button onClick={(e) => sendReturnFactoryRequest()} className={style.actionButton}>
                <UilRedo className={style.icon}/>
                <span>Thông báo đại lý</span>
            </button>
        </div>
    )
}