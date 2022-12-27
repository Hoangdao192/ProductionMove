import style from './NotFound.module.scss';

export default function NotFound() {
    return (
        <div id={style.notFound}>
            <div className={style.notFound}>
                <div className={style.notFound404}>
                    <h3>Không tìm thấy trang này</h3>
                    <h1><span>4</span><span>0</span><span>4</span></h1>
                </div>
                <h2>Xin lỗi, trang web bạn yêu cầu không tồn tại</h2>
            </div>
        </div>
    )
}