<template>
    <div class="login">
        <div class="loginTitle">
            欢迎使用自动化测试平台系统
        </div>
        <div class="loginInput">
            <a-form-model ref="ruleForm" :model="userForm" :rules="rules">
                <a-form-model-item has-feedback prop="username">
                    <a-input placeholder="请输入用户名" v-model="userForm.username" autocomplete="off" />
                </a-form-model-item>
                <a-form-model-item has-feedback prop="password">
                    <a-input placeholder="请输入密码" v-model="userForm.password" type="password" autocomplete="off" />
                </a-form-model-item>
                <a-form-model-item>
                    <a-button class="loginBtn" type="primary" @click="handleLogin">
                        登录
                    </a-button>
                </a-form-model-item>
            </a-form-model>
        </div>
        <div class="registerLink">
            <a @click="handleRegister">注册新账号</a>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import {login} from "@/services/user";

    @Component
    export default class Login extends Vue {

        private userForm: any={
            username:'',
            password:''
        }

        private handleLogin(): void{
            login(this.userForm.username,this.userForm.password).then(
                (result: any) => {
                    if (result.errcode === "0") {
                        //存储token到浏览器
                        this.$router.push({
                            name:'project',
                        });
                        localStorage.setItem('token', result.retval.token);
                        localStorage.setItem('username', result.retval.username);
                        localStorage.setItem('userId', result.retval.userId);
                    }
                },
                (err: any) => {
                    this.$message;
                }
            )
        }

        private handleRegister(): void{
            this.$router.push({
                name: 'register'
            });
        }

    }
</script>

<style>
    .login {
        width: 100%;
        height: 100vh;
        position: relative;
        text-align: center;
    }
    .login .loginTitle{
        width: 400px;
        position: absolute;
        left: 50%;
        top: 140px;
        margin-left: -200px;
    }
    .login .loginInput{
        width: 400px;
        height: 520px;
        position: absolute;
        left:50%;
        top:180px;
        margin-left: -200px;
    }
    .login .loginInput .loginBtn{
        width: 400px;
        height: 40px;
    }
    .login .ant-input{
        height: 40px;
    }
    .login .registerLink{
        width: 400px;
        position: absolute;
        left: 50%;
        top: 380px;
        margin-left: -200px;
    }
</style>
