import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import http from './http'

Vue.prototype.$http = http


Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.mixin({
    methods: {
        getAuthHeaders() {
            return {
                Authorization: `Bearer ${localStorage.token||''}`
            }
        }
    }
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
