import axios from 'axios'; // 引入axios
// vant的toast提示框组件，大家可根据自己的ui组件更改。
import { Toast } from 'vant'; 
import config from './config';

// 环境的切换
axios.defaults.baseURL = config.baseUrl;
// if (process.env.NODE_ENV == 'development') {    
//     axios.defaults.baseURL = 'http://rap2api.taobao.org/app/mock/178159';} 
// else if (process.env.NODE_ENV == 'debug') {    
//     axios.defaults.baseURL = 'http://debug.shaozecai.com';
// } 
// else if (process.env.NODE_ENV == 'production') {    
//     axios.defaults.baseURL = 'http://proc.shaozecai.com';
// }
// 设置请求超时
axios.defaults.timeout = config.timeout;
// post请求头的设置
for (const key in config.headers) {
    if (config.headers.hasOwnProperty(key)) {
        axios.defaults.headers.post[key] = config.headers[key]
    }
}

/**
 * 请求方法封装
 */
interface creatObj {
    post?:any,
    get?:any
}
// 请求拦截
axios.interceptors.request.use(    
    config => {     
        // 设置拦截条件
        console.log('拦截请求: ',config)     
        return config;    
    },    
    error => {        
        return Promise.reject(error);    
    }
)
// 响应拦截
axios.interceptors.response.use(    
    response => {
        console.log('拦截响应: ',response)        
        if (response.status === 200) {            
            return Promise.resolve(response);        
        } else {            
            return Promise.reject(response);        
        }    
    }, 
    error => {
        if (error.response.status) { 
            switch (error.response.status) {                
                // 401: 未登录             
                case 401:                    
                    Toast({
                        message: '登录过期，请重新登录',
                        duration: 1000,
                        forbidClick: true
                    });
                    break;
                // 403 token过期                             
                case 403:
                    Toast({
                        message: '登录过期，请重新登录',
                        duration: 1000,
                        forbidClick: true
                    });
                    // 清除token
                    localStorage.removeItem('token'); 
                    break; 
                // 404请求不存在
                case 404:
                    Toast({
                        message: '网络请求不存在',
                        duration: 1500,
                        forbidClick: true
                    });
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    Toast({
                        message: error.response.data.message,
                        duration: 1500,
                        forbidClick: true
                    });
            }
            return Promise.reject(error.response);
        }
    }    
);
/**
 * get、post方法
 */
let dnwe:creatObj = Object.create(null);
dnwe.post = function(url:string,params:object){
    return axios.post(url, params)
}
dnwe.get = function(url:string,params:object){
    return axios.get(url, params)
}

export default dnwe