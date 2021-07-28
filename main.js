import Vue from 'vue'
import App from './App'
import dayjs from 'dayjs'
import Api from './utils/Api.js'
import {common} from './utils/common.js'
Vue.prototype.Api = Api
Vue.prototype.dayjs = dayjs

Vue.config.productionTip = false
Vue.prototype.BaseUrl = common.BaseUrl

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

const app = new Vue({
    ...App
})
app.$mount()
