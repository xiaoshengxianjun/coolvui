import Vue from 'vue'
import App from './App.vue'

import coolvui from './index.js'
Vue.use(coolvui)

new Vue({
  el: '#app',
  render: h => h(App)
})
