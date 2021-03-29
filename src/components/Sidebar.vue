<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
        >
            <el-submenu :index="index + ''" v-for="(item, index) in menuList" :key="index">
            	<template slot="title">
								<i :class="item.meta.icon"></i>
            		<span>{{ item.meta.title }}</span>
            	</template>
            	<el-menu-item-group v-if="subItem.meta.hidden !== true" v-for="(subItem, subIndex) in item.children" :key="subIndex">
            		<el-menu-item :index="index + '-' + subIndex" :path="item.path+'/'+subItem.path" @click="itemClick($event)">{{ subItem.meta.title }}</el-menu-item>
            	</el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
	name: 'sliderbar',
    data() {
        return {
            collapse: false,
						menuList: []
        };
    },
    created() {
			this.getMenuList();
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    },
		methods:{
			itemClick(event) {
				if(this.$router.history.current.fullPath != event.$attrs.path) {
					this.$router.push(event.$attrs.path);
				}
			},
			getMenuList() {
				this.menuList = this.$router.options.routes.filter(item => {
					if (item.children && item.children.length) {
						return item;
					}
				});
				console.log('menuList:', this.menuList)
			}
		}
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
