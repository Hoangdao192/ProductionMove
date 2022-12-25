import { useLocation } from 'react-router-dom'
import style from './ShowProductLine.module.scss'
import productImage from '../../../../components/img/Untitled.png';

export default function ShowProductLine() {
    const productLine = useLocation().state.productLine;

    return (
        <div className={style.showProductLine}>
            <p className={style.title}>
                Dòng sản phẩm
            </p>
            <div className={style.productLine}>
                <div className={style.head}>
                    <p className={style.productLineName}>
                        {productLine.productName}
                    </p>
                    <img src={productImage} alt="" className={style.productLineImage}/>  
                </div>
                <div className={style.productLineInfo}>
                    <p>Thông số sản phẩm</p>
                    <div className={style.info}>
                        <div>
                            <p className={style.infoTitle}>Chip xử lý</p>
                            <p>{productLine.processor}</p>
                        </div>
                        <div>
                            <p className={style.infoTitle}>Hệ điều hành</p>
                            <p>{productLine.operatingSystem}</p>
                        </div>
                        <div>
                            <p className={style.infoTitle}>Card đồ họa</p>
                            <p>{productLine.videoCard}</p>
                        </div>
                        <div>
                            <p className={style.infoTitle}>Màn hình</p>
                            <p>{productLine.display}</p>
                        </div>
                        <div>
                            <p className={style.infoTitle}>Bộ nhớ</p>
                            <p>{productLine.memory}</p>
                        </div>
                        <div>
                            <p className={style.infoTitle}>Ổ cứng</p>
                            <p>{productLine.hardDrive}</p>
                        </div>
                        <div>
                            <p className={style.infoTitle}>Camera</p>
                            <p>{productLine.camera}</p>
                        </div>
                        <div>
                            <p className={style.infoTitle}>Loa và âm thanh</p>
                            <p>{productLine.audioAndSpeaker}</p>
                        </div>
                        <div>
                            <p className={style.infoTitle}>Thiết bị không dây</p>
                            <p>{productLine.wireless}</p>
                        </div>
                        <div>
                            <p className={style.infoTitle}>Pin</p>
                            <p>{productLine.battery}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}