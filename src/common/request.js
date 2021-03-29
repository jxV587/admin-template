import axios from 'axios'
import Vue from 'vue'
import router from '../router/index.js'

const vm = new Vue({router});
const addAuthorization = () =>{
	const loginInfo = JSON.parse(localStorage.getItem('login'));
	if(loginInfo && loginInfo.token) {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + loginInfo.token;
	}
}
export const requestUrl = process.env.NODE_ENV == 'development' ? 'http://192.168.1.117:8076' : location.origin;
export default (config) => {
	const param = {
	  url: '',
	  data: {},
	  method: 'post',
		showToast: '请求成功'
	}
	Object.assign(param, config);
	param.url = `${requestUrl}${param.url}`;
	addAuthorization();
	axios(param).then(res => {
		param.showToast && vm.$message.success(param.showToast);
		param.success(res.data);
		console.log('request-ok:',res.data);
	}).catch(error=> {
		vm.$message.error(error.message);
		const response = error.response;
		if(response && response.status == 401) {
			vm.$router.push('/')
		}
		param.error(error);
		console.dir(error)
	})
}