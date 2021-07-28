import axios from 'axios'
import { APIMAP } from './ApiMap'
import { common } from './common.js'

// 测试
axios.defaults.baseURL = common.BaseUrl + '/index.php/api/'
// axios.defaults.baseURL = common.BaseUrl

axios.defaults.timeout = 20000

const initApiConfig = (key, params) => {
  let url = APIMAP[key] || key
  if (params && params['uid'] && url.indexOf(':uid') > -1) {
    return url.replace(':uid', params['uid'])
  } else if (url.indexOf(':uid') > -1) {
    return url.replace(':uid', '')
  }
  return url
}

// loading
let loadingInstance

// 请求拦截器
axios.interceptors.request.use((config) => {
  if ((config.params && config.params.hl) || (config.data && config.data.hl)) {

  } else {
    loadingInstance = uni.showLoading({
    	title: '加载中',
    	mask: true
    });
  }
  return config
}, (error) => {
  if (loadingInstance) setTimeout(uni.hideLoading, 500);
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use((res) => {
  if (loadingInstance) setTimeout(uni.hideLoading, 500);
  return res
}, (error) => {
	if (loadingInstance) setTimeout(uni.hideLoading, 500);
	return Promise.reject(error)
})

axios.defaults.adapter = function (config) {  
    return new Promise((resolve, reject) => {  
        var settle = require('axios/lib/core/settle');  
        var buildURL = require('axios/lib/helpers/buildURL');
		let token = uni.getStorageSync('token')
		try {
			if (config.url !== 'xj_login' && !token) {
				uni.showToast({
					title: '登录失效，请重新登录',
					icon: "none"
				})
				setTimeout(() => {
					uni.redirectTo({
						url: `/pages/login/index`
					})
				}, 1000)
			}
		} catch (err) {
			console.log(err)
		}
        uni.request({  
            method: config.method.toUpperCase(),  
            url: buildURL(config.baseURL + config.url, config.params, config.paramsSerializer),  
            header: config.headers,  
            data: config.data,  
            dataType: config.dataType,  
            responseType: config.responseType,  
            sslVerify: config.sslVerify,
			header: {Authorization:token ? token : '' },
            complete:function complete(response){  
                response = {  
                  data: response.data,  
                  status: response.statusCode,  
                  errMsg: response.errMsg,  
                  header: response.header,  
                  config: config  
                };  
				settle(resolve, reject, response)
            }
        })
    })  
}

export default {
  get: (key, params) => {
    const url = initApiConfig(key, params)
    return axios.get(url, { params: params })
  },

  post: (key, data) => {
    const url = initApiConfig(key, data)
    return axios.post(url, data)
  },

  put: (key, data) => {
    const url = initApiConfig(key, data)
    return axios.put(url, data)
  },

  delete: (key, params) => {
    const url = initApiConfig(key, params)
    return axios.delete(url, { params: params })
  },

  download: (key, params) => {
    const url = initApiConfig(key, params)
    return axios({
      url: url,
      params: params,
      method: 'GET',
      responseType: 'blob'
    })
  }
}