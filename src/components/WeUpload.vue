<template>
	<div>
		<el-upload ref="upload" :action="requestUrl+upload_url" :accept="accept" :headers="upload_header" name="file" list-type="picture-card" :on-exceed="handleExceed" :file-list="fileList" :limit="limit" :on-success="handleSuccess" :on-error="handleError" :before-upload="beforeUpload">
			<i slot="default" class="el-icon-plus"></i>
			<div slot="file" slot-scope="{ file }">
				<img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
				<span class="el-upload-list__item-actions">
					<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)"><i class="el-icon-zoom-in"></i></span>
					<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)"><i class="el-icon-delete"></i></span>
				</span>
			</div>
		</el-upload>
		<el-dialog :modal="false" :visible.sync="dialogVisible"><img width="100%" :src="dialogImageUrl" alt="" /></el-dialog>
	</div>
</template>

<script>
	import {requestUrl} from '../common/request.js'
export default {
	name: 'weupload',
	props: {
		limit: {
			type: Number,
			default: 1
		},
		accept: {
			type: String,
			default: '.gif,.jpg,.jpeg,.png,.bmp'
		},
		upload_url: {
			type: String,
			default: '/UpLoadImg'
		}
	},
	data() {
		return {
			dialogImageUrl: '',
			dialogVisible: false,
			disabled: false,
			requestUrl: requestUrl,
			// accept: '.gif,.jpg,.jpeg,.png,.bmp',
			// upload_url: requestUrl + '/UpLoadImg',
			upload_header: {
				Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('login')).token
			},
			fileList: [],
			// fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
		};
	},
	mounted() {
	},
	methods: {
		getFileList() {
			return this.$refs.upload.$refs['upload-inner'].fileList;
		},
		beforeUpload(file) {
			this.$emit('beforeUpload', {file:file});
		},
		handleSuccess(file) {
			this.$emit('handleSuccess', {file:file});
			this.$message.success('上传成功');
		},
		handleError(error) {
			this.$emit('handleError', {error:error});
			this.$message.error('上传失败');
		},
		handleRemove(file) {
			let fileList = this.$refs.upload.$refs['upload-inner'].fileList;
			fileList.map((item, index) => {
				if(file.name == item.name) {
					fileList.splice(index, 1)
				}
			})
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		handleExceed() {
			this.$message.error('超出文件上传最大数')
		}
	}
};
</script>

<style scoped lang="less">
/deep/ .el-upload-list__item,
/deep/ .el-upload--picture-card {
	width: 100px;
	height: 100px;
	line-height: 100px;
}
/deep/ .el-upload-list__item-actions span+span {
	margin-left: 5px;
}
</style>
