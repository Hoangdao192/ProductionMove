import { useEffect } from 'react';
import { useState } from 'react';
import style from './ShowProductLine.module.scss';
import config from '../../../../config.json';

export default function ShowProductLine() {
    const [productLines, setProductLines] = useState([])

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
    }, [])

    function sendDeleteProductLineRequest() {
        
    }

    return (
        <div className={style.showProductLine}>
            <p className={style.title}>Danh sách dòng sản phẩm</p>
            <table className={style.table}>
                <thead>
                    <tr>
                        <td>STT</td>
                        <td>Mã dòng sản phẩm</td>
                        <td>Tên dòng sản phẩm</td>
                        <td>Tùy chọn</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        productLines.map((productLine, index) => {
                            return (
                                <tr>
                                    <td>{index}</td>
                                    <td>{productLine.id}</td>
                                    <td>{productLine.productName}</td>
                                    <td className={style.action}>
                                        <button>Xem chi tiết</button>
                                        <button>Sửa</button>
                                        <button>Xóa</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}