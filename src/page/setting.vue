<template>
	<div class="container" v-loading="loading">
		<el-form  label-width="160px">
		  <el-form-item label="文章价格百分比">
				<el-input-number :disabled="isDisabled" v-model="formData.articlePercentage" :min="1" :max="100" label="文章价格百分比"></el-input-number>
		  </el-form-item>
			<el-form-item label="是否开启手动调价">
			  <el-switch
			    v-model="formData.isManual"
					:disabled="isDisabled"
			    active-text="开启"
			    inactive-text="关闭">
			  </el-switch>
			</el-form-item>
			<el-form-item label="手动调价价格" v-if="formData.isManual">
				<el-input-number :disabled="isDisabled" v-model="formData.manualPrice" :min="1" :max="1000" label="手动调价价格"></el-input-number>
			</el-form-item>
			<el-form-item label="推广者分成">
				<el-input-number :disabled="isDisabled" v-model="formData.extensionPercentage" :min="1" :max="1000" label="推广者分成"></el-input-number>
			</el-form-item>
			<el-form-item label="用户每日点击上限">
				<el-input-number :disabled="isDisabled" v-model="formData.userCanClickCount" :min="1" :max="1000" label="用户每日点击上限"></el-input-number>
			</el-form-item>
			<el-form-item label="邀请好友获得金额">
				<el-input-number :disabled="isDisabled" v-model="formData.invitationMoney" :min="1" :max="1000" label="邀请好友获得金额"></el-input-number>
			</el-form-item>
			<el-form-item label="设置文章跳转页">
				<el-input :disabled="isDisabled" v-model="formData.articleUrl" placeholder="设置文章跳转页"></el-input>
			</el-form-item>
			<el-form-item label="邀请跳转页">
			  <el-input :disabled="isDisabled" v-model="formData.invitationUrl" placeholder="邀请跳转页"></el-input>
			</el-form-item>
			<el-form-item label="App下载地址">
				<div class="btn-container">
					<el-input :disabled="isDisabled" v-model="formData.appDownUrl" placeholder="App下载地址"></el-input>
					<el-button :disabled="isDisabled" :loading="uploadingLink" @click="uploadClick('downloadLink')">{{uploadingLink ? '上传中...' : '上传'}}</el-button>
				</div>
				<WeUpload id="downloadLink" accept=".apk,.APK" upload_url="/UpLoadFile" :limit="100" @handleSuccess="(data)=>{handleSuccess(data, 'downloadLink')}" @beforeUpload="switchType('downloadLink')" @handleError="switchType('downloadLink')"></WeUpload>
			</el-form-item>
			<el-form-item label="H5视频教程地址">
				<div class="btn-container">
					<el-input :disabled="isDisabled" v-model="formData.h5VideoUrl" placeholder="H5视频教程地址"></el-input>
					<el-button :disabled="isDisabled" :loading="uploadingH5" @click="uploadClick('h5Course')">{{uploadingH5 ? '上传中...' : '上传'}}</el-button>
				</div>
				<WeUpload id="h5Course" accept=".mp4" upload_url="/UpLoadFile" :limit="100" @handleSuccess="(data)=>{handleSuccess(data, 'h5Course')}" @beforeUpload="switchType('h5Course')" @handleError="switchType('h5Course')"></WeUpload>
			</el-form-item>
			<el-form-item label="App视频教程地址">
				<div class="btn-container">
					<el-input :disabled="isDisabled" v-model="formData.appVideoUrl" placeholder="App视频教程地址"></el-input>
					<el-button :disabled="isDisabled" :loading="uploadingApp" @click="uploadClick('appCourse')">{{uploadingApp ? '上传中...' : '上传'}}</el-button>
				</div>
				<WeUpload id="appCourse" accept=".mp4" upload_url="/UpLoadFile" :limit="100" @handleSuccess="(data)=>{handleSuccess(data, 'appCourse')}" @beforeUpload="switchType('appCourse')" @handleError="switchType('appCourse')"></WeUpload>
			</el-form-item>
			<el-form-item>
			  <el-button type="primary" v-if="isDisabled" @click="isDisabled = !isDisabled">编辑信息</el-button>
				<el-button type="danger" v-else @click="submitClick">保存信息</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import WeUpload from '../components/WeUpload.vue';
export default {
	name: 'setting',
	components: {
		WeUpload
	},
	data() {
		return {
			loading: false,
			isDisabled: true,
			uploadingLink: false,
			uploadingH5: false,
			uploadingApp: false,
			formData: {
				appDownUrl: null,
				h5VideoUrl: null,
				appVideoUrl: null,
				articlePercentage: null,
				articleUrl: null,
				extensionPercentage: null,
				invitationMoney: null,
				invitationUrl: null,
				isManual: null,
				manualPrice: null,
				userCanClickCount: null
			}
		};
	},
	mounted() {
		this.getPrice();
	},
	methods: {
		uploadClick(type) {
			document.querySelector(`#${type} input[type='file']`).click();
		},
		handleSuccess(data, type) {
			this.switchType(type);
			if(type == 'downloadLink') {
				this.formData.appDownUrl = data.file.relativePath;
			}else if(type == 'h5Course') {
				this.formData.h5VideoUrl = data.file.relativePath;
			}else if(type == 'appCourse') {
				this.formData.appVideoUrl = data.file.relativePath;
			}
		},
		submitClick() {
			this.$confirm('是否确认修改',{
				type: 'warning'
			}).then(res => {
				this.setPrice();
			})
		},
		getPrice() {
			this.loading = true;
			this.$common.request({
				url: '/api/taskapp/basicSetting/getPrice',
				method: 'get',
				success: data => {
					this.loading = false;
					Object.assign(this.formData, data);
				},
				error: error => {
					this.loading = false;
				}
			})
		},
		setPrice() {
			this.loading = true;
			this.$common.request({
				url: '/api/taskapp/basicSetting/setPrice',
				method: 'post',
				showToast: '操作成功',
				data: this.formData,
				success: data => {
					this.loading = false;
					this.isDisabled = !this.isDisabled;
				},
				error: error => {
					this.loading = false;
				}
			})
		},
		switchType(type){
			switch(type) {
				case 'downloadLink':
					this.uploadingLink = !this.uploadingLink;
					break
				case 'h5Course':
					this.uploadingH5 = !this.uploadingH5;
					break
				case 'appCourse':
					this.uploadingApp = !this.uploadingApp;
					break
			}
		}
	}
};
</script>

<style scoped lang="less">
.el-form {
	width: 650px;
	.btn-container {
		display: flex;
		button {
			margin-left: 10px;
		}
	}
	#h5Course,
	#appCourse,
	#downloadLink {
		display: none;
	}
}
</style>
