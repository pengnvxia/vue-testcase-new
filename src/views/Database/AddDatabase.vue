<template>
    <a-form-model class="form" :rules="roleRules" :model="databaseForm" ref="ruleForm">
        <a-form-model-item label="所属环境：" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
            <a-select v-model="databaseForm.envId">
                <a-select-option :value="1">
                    测试
                </a-select-option>
                <a-select-option :value="2">
                    生产
                </a-select-option>
            </a-select>
        </a-form-model-item>
        <a-form-model-item prop="dbName" label="数据库名称：" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
            <a-input v-model="databaseForm.dbName" placeholder="输入数据库名称"></a-input>
        </a-form-model-item>
        <a-form-model-item prop="host" label="host：" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
            <a-input placeholder="输入host" v-model="databaseForm.host"></a-input>
        </a-form-model-item>
        <a-form-model-item prop="port" label="port：" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
            <a-input placeholder="输入port" v-model="databaseForm.port"></a-input>
        </a-form-model-item>
        <a-form-model-item prop="username" label="用户名：" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
            <a-textarea placeholder="输入用户名" v-model="databaseForm.username"></a-textarea>
        </a-form-model-item>
        <a-form-model-item prop="password" label="密码：" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
            <a-textarea placeholder="输入密码" v-model="databaseForm.password"></a-textarea>
        </a-form-model-item>
        <a-form-model-item label="创建表Sql：" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
            <a-textarea class="largeText" placeholder="请输入创建表Sql..." v-model="databaseForm.createTableSql"></a-textarea>
        </a-form-model-item>
        <a-form-model-item label="插入Sql：" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
            <a-textarea class="largeText" placeholder="请输入插入Sql..." v-model="databaseForm.insertSql"></a-textarea>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 8, offset: 8 }">
            <a-button type="primary" @click="submit">
                提交
            </a-button>
            <a-button style="margin-left: 10px;" @click="handleReset">
                取消
            </a-button>
        </a-form-model-item>
    </a-form-model>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import {addDatabase} from "@/services/database";

    interface DatabaseInfo{
        id: number|null,
        dbName: string,
        host: string,
        port: number|null,
        username: string,
        password: string,
        envId: number,
        createTableSql: string,
        insertSql: string
    }
    @Component({
        components: {}
    })
    export default class AddDatabase extends Vue{

        private databaseForm: DatabaseInfo={
            id: null,
            dbName:'',
            host:'',
            port:null,
            username:'',
            password:'',
            envId:1,
            createTableSql:'',
            insertSql:''
        }

        private roleRules:any = {
            dbName: [
                {
                    required: true,
                    message: "请输入数据库名称",
                    trigger: "blur"
                }
            ],
            host: [
                {
                    required: true,
                    message: "请输入host",
                    trigger: "blur"
                }
            ],
            port: [
                {
                    required: true,
                    message: "请输入port",
                    trigger: "blur"
                },
                {
                    validator: this.checkPort,
                }
            ],
            username: [
                {
                    required: true,
                    message: "请输入username",
                    trigger: "blur"
                }
            ],
            password: [
                {
                    required: true,
                    message: "请输入password",
                    trigger: "blur"
                }
            ],
        };

        private checkPort(rule: any, value: any, callback:any): void {
            let number = Number(value);
            if(!Number.isInteger(number) || number<0) {
                callback('请输入整数大于0的整数！');
            }else {
                callback();
            }
        }

        private submit(): void{
            const ref: any = this.$refs.ruleForm;
            ref.validate((valid: boolean) => {
                if (valid){
                    addDatabase(this.databaseForm).then(
                        (result: any) => {
                            if (result.errcode === "0") {
                                this.$message.success("提交成功！");
                                this.$router.push({name:'database'});
                            }
                        },
                        (err: any) => {
                            this.$message.error(err.message);
                        }
                    )
                }else {
                    return false;
                }
            })

        }

        private handleReset(): void{
            this.$router.push({
                name: 'database'
            })
        }
    }

</script>

<style>
    .form {
        margin-top: 30px;
    }
    .ant-form-item-children .largeText {
        height: 200px;
    }
</style>
