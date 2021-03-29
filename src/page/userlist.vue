<template>
	<div class="container" v-loading="loading">
		<WeTableCustom :cfgs="cfgs" :data="userList" @handlePaginationChange="handlePaginationChange"></WeTableCustom>
	</div>
</template>

<script>
import WeTableCustom from '../components/WeTableCustom.vue';
export default {
	name: 'userlist',
	components: {
		WeTableCustom
	},
	data() {
		return {
			loading: false,
			userList: [],
			cfgs: {
				data: null,
				pagination: {
					size: 20, // 每页请求数据量
					total: 0, // 总数据量
					currentPage: 1, // 当前页码数
					pageSizes: [20, 40, 60, 100, 200]
				},
				columns: [{
						label: 'id',
						prop: 'id',
						sortable: false
					},{
						label: '手机号',
						prop: 'phone',
						sortable: false
					},{
						label: '总收益',
						prop: 'profit',
						sortable: false
					},{
						label: '提现金额',
						prop: 'cashOut',
						sortable: false
					},{
						label: '注册时间',
						prop: 'createTime',
						sortable: false
					}]
			}
		};
	},
	mounted() {
		this.getUserData();
	},
	methods: {
		handlePaginationChange(e) {
			const type = e.type;
			if(type == 'size') {
				this.cfgs.pagination.size = e[type];
				this.cfgs.pagination.currentPage = 1;
			}else if(type == 'page') {
				this.cfgs.pagination.currentPage = e[type];
			}
			this.getUserData();
		},
		getUserData() {
			this.loading = true;
			this.$common.request({
				url: '/api/taskapp/webUser/getUserData',
				method: 'get',
				params: {
					SkipCount: this.cfgs.pagination.currentPage,
					MaxResultCount: this.cfgs.pagination.size
				},
				success: data => {
					data.items.map(item => {
						item.createTime = this.$common.timeFormat(item.createTime, 'yyyy-MM-dd hh:mm')
					});
					this.loading = false;
					this.cfgs.data = data.items;
					this.cfgs.pagination.total = Number(data.totalCount);
				},
				error: error => {
					this.loading = false;
				}
			});
		}
	}
};
</script>

<style scoped lang="less">
.el-form {
	width: 500px;
}
</style>
