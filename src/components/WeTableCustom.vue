<template>
	<div class="tab-container">
		<el-table :data="cfgs.data" style="width: 100%">
			<el-table-column v-for="(item, index) in cfgs.columns" :prop="item.prop" :sortable="item.sortable !== false && item.prop ? 'custom' : false"
				 :align="item.align || 'left'" :header-align="item.headerAlign" :label="item.label" :fixed="item.fixed" :width="item.width"
				 :min-width="item.minWidth" :key="item.label" :show-overflow-tooltip="item.showOverFlow">
				<template slot-scope="scope">
					<WeTableCustomColumn :renderContent="item.render" :scope="scope" :prop="item.prop"></WeTableCustomColumn>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="cfgs.pagination ? cfgs.pagination.currentPage : 1"
		      :page-sizes="cfgs.pagination ? cfgs.pagination.pageSizes : [20, 40, 60, 100, 200]"
		      :page-size="cfgs.pagination ? cfgs.pagination.size : 100"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="cfgs.pagination ? cfgs.pagination.total : 1">
		    </el-pagination>
	</div>
</template>

<script>
import WeTableCustomColumn from './WeTableCustomColumn.vue';
export default {
	name: 'customtab',
	components: {
		WeTableCustomColumn
	},
	props: {
		cfgs: {
			type: Object,
			required: true
		}
	},
	data() {
		return {};
	},
	mounted() {},
	methods: {
		handleSizeChange(e) {
			this.$emit('handlePaginationChange', {size:e, type: 'size'})
		},
		handleCurrentChange(e) {
			this.$emit('handlePaginationChange', {page:e, type: 'page'})
		}
	}
};
</script>

<style scoped lang="less">
	.el-pagination {
		text-align: right;
		margin-top: 10px;
	}
</style>
