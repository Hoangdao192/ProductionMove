import style from './CreateUnit.module.scss'
import { css, Input } from '@nextui-org/react'

export default function CreateUnit() {

    return (
        <div className={`${style.createUnit}`}>
            <Input bordered clearable className={style.unitName} labelPlaceholder='Nhập tên cơ sở sản xuất'
                css={{
                    $$inputColor: '$white'
                }}
            >

            </Input>
        </div>
    )

}