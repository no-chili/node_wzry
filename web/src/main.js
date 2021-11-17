import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import VueAwesomeSwiper from 'vue-awesome-swiper'
import './assets/fonticons/iconfont.css'
import 'swiper/css/swiper.css'
import { Pagination } from 'swiper/js/swiper.esm'

Vue.use(VueAwesomeSwiper, Pagination /* { default options with global component } */ )

import './assets/scss/style.scss'

import Card from './components/Card'
Vue.component('m-card', Card)
import ListCard from './components/ListCard'
Vue.component('m-list-card', ListCard)

import axios from 'axios'
Vue.prototype.$http = axios.create({
    baseURL: 'http://localhost:3000/web/api'
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
