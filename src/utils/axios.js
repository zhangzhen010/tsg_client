import axios from 'axios';
import {tipText} from './change';

// 创建 Axios 实例
const instance = axios.create({
    // baseURL:'https://tokyostupidgames.io'
    baseURL:'https://test-tsg.com'
});

// 请求拦截器
instance.interceptors.request.use(config => {
    if (config.url == '/api/ygy/login') {
        config.headers['token'] = ''
    }else {
        config.headers['token'] = localStorage.getItem('token')
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(res => {
    if(res.data.code == 300) {
        localStorage.removeItem('userAddress')
        localStorage.removeItem('userSigner')
        localStorage.removeItem('token')
        localStorage.removeItem('walletName')
    }
    if(res.data.code == -1){
        tipText.openSet(res.data.message)
    }
    return res;
}, error => {
    console.error('请求失败:', error);
    return Promise.reject(error);
});

export default instance;
