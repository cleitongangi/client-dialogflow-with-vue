import Vue from 'vue'
import App from './App.vue'

import config from './config'

Vue.config.productionTip = false
Vue.prototype.config = config // <- set config to global scope

new Vue({
  render: h => h(App),
}).$mount('#app')
