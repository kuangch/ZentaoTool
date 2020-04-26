/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2018/10/18
 * ======================================== */

import {
    Button,
    Select,
    Option,
    Input,
    Table,
    TableColumn,
    Pagination,
    DatePicker,
    Col,
    Row,
    Loading,
    Switch,
    Radio,
    RadioGroup
} from 'element-ui'
import ConvenienceImage from 'convenience-image'
import wordBox from '../../components/wordBox'
import backgroundBox from '../../components/backgroundBox'
import '../../common/common.css'
import '../../common/default.style.scss'
import '../../assets/iconfont/iconfont.css'
import '../../assets/iconfont/iconfont.js'

export default function (Vue) {
    Vue.use(Button)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(Input)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Switch)
    Vue.use(Radio)
    Vue.use(RadioGroup)
    Vue.use(DatePicker)
    Vue.use(Col)
    Vue.use(Row)
    Vue.use(Loading)
    Vue.use(Pagination)

    Vue.use(ConvenienceImage)
    Vue.use(wordBox)
    Vue.use(backgroundBox)
}
