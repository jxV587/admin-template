<template>
    <div class="container">
				欢迎
				<label class="user-name">{{username}}</label>
				使用后台管理系统
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    name: 'welcome',
    data() {
        return {
					username: JSON.parse(localStorage.getItem('login')).userName,
				};
    },
    components: {},
    computed: {},
    methods: {}
};
</script>


<style scoped>
	.container {
		height: 100%;
		box-sizing: border-box;
	}
	.user-name {
		color: red;
		font-weight: bold;
	}
</style>
