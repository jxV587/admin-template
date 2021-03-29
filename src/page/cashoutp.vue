<template>
	<div>
		<div class="container" v-loading="loading">
			<div class="search-container">
					<el-select v-model="searchData.state" placeholder="状态" size="small" clearable @change="stateChange">
						<el-option v-for="item in stateList" :key="item.state" :label="item.stateStr" :value="item.state"></el-option>
					</el-select>
					<el-input v-model.trim="searchData.phone" size="small" placeholder="提现人" clearable></el-input>
					<el-button type="primary" icon="el-icon-search" size="small" @click="getUserData">搜索</el-button>
			</div>
			<WeTableCustom :cfgs="cfgs" :data="userList" @handlePaginationChange="handlePaginationChange"></WeTableCustom>
			<el-dialog :title="detailDialog.isCheck ? '审核提现' : '提现详情'" :visible.sync="detailDialog.detaiVisible" width="30%">
				<el-form ref="form" :model="detailDialog.detaileData" label-width="110px">
					<el-form-item label="交易状态">
						<div>{{ detailDialog.detaileData.stateStr }}</div>
					</el-form-item>
					<el-form-item label="交易金额">
						<div>{{ detailDialog.detaileData.money }}</div>
					</el-form-item>
					<el-form-item label="银行账户名">
						<div>{{ detailDialog.detaileData.accountName }}</div>
					</el-form-item>
					<el-form-item label="开户行">
						<div>{{ detailDialog.detaileData.bankName }}</div>
					</el-form-item>
					<el-form-item label="银行卡账户">
						<div>{{ detailDialog.detaileData.accountNumber }}</div>
					</el-form-item>
					<el-form-item label="交易时间">
						<div>{{ detailDialog.detaileData.createTime }}</div>
					</el-form-item>
					<div v-if="detailDialog.detaileData.state == 0 && detailDialog.isCheck">
						<el-form-item label="上传流水单">
							<div><WeUpload ref="weupload"></WeUpload></div>
						</el-form-item>
					</div>
					<div v-if="detailDialog.detaileData.state == 1">
						<el-form-item label="流水单">
							<el-image
								style="width: 100px; height: 100px;"
								:src="detailDialog.detaileData.transferPic" 
								:preview-src-list="new Array(detailDialog.detaileData.transferPic)">
							</el-image>
						</el-form-item>
						<el-form-item label="交易订单号">
							<div>{{ detailDialog.detaileData.tradeNumber }}</div>
						</el-form-item>
					</div>
					<div v-else>
						<el-form-item label="流水单">
							<div>{{ detailDialog.detaileData.transferPic }}</div>
						</el-form-item>
						<el-form-item label="审核不通过原因">
							<div>{{ detailDialog.detaileData.reason }}</div>
						</el-form-item>
					</div>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button v-if="detailDialog.isCheck" @click="checkClick(true)">审核通过</el-button>
					<el-button v-if="detailDialog.isCheck" type="danger" @click="checkClick(false)">审核不通过</el-button>
					<el-button @click="detailDialog.detaiVisible = false">取 消</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import WeUpload from '../components/WeUpload.vue';
import WeTableCustom from '../components/WeTableCustom.vue';
export default {
	name: 'cashoutp',
	components: {
		WeUpload,
		WeTableCustom
	},
	data() {
		return {
			userList: [],
			form: {},
			loading: false,
			searchData: {
				state: -1,
				phone: null,
			},
			stateList: [{
					state: -1,
					stateStr: '全部'
				},{
				state: 0,
				stateStr: '申请中'
			},{
				state: 1,
				stateStr: '已提现'
			},{
				state: 2,
				stateStr: '提现失败'
			}],
			detailDialog: {
				detaileData: {
					accountName: '',
					accountNumber: '',
					bankName: '',
					createTime: '',
					id: '',
					money: 0,
					passTime: null,
					reason: null,
					state: 0,
					tradeNumber: null,
					transferPic: null,
					userId: '1367395202268008449'
				},
				fileList: [],
				reason: '', // 不通过原因
				title: '提现详情',
				detaiVisible: false
			},
			cfgs: {
				data: [],
				pagination: {
					size: 20, // 每页请求数据量
					total: 0, // 总数据量
					currentPage: 1, // 当前页码数
					pageSizes: [20, 40, 60, 100, 200]
				},
				columns: [
					{
						label: 'id',
						prop: 'id',
						sortable: false
					},
					{
						label: '提现人',
						prop: 'userPhone',
						sortable: false
					},
					{
						label: '提现金额',
						prop: 'money',
						sortable: false
					},
					{
						label: '提现状态',
						prop: 'state',
						sortable: false,
						render: (h, params) => {
							return h('div', this.checkState(params.row.state));
						}
					},
					{
						label: '订单时间',
						prop: 'createTime',
						sortable: false,
						render: (h, params) => {
							return h('div', this.$common.timeFormat(params.row.createTime, 'yyyy-MM-dd hh:mm:ss'));
						}
					},
					{
						label: '操作',
						prop: '',
						align: 'center',
						sortable: false,
						render: (h, params) => {
							return h('div', [
								h(
									'el-button',
									{
										props: {
											type: 'primary',
											size: 'mini'
										},
										on: {
											click: () => {
												this.getCashOutInfo(params.row.id, false);
											}
										}
									},
									'查看详情'
								),
								h(
									'el-button',
									{
										props: {
											type: 'primary',
											size: 'mini'
										},
										style: {
											display: params.row.state !== 0 ? 'none' : ''
										},
										on: {
											click: () => {
												this.getCashOutInfo(params.row.id, true);
											}
										}
									},
									'审核'
								)
							]);
						}
					}
				]
			}
		};
	},
	mounted() {
		this.getUserData();
		console.log(this.$route)
	},
	methods: {
		stateChange(e) {
			if(e==='') {
				this.searchData.state = -1;
			}
			this.getUserData();
		},
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
		// 是否通过
		checkClick(isPass) {
			this.detailDialog.fileList = this.$refs.weupload.getFileList();
			let fileList = this.detailDialog.fileList;
			if (isPass && !fileList.length) {
				this.$message.warning('请上传流水单');
				return;
			} else if (!isPass && !this.detailDialog.reason) {
				this.$prompt('请输入不通过原因', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /\S/,
					inputErrorMessage: '不通过原因不可为空'
				}).then(({ value }) => {
					this.detailDialog.reason = value;
					this.checkCashOut(false);
				});
			}else if(isPass && fileList.length) {
				this.checkCashOut(true);
			}
		},
		getUserData() {
			this.loading = true;
			this.$common.request({
				url: '/api/taskapp/platform/getCashOutLogData',
				method: 'get',
				params: {
					State: this.searchData.state || null,
					Phone: this.searchData.phone,
					SkipCount: this.cfgs.pagination.currentPage,
					MaxResultCount: this.cfgs.pagination.size
				},
				success: data => {
					this.loading = false;
					this.cfgs.data = data.items;
					this.cfgs.pagination.total = Number(data.totalCount);
				},
				error: error => {
					this.loading = false;
				}
			});
		},
		getCashOutInfo(id, isCheck) {
			this.$common.request({
				url: `/api/taskapp/platform/${id}/getCashOutInfo`,
				showToast: null,
				method: 'get',
				success: data => {
					this.detailDialog.detaileData = data;
					this.detailDialog.isCheck = isCheck;
					this.detailDialog.detaileData.stateStr = this.checkState(data.state);
					this.detailDialog.detaileData.createTime = this.$common.timeFormat(data.createTime, 'yyyy-MM-dd hh:mm:ss');
					this.detailDialog.detaiVisible = true;
				},
				error: error => {}
			});
		},
		
		checkCashOut(isTrue) {
			this.$common.request({
				url: `/api/taskapp/platform/checkCashOut`,
				showToast: null,
				method: 'post',
				data: {
					id: this.detailDialog.detaileData.id,
					isTrue: isTrue,
					reason: this.detailDialog.reason,
					transferPic: this.detailDialog.fileList[0] &&this.detailDialog.fileList[0].response.relativePath
				},
				success: data => {
					this.detailDialog.detaiVisible = false;
					this.cfgs.data.map((item, index) => {
						if(item.id == this.detailDialog.detaileData.id) {
							this.cfgs.data.splice(index, 1);
						}
					})
				},
				error: error => {}
			});
		},
		checkState(state) {
			// 提现状态-1:全部 0:申请中 1 已提现 2 失败
			let stateStr = '状态未知';
			this.stateList.map(item => {
				if(state == item.state) {
					stateStr = item.stateStr;
				}
			})
			return stateStr;
		}
	}
};
</script>

<style scoped lang="less">
	.search-container {
		display: flex;
		margin-bottom: 10px;
		/deep/ .el-select>.el-input {
			width: 120px !important;
			margin-right: 10px;
		}
		/deep/ .el-input {
			width: 300px;
			margin-right: 10px;
		}
	}
.el-form {
	width: 500px;
}
</style>
