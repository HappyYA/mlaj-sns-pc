import Vue from 'vue'
// import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import {
  Input,
  Button,
  Form,
  FormItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Radio,
  RadioGroup,
  RadioButton,
  Row,
  Col,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Tag,
  Dialog,
  Progress,
  MessageBox,
  Message,
  Select,
  Option,
  OptionGroup,
  Tabs,
  TabPane,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Pagination,
} from 'element-ui'
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Progress)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
// Vue.use(Element, {
//   size: Cookies.get('size') || 'medium' // set element-ui default size
// })
import axios from 'axios';
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
