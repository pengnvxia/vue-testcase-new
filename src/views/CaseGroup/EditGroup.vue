<template>
    <div>
        <div v-if="$route.meta.levels !== 3">
            <a-form-model>
                <a-row>
                    <a-col :span="12">
                        <a-form-model-item label="用例组名称：" :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }">
                            <a-input v-model="testcaseGroupForm.groupName"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="所属项目：" :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }">
                            <a-select v-model="testcaseGroupForm.projectId">
                                <a-select-option :value="0">请选择</a-select-option>
                                <a-select-option :value="item.id" v-for="item in projects">
                                    {{ item.projectName }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-model-item label="环境" :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }">
                            <a-select v-model="testcaseGroupForm.envId">
                                <a-select-option :value="1">
                                    测试
                                </a-select-option>
                                <a-select-option :value="2">
                                    生产
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-collapse>
                    <a-collapse-panel key="variables" header="Variables">
                        <a-table :columns="variablesColumns" :pagination="false" :data-source="testcaseGroupForm.variables">
                            <template v-for="col in ['name','type','value','database']"
                                      :slot="col"
                                      slot-scope="text,record,index">
                                <a-form-model-item v-if="col=='name'">
                                    <a-input v-model="record.name"/>
                                </a-form-model-item>
                                <a-form-model-item v-if="col=='type'">
                                    <a-select default-value="String" v-model="record.type">
                                        <a-select-option value="String">String</a-select-option>
                                        <a-select-option value="Number">Number</a-select-option>
                                        <a-select-option value="Boolean">Boolean</a-select-option>
                                        <a-select-option value="Sql">Sql</a-select-option>
                                        <a-select-option value="Object">Object</a-select-option>
                                        <a-select-option value="Array">Array</a-select-option>
                                        <a-select-option value="Function">Function</a-select-option>
                                        <a-select-option value="RegExp">RegExp</a-select-option>
                                        <a-select-option value="Null">Null</a-select-option>
                                    </a-select>
                                </a-form-model-item>
                                <a-form-model-item v-if="col=='value'">
                                    <a-input v-model="record.value"/>
                                </a-form-model-item>
                                <a-form-model-item v-if="col=='database'">
                                    <a-select v-model="record.databaseId">
                                        <a-select-option :value="1">paper</a-select-option>
                                    </a-select>
                                </a-form-model-item>
                            </template>
                            <template slot="operation" slot-scope="text,record,index">
                                <a-icon type="minus" @click="handleDeleteVariables(index)"/>
                                <a-icon type="plus" @click="handleAddVariables(index)"/>
                            </template>
                            <a-icon type="plus" slot="footer" v-if="testcaseGroupForm.variables.length<=0" @click="handleAddVariables(0)"/>
                        </a-table>
                    </a-collapse-panel>
                    <a-collapse-panel key="parameters" header="Parameters">
                        <a-table :columns="parametersColumns" :pagination="false" :data-source="testcaseGroupForm.parameters">
                            <template v-for="col in ['name', 'value']"
                                      :slot="col"
                                      slot-scope="text,record,index"
                            >
                                <a-form-model-item v-if="col == 'name'">
                                    <a-input v-model="record.name"/>
                                </a-form-model-item>
                                <a-form-model-item v-if="col == 'value'">
                                    <a-input v-model="record.value"/>
                                </a-form-model-item>
                            </template>
                            <template slot="operation" slot-scope="text,record,index">
                                <a-icon type="minus" @click="handleDeleteParameters(index)"/>
                                <a-icon type="plus" @click="handleAddParameters(index)"/>
                            </template>
                            <a-icon type="plus" slot="footer" v-if="testcaseGroupForm.parameters.length<=0" @click="handleAddParameters(0)"/>
                        </a-table>
                    </a-collapse-panel>
                    <a-collapse-panel key="setupHooks" header="SetupHooks">
                        <a-table :columns="setuphooksColumns" :pagination="false" :data-source="testcaseGroupForm.setuphooks">
                            <template v-for="col in ['sql','database']"
                                      :slot="col"
                                      slot-scope="text,record,index">
                                <a-form-model-item v-if="col == 'sql'">
                                    <a-input v-model="record.sql"/>
                                </a-form-model-item>
                                <a-form-model-item v-if="col == 'database'">
                                    <a-select v-model="record.databaseId">
                                        <a-select-option :value="1">paper</a-select-option>
                                    </a-select>
                                </a-form-model-item>
                            </template>
                            <template slot="operation" slot-scope="text,record,index">
                                <a-icon type="minus" @click="handleDeleteSetupHooks(index)"/>
                                <a-icon type="plus" @click="handleAddSetupHooks(index)"/>
                            </template>
                            <a-icon type="plus" slot="footer" v-if="testcaseGroupForm.setuphooks.length<=0" @click="handleAddSetupHooks(0)"/>
                        </a-table>
                    </a-collapse-panel>
                </a-collapse>
            </a-form-model>
            <div>
                <div class="choose-config">
                    <a-button type="primary" icon="plus" ghost @click="handleChooseConfig" class="btn">
                        选择配置项
                    </a-button>
                    <a-table :columns="editConfigs" :data-source="chooseConfig" rowKey="id" :pagination="false">
                        <span slot="operation" slot-scope="text,record,index">
                            <a-icon type="minus" @click="handleDeleteConfig(index)"/>
                        </span>
                    </a-table>
                </div>
                <div class="choose-case">
                    <a-select v-model="chooseProjectId" placeholder="选择环境" class="select-project">
                        <a-select-option :value="item.id" v-for="item in projects">
                            {{ item.projectName }}
                        </a-select-option>
                    </a-select>
                    <a-button type="primary" icon="plus" ghost @click="handleChooseCase" class="btn">
                        选择用例
                    </a-button>
                    <a-table :columns="editCases" :data-source="chooseCase" rowKey="caseId" :pagination="false">
                        <span slot="operation" slot-scope="text,record,index">
                            <a-icon type="minus" @click="handleDeleteCase(index)"/>
                        </span>
                    </a-table>
                </div>
            </div>
            <div class="button-o">
            <a-button type="primary" @click="handleEditCaseGroup" class="submit-btn">更新</a-button>
            <a-button @click="handleCancel" class="cancel-btn">取消</a-button>
            </div>
        </div>
        <div>
            <router-view v-if="$route.meta.levels === 3"></router-view>
        </div>

    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { projectList } from '@/services/project/index';
    import { editGroup,groupDetail } from '@/services/caseGroup/index';

    interface GroupDetail {
        id?: number,
        groupName: string,
        projectId: number,
        envId: number,
        testcaseIds: string,
        configIds?: string|null,
        variables: Variable[],
        parameters: Parameter[],
        setuphooks: Setuphook[]
    }

    interface Variable {
        id?: number,
        name: string,
        type: string,
        value: string,
        databaseId?: number
    }

    interface Parameter {
        id?: number,
        name: string,
        value: string
    }

    interface Setuphook {
        id?: number,
        sql: string,
        databaseId: number|null
    }

    interface Project {
        id: number,
        projectName: string
    }

    interface ChooseConfig {
        id: number,
        configName: string
    }

    interface ChooseCase {
        id: number;
        interfaceName: string;
        caseId: number;
        caseName: string;
    }

    @Component({
        components: {}
    })

    export default class AddGroup extends Vue {
        private testcaseGroupForm: GroupDetail={
            groupName: '',
            projectId: 0,
            envId: 1,
            testcaseIds: '',
            configIds: null,
            variables: [],
            parameters: [],
            setuphooks: []
        }

        private projects: Project[]=[];

        private chooseProjectId=null;

        //是个变量
        get chooseConfig(): ChooseConfig[] {
            return this.$store.getters.caseGroupEditConfig;
        }

        get chooseCase(): ChooseCase[] {
            return this.$store.getters.caseGroupEditCase;
        }

        private mounted(): void {
            this.groupDetail(Number(this.$route.params.id));
            this.projectList();
        }

        private projectList(){
            projectList().then(
                (result: any)=>{
                    this.projects=result.retval;
                },
                (err: any)=>{
                    this.$message;
                }
            )
        }

        private groupDetail(id: number){
            groupDetail(id).then(
                (result: any)=>{
                    this.testcaseGroupForm=result.retval;
                    this.$store.commit('caseGroupEditConfig',result.retval.configIds);
                    console.log(979797);
                    this.$store.commit('caseGroupEditCase',result.retval.testcaseIds);

                },
                (err: any)=>{
                    this.$message;
                }
            )
        }

        private handleAddVariables(index: number):void {
            const newData = {
                key: (new Date()).valueOf(),
                name: '',
                type: 'String',
                value: '',
                databaseId: 0
            };
            this.testcaseGroupForm.variables.splice(index+1,0,newData);
        }

        private handleDeleteVariables(index: number): void {
            this.testcaseGroupForm.variables.splice(index,1);
        }

        private handleAddParameters(index: number): void {
            const newData = {
                key: (new Date()).valueOf(),
                name: '',
                value: ''
            };
            this.testcaseGroupForm.parameters.splice(index+1,0,newData);
        }

        private handleDeleteParameters(index: number): void {
            this.testcaseGroupForm.parameters.splice(index,1);
        }

        private handleAddSetupHooks(index: number): void {
            const newData = {
                key: (new Date()).valueOf(),
                sql: '',
                databaseId: null
            };
            this.testcaseGroupForm.setuphooks.splice(index+1,0,newData);
        }

        private handleDeleteSetupHooks(index: number): void {
            this.testcaseGroupForm.setuphooks.splice(index,1);
        }

        private handleChooseCase(): void {
            console.log('选择用例');
            this.$router.push({
                name: 'editChooseCase',
                params: {id: String(this.chooseProjectId)}
            });
        }

        private handleChooseConfig(): void {
            this.$router.push({
                name: 'editChooseConfig'
            });
        }

        private handleDeleteConfig(index: number): void {
            this.chooseConfig.splice(index,1);
            this.$store.commit('caseGroupEditConfig',this.chooseConfig);
        }

        private handleDeleteCase(index: number): void {
            this.chooseCase.splice(index,1);
            this.$store.commit('caseGroupEditCase',this.chooseCase);
        }

        private handleEditCaseGroup(): void {
            let that=this;
            if(this.chooseConfig.length>0){
                let configList: number[]=[];
                this.chooseConfig.forEach(function (value: ChooseConfig) {
                    configList.push(value.id);
                });
                this.testcaseGroupForm.configIds='['+String(configList)+']';
            }else {
                this.testcaseGroupForm.configIds=null;
            }
            if(this.chooseCase.length>0){
                let caseList: number[]=[];
                this.chooseCase.forEach(function (value: ChooseCase) {
                    caseList.push(value.caseId);
                });
                this.testcaseGroupForm.testcaseIds='['+String(caseList)+']';
            }else {
                this.testcaseGroupForm.testcaseIds='';
            }
            editGroup(this.testcaseGroupForm).then(
                (result: any)=>{
                    if (result.errcode === "0") {
                        this.$message.success("更新成功！")
                        this.$router.go(-1);
                        this.$store.commit('caseGroupEditConfig',[]);
                        this.$store.commit('caseGroupEditCase',[]);
                    }
                },
                (err: any)=>{
                    this.$message;
                }
            )

        }

        private handleCancel(): void {
            this.$router.go(-1);
        }

        private variablesColumns= [
            {
                title: 'name',
                dataIndex: 'name',
                width: '15%',
                scopedSlots: { customRender: 'name' },
            },
            {
                title: 'type',
                dataIndex: 'type',
                width: '10%',
                scopedSlots: { customRender: 'type' },
            },
            {
                title: 'value',
                dataIndex: 'value',
                scopedSlots: { customRender: 'value' },
            },
            {
                title: '所属数据库',
                dataIndex: 'database',
                scopedSlots: { customRender: 'database' },
            },
            {
                title: '操作',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' },
            },
        ];
        private parametersColumns= [
            {
                title: 'name',
                dataIndex: 'keyName',
                width: '15%',
                scopedSlots: {customRender: 'name'},
            },
            {
                title: 'value',
                dataIndex: 'value',
                scopedSlots: { customRender: 'value' },
            },
            {
                title: '操作',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' },
            },
        ]
        private setuphooksColumns = [
            {
                title: 'sql',
                dataIndex: 'sql',
                width: '50%',
                scopedSlots: {customRender: 'sql'},
            },
            {
                title: '所属数据库',
                dataIndex: 'database',
                scopedSlots: { customRender: 'database' },
            },
            {
                title: '操作',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' },
            },
        ]

        private editConfigs = [
            {
                title: 'id',
                dataIndex: 'id',
            },
            {
                title: 'configName',
                dataIndex: 'configName'
            },
            {
                title: '操作',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation'}
            }
        ]

        private editCases = [
            {
                title: 'caseId',
                dataIndex: 'caseId',
            },
            {
                title: 'caseName',
                dataIndex: 'caseName'
            },
            {
                title: '操作',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation'}
            }
        ]
    }
</script>

<style>
    .select-project {
        margin-top: 10px;
        width: 200px;
    }

    .choose-config {
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .button-o {
        margin-top: 20px;
    }

    .button-o .submit-btn {
        left: 50%;
        margin-left: -90px;
    }

    .button-o .cancel-btn {
        left: 50%;
        margin-left: 30px;
    }

</style>
