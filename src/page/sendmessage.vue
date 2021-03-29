<template>
	<div class="container">
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="消息内容">
				<el-input type="textarea" :rows="3" maxlength="1000" show-word-limit placeholder="请输入内容" v-model.trim="form.content"></el-input>
			</el-form-item>
			<el-form-item label="发送时间">
				<el-date-picker v-model="dateTime" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions"></el-date-picker>
			</el-form-item>
			<el-form-item label="设置价格"><el-input class="no-number" v-model="form.price" type="number" placeholder="请设置价格"></el-input></el-form-item>
			<el-form-item label=""><el-button type="primary" @click="sendClick">发 送</el-button></el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				content: '',
				price: '',
			},
			dateTime: null,
			pickerOptions: {
				shortcuts: [
					{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					},
					{
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					},
					{
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}
				]
			}
		};
	},
	methods: {
		sendClick() {
			this.$confirm('是否确认发送消息内容', '提示', {
				type: 'warning'
			}).then(res => {
				console.log(123, this.$common.getArgs());
			});
		}
	}
};
</script>

<style scoped lang="less">
.el-form {
	width: 30%;
}
.el-date-editor {
	width: 100%;
}
.el-textarea {
	display: block;
}
.el-button {
	margin-top: 10px;
}
</style>
