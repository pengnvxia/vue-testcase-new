<template>
    <div>

        <a-form-model :model="variableForm" ref="variablesruleForm" class="variableForm" :rules="ruleForm">
            <a-row>
                <a-col :span="12">
            <a-form-model-item label="配置名称：" :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }" prop="configName">
                <a-input  v-model="variableForm.configName"></a-input>
            </a-form-model-item>
            </a-col>
            <a-col :span="12">
            <a-form-model-item label="所属项目：" :label-col="{ span: 2 }" :wrapper-col="{ span: 10 }" prop="projectId">
                <a-select>
                <a-select-option :value="1">
                    paper
                </a-select-option>
                <a-select-option :value="2">
                    paper
                </a-select-option>
                </a-select>
            </a-form-model-item>
            </a-col>
        </a-row>
            <a-row>
                <a-col :span="12">
            <a-form-model-item label="所属环境：" :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }">
                <a-select v-model="variableForm.envId">
                    <a-select-option :value="1">
                        测试
                    </a-select-option>
                    <a-select-option :value="2">
                        生产
                    </a-select-option>
                </a-select>
            </a-form-model-item>
                </a-col>
                <a-col :span="12">
                    <a-form-model-item label="备注：" :label-col="{ span: 2 }" :wrapper-col="{ span: 10 }">
                        <a-input v-model="variableForm.description"/>
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-table bordered :columns="columns" :data-source="variableForm.variablesList" :pagination="false">
                <template
                        v-for="col in ['name', 'type', 'value']"
                        :slot="col"
                        slot-scope="text, record, index"

                >
                    <div :key="col">
                        <a-form-model-item v-if="col == 'type'">
                            <a-select style="width: 100px;" defaultValue="String" v-model="record.type">
                                <a-select-option value="String">String</a-select-option>
                                <a-select-option value="Number">Number</a-select-option>
                                <a-select-option value="Boolean">Boolean</a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item v-else-if="col == 'name'" :prop="'record.name' + index"
                                           :rules="{
        required: true,
        message: 'domain can not be null',
        trigger: 'blur',
      }">
                            <a-input v-model="record.name"/>
                        </a-form-model-item>
                        <a-form-model-item v-else>
                        <a-input
                                v-model="record.value"/>
                        </a-form-model-item>
                    </div>
                </template>
                <template slot="operation" slot-scope="text, record, index">
                    <a-icon type="minus" @click="handleDelete(index)"/>
                    <a-icon type="plus" @click="handleAdd(index)"/>
                </template>
                <a-icon type="plus" slot="footer" v-if="variableForm.variablesList.length<=0" @click="handleAdd(0)"/>
            </a-table>
            <a-form-model-item class="btn">
                <a-button type="primary" @click="handleSubmit" class="submitBtn">提交</a-button>
                <a-button @click="handleCancel" class="cancelBtn">取消</a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { configCreate } from '@/services/testcaseConfig/index';

    interface Variable {
        key?: number,
        variableId?:number,
        name: string,
        type: string,
        value: string
    }

    interface VariableForm {
        configName: string,
        projectId: number|null,
        envId: number,
        description?: string|null,
        variablesList: Variable[]
    }

    @Component({
        components: {}
    })
    export default class AddConfig extends Vue{


        private variableForm: VariableForm={
            configName: '',
            envId: 1,
            projectId: 1,
            description: null,
            variablesList: []
        }
        // private variables: Variable[]=[];
        private columns = [
            {
                title: 'name',
                dataIndex: 'name',
                scopedSlots: {customRender: 'name'}
            },
            {
                title: 'type',
                dataIndex: 'type',
                scopedSlots: {customRender: 'type'}
            },
            {
                title: 'value',
                dataIndex: 'value',
                scopedSlots: {customRender: 'value'}
            },
            {
                title: '操作',
                key: 'operation',
                scopedSlots: {customRender: 'operation'}
            },
        ];

        private ruleForm:any ={
            configName:[
                {
                    required: true,
                    message: "请输入配置项名称",
                    trigger: "blur"
                }
            ],
            projectId: [{
                required: true,
                message: "请选择所属项目",
                trigger: "change"
            }]


        }

        private handleAdd(index: number): void {
            const newData = {
                key: (new Date()).valueOf()+Math.floor(Math.random() * 100000),
                name: '',
                type: 'String',
                value: ''
            };
            this.variableForm.variablesList.splice(index+1,0,newData);
        }

        private handleDelete(index: number): void {
            this.variableForm.variablesList.splice(index,1);
        }

        private deleteKey(variableForm: VariableForm): void {
            this.variableForm.variablesList.forEach(function(value: Variable){
                delete value.key;
            })
        }


        private handleSubmit(variableForm: VariableForm): void {
            const ref: any = this.$refs.variablesruleForm;
            ref.validate((valid: boolean) => {
                if (valid) {
                    configCreate(this.variableForm).then(
                        (result: any) => {
                            if (result.errcode === "0") {
                                this.$message.success("添加成功！")
                                this.$router.go(-1);
                            }
                        },
                        (err: any) => {
                            this.$message;
                        }
                    )
                } else {
                    return false;
                }
            });

        }

        private handleCancel(): void {
            this.$router.go(-1);
        }




    }
</script>
<style>
    .variableForm {
        margin-top: 30px;
    }
    .anticon-minus {
        padding-left: 5px;
        padding-right: 5px;
    }
    .anticon-plus {
        padding-left: 5px;
        padding-right: 5px;
    }
    .ant-table-tbody .ant-input {
        border: none;

    }
    .variableForm .ant-table-tbody .ant-form-item{
        margin-bottom: 0;
        margin: -5px 0;
    }

    .variableForm .ant-form-item-control{
        line-height: 32px;
    }

    .variableForm .ant-form-item-control{
        line-height: 32px;
    }

    .btn {
        margin-top: 50px;
    }

    .btn .ant-form-item-children{
        position: absolute;
        left: 50%;
        margin-left: -163.9px;

    }

    .btn .cancelBtn{
        margin-left: 200px;
    }
</style>
