import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	routes: [{
			path: '/info',
			component: () => import('../components/Home.vue'),
			meta: {
				title: '信息管理',
				icon: 'el-icon-lx-calendar'
			},
			children: [{
					path: 'welcome',
					component: () => import('../page/welcome.vue'),
					meta: {
						title: '首页',
						hidden: true
					}
				},
				{
					path: 'setting',
					component: () => import('../page/setting.vue'),
					meta: {
						title: '信息设置'
					}
				},
				{
					path: 'userlist',
					component: () => import('../page/userlist.vue'),
					meta: {
						title: '用户列表'
					}
				},
				{
					path: 'cashoutp',
					component: () => import('../page/cashoutp.vue'),
					meta: {
						title: '平台提现'
					}
				},
				{
					path: 'cashoutu',
					component: () => import('../page/cashoutu.vue'),
					meta: {
						title: '用户提现'
					}
				},
				{
					path: 'sendmessage',
					component: () => import('../page/sendmessage.vue'),
					meta: {
						title: '消息群发'
					}
				}
			]
		},
		{
			path: '/',
			component: () => import('../page/Login.vue'),
			meta: {
				title: '登录'
			}
		}
	]
});
