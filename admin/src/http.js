import Vue from 'vue'
import axios from "axios"
import router from './router'

const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL || '/admin/api'
        // baseURL: 'http://127.0.0.1:3000/admin/api'
})

http.interceptors.request.use(function(config) {
    // Do something before request is sent
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
    }
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});


http.interceptors.response.use(res => {
    return res
}, err => {
    if (err.response.data.message) {
        Vue.prototype.$message({
            message: err.response.data.message,
            type: 'error'
        })
        if (err.response.status === 401) {
            router.push('/login')
        }
    }
    return Promise.reject(err)
})

export default http
