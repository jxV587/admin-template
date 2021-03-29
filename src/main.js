import Vue from 'vue';
import App from './App.vue';
import less from 'less'
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import 'babel-polyfill';
import common from './common/index'

Vue.use(common);
Vue.use(less);
Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small'
});

//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
// 	next();
// });

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
