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
// 树形数据表格展示
import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// NProgress  进度条的js与css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 导入富文本编辑器的样式
// 配置请求的根路径
axios.defaults.baseURL = "https://www.liulongbin.top:8888/api/private/v1/"
// 在request拦截器中展示进度条 NProgress.start()
axios.interceptors.request.use((config) => {
    NProgress.start()
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})
// 在response中隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
    NProgress.done()
    return config
})
Vue.prototype.$http = axios;
Vue.config.productionTip = false
Vue.component('tree-table', TreeTable)
// 富文本编辑器注册为全局组件
Vue.use(VueQuillEditor)
// 注册全局时间过滤器
Vue.filter('dateFormat', (time) => {
    const dt = new Date(time)
    // 获取年月日
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')
    // 获取时分秒
    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')