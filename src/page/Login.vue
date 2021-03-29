<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="userName">
                    <el-input v-model="param.userName" placeholder="请输入账号">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="userPwd">
                    <el-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="param.userPwd"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" :loading="isLogin" @click="submitForm()">{{isLogin ? '登录中' : '登录'}}</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
	name: 'login',
    data: function() {
        return {
					isLogin: false,
            param: {
                userName: '',
                userPwd: '',
								// userName: 'admin',
								// userPwd: '123qwe/000000',
            },
            rules: {
                userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                userPwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
									this.isLogin = true;
									this.$common.request({
										url: '/AdminLogin',
										methods: 'post',
										data: this.param,
										success: (data) => {
											this.isLogin = false;
											localStorage.setItem('login', JSON.stringify(data));
											this.$router.push('/info/welcome');
										},
										error: (error) => {
											this.isLogin = false;
											console.log('error:', error);
										}
									})
                }
            });
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
</style>