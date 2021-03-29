<template>
   <div class="crumbs">
   	<el-breadcrumb separator="/">
   		<el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index">
				<i v-if="item.meta.icon" :class="item.meta.icon"></i>
				{{ item.meta.title }}
			</el-breadcrumb-item>
   	</el-breadcrumb>
   </div>
</template>

<script>
    export default {
			name: 'breadcrumb',
        data() {
            return {}
        },
        methods: {},
        computed: {},
        watch:{
					$route(){}
				},
        created(){
					
				}
    }

</script>


<style>
</style>
