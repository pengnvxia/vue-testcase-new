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
                <a-form-model-item has-feedback prop="email">
                    <a-input placeholder="请输入邮箱" v-model="userForm.email" autocomplete="off" />
                </a-form-model-item>
                <a-form-model-item>
                    <a-button class="loginBtn" type="primary" @click="handleRegister">
                        注册
                    </a-button>
                </a-form-model-item>
            </a-form-model>
        </div>
        <div class="loginLink">
            <a @click="handleLogin">已有账号去登录</a>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import {register} from "@/services/user";

    @Component
    export default class Login extends Vue {

        private userForm: any={
            username:'',
            password:'',
            email:null
        }

        private rules:any = {
            username: [
                {
                    required: true,
                    message: "请输入用户名",
                    trigger: "blur"
                }
            ],
            password: [
                {
                    required: true,
                    message: "请输入密码",
                    trigger: "blur"
                }
            ]
        };

        private handleRegister(): void{
            const ref: any = this.$refs.ruleForm;
            ref.validate((valid: boolean) => {
                if(valid){
                    register(this.userForm.username,this.userForm.password,this.userForm.email).then(
                        (result: any) => {
                            if (result.errcode === "0") {
                                //存储token到浏览器
                                this.$router.push({
                                    name:'login',
                                })
                            }
                        },
                        (err: any) => {
                            this.$message;
                        }
                    )
                }else {
                    return;
                }
            })


        }

        private handleLogin(): void{
            this.$router.push({
                name: 'login'
            });
        }

    }
</script>

<style lang="scss" scoped>
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
    .login .loginLink{
        width: 400px;
        position: absolute;
        left: 50%;
        top: 440px;
        margin-left: -200px;
    }
</style>
