<template>
    <a-form-model class="form" :rules="roleRules" :model="projectForm" ref="ruleForm">
        <a-form-model-item prop="projectName" label="项目名称：" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
            <a-input v-model="projectForm.projectName" placeholder="输入项目名称"></a-input>
        </a-form-model-item>
        <a-form-model-item label="测试环境地址：" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
            <a-input placeholder="输入测试环境地址" v-model="projectForm.devAddress"></a-input>
        </a-form-model-item>
        <a-form-model-item label="生产环境地址：" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
            <a-input placeholder="输入生产环境地址" v-model="projectForm.prodAddress"></a-input>
        </a-form-model-item>
        <a-form-model-item label="备注：" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
            <a-textarea placeholder="输入..." v-model="projectForm.description"></a-textarea>
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
    import { editProject,getProject } from "@/services/project/index";

    @Component
    export default class Edit extends Vue {
        private projectForm: any={
            projectName: "",
            devAddress: "",
            prodAddress: "",
            description: ""
        };

        private roleRules:any = {
            projectName: [
                {
                    required: true,
                    message: "请输入项目名称",
                    trigger: "blur"
                }
            ],
        };
        private mounted(): void {
            this.getProjectInfo(this.$route.params.id)
        }

        private getProjectInfo(id:String) {
            getProject(id).then(
                (result: any) => {
                    if (result.errcode === "0") {
                        this.projectForm = result.retval;
                    }
                },
                (err: any) => {
                    if (err.errcode === "PRO001") {
                        this.$message;
                        return;
                    }
                    this.$message;
                }
            );
        }
        private submit(): void{
            editProject(this.projectForm).then(
                (result: any) => {
                    if (result.errcode === "0") {
                        this.$message.success("提交成功");
                        this.$router.push({path:'/index'});
                    }
                },
                (err: any) => {
                    if (err.errcode === "PRO001") {
                        this.$message;
                        return;
                    }else if(err.errcode === "PRO002") {
                        this.$message;
                        return;
                    }
                    this.$message;
                }
            );
        }

        private handleReset(): void{
            this.$router.go(-1);
        }

    }
</script>
<style>
    .form {
        margin-top: 30px;
    }

</style>

