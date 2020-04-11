import Vue from 'vue';
import Vuex from 'vuex';
import PocketBook from './PocketBook.vue';
import store from './store/index';
import { 
	DatePicker, 
	Button, 
	Icon, 
	Dropdown, 
	DropdownMenu, 
	DropdownItem, 
	Drawer, 
	Input, 
	Radio, 
	Select, 
	Option, 
	Backtop, 
	Message 
} from 'element-ui';
import './assets/css/iconfont.css';

Vue.prototype.$message = Message;
Vue.use(DatePicker).use(Button).use(Icon).use(Dropdown).use(DropdownMenu).use(DropdownItem);
Vue.use(Drawer).use(Input).use(Radio).use(Select).use(Option).use(Backtop);

Vue.config.productionTip = false;

new Vue({
  render: h => h(PocketBook),
  store
}).$mount('#app');
