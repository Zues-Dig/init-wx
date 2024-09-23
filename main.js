
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

import uView from 'uview-ui'
Vue.use(uView)

import store from './store'
import MinRequest from '@/request'
import minRequest from '@/request/api'
import Loading from '@/common/loading/index.js'

Vue.prototype.$loading = Loading.install
Vue.prototype.$store = store
Vue.use(MinRequest)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	store,
	minRequest,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif