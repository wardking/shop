import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 引入字体图标
import "./assets/fonts/iconfont.css"
// 导入全局样式
import "./assets/css/global.css"
import axios from 'axios'
Vue.prototype.$http = axios;
// 配置请求的根路径
axios.defaults.baseURL="https://www.liulongbin.top:8888/api/private/v1/"
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')