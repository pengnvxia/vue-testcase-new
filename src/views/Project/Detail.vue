
<template>
    <div>
    <div v-if="$route.meta.levels !== 3">
        <a-radio-group style="margin-top: 16px; margin-bottom: 10px;" v-model="proEnv" @change="moduleList">
            <a-radio-button value="1">
                测试
            </a-radio-button>
            <a-radio-button value="2">
                生产
            </a-radio-button>
        </a-radio-group>
    <a-tabs @change="interfaceList" v-model="activeKey">
        <a-tab-pane :key="moduleItem.id" v-for="moduleItem in modules" :tab="moduleItem.moduleName">
            <a-table :columns="columns" :data-source="interInfo" class="components-table-demo-nested" rowKey="id">
                <template slot="updatedAt" slot-scope="updatedAt">
                    {{ updatedAt | formatDate }}
                </template>
        <span slot="operation" slot-scope="record">
        <a @click="handleInterInfo(record.id)">编辑</a>
<!--        <a>删除</a>-->
        </span>
                <a-table
                        slot="expandedRowRender"
                        slot-scope="interInfoOne"
                        :columns="innerColumns"
                        :data-source="interInfoOne.testcaseInfos"
                        :pagination="false" rowKey="caseId"
                >
                     <span slot="caseEnv" slot-scope="caseEnvId">
                                {{ caseEnvId == 1 ? '测试': '生产' }}
                            </span>
                    <span slot="caseUpdatedAt" slot-scope="caseUpdatedAt">
                        {{ caseUpdatedAt | formatDate }}
                    </span>

                    <a slot="caseName" slot-scope="text,record" @click="handleReport(record.caseId)">{{ text }}</a>
            <span slot="operation" slot-scope="testcaseInfoOne" class="table-operation">
                <a @click="handleEditTestcase(testcaseInfoOne.caseId)">编辑</a>
                <a @click="handleRunTestcase(testcaseInfoOne.caseId)">运行</a>
                <a-dropdown>
                <a-menu slot="overlay">
                <a-menu-item @click="handleDeleteTestcase(testcaseInfoOne.caseId)">
                删除
                </a-menu-item>
                <a-menu-item>
                复制
                </a-menu-item>
                </a-menu>
                <a>···<a-icon type="down" /> </a>
                 </a-dropdown>
            </span>
                    <a-button slot="footer" class="addCaseBtn" @click="handleAddCase(interInfoOne.id)">添加</a-button>
                </a-table>
                <a-button class="addCaseBtn" slot="footer" @click="visibleAddInterface=!visibleAddInterface">新增接口</a-button>
            </a-table>
        </a-tab-pane>
        <a-button slot="tabBarExtraContent" @click=" visible = !visible">
            添加模块
        </a-button>
    </a-tabs>
        <a-modal v-model="visible" title="添加模块" on-ok="handleOk">
            <template slot="footer">
                <a-button key="submit" type="primary" :loading="loading" @click="handleAddModule">
                    提交
                </a-button>
                <a-button key="back" @click="handleCancel">
                    取消
                </a-button>
            </template>
            <a-form-model class="form" :rules="roleRules" :model="moduleForm" ref="moduleRuleForm">
                <a-form-model-item prop="moduleName" label="模块名称："  :label-col="{ span: 4 }"  :wrapper-col="{ span: 20 }">
                    <a-input v-model="moduleForm.moduleName" placeholder="输入..."></a-input>
                </a-form-model-item>
                <a-form-model-item prop="description" label="备注：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                    <a-textarea v-model="moduleForm.description" placeholder="输入..."></a-textarea>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
        <a-modal v-model="visibleAddInterface" title="添加接口" on-ok="handleOk">
            <template slot="footer">
                <a-button key="submit" type="primary" :loading="loading" @click="handleAddInterface">
                    提交
                </a-button>
                <a-button key="back" @click="visibleAddInterface=false">
                    取消
                </a-button>
            </template>
            <a-form-model class="form" :rules="interfaceRoleRules" :model="interfaceForm" ref="interfaceRuleForm">
                <a-form-model-item prop="interfaceName" label="接口名称："  :label-col="{ span: 4 }"  :wrapper-col="{ span: 20 }">
                    <a-input v-model="interfaceForm.interfaceName" placeholder="输入..."></a-input>
                </a-form-model-item>
                <a-form-model-item prop="interfaceAddress" label="地址："  :label-col="{ span: 4 }"  :wrapper-col="{ span: 20 }">
                    <a-input v-model="interfaceForm.interfaceAddress" placeholder="输入如/aa/bb"></a-input>
                </a-form-model-item>
                <a-form-model-item prop="interfaceMethod" label="请求类型："  :label-col="{ span: 4 }"  :wrapper-col="{ span: 20 }">
                    <a-select v-model="interfaceForm.interfaceMethod" defaultValue="GET">
                        <a-select-option value="GET">
                            GET
                        </a-select-option>
                        <a-select-option value="POST">
                            POST
                        </a-select-option>
                        <a-select-option value="DELETE">
                            DELETE
                        </a-select-option>
                        <a-select-option value="PUT">
                            PUT
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item prop="description" label="备注：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                    <a-textarea v-model="interfaceForm.description" placeholder="输入..."></a-textarea>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
        <div>
            <router-view v-if="$route.meta.levels === 3" v-on:info="handleInfo"></router-view>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { getModuleList, getInterfaceList, addModule } from '@/services/project/index';
    import {deleteTestcase, runtestcase, addInterfaceInfo} from '@/services/testcase/index'

    interface Mod{
        id: number;
        moduleName: string;
    }
    interface Inter {
        id: number;
        name: string;
        url?: string;
        updatedBy?: string;
        updatedAt?: string;
        testcaseInfos: Testcase[];
    }
    interface Testcase {
        id: number,
        caseName: string;
        caseEnvId: number;
        caseUpdatedBy?: string;
        caseUpdatedAt?: string;
    }
    @Component
    export default class Detail extends Vue {
        private proEnv: string = '1';
        private modules: Mod[] = [];
        private moduleId: number = 0;
        private repositoryId: number = Number(this.$route.params.id);
        private interInfo: Inter[] = [];
        private activeKey: number = 0;
        private visible: boolean = false;
        private visibleAddInterface: boolean = false;
        private loading: boolean = false;
        private flag: boolean = false;
        private moduleForm: any={
            moduleName: "",
            description: ""
        };
        private interfaceForm: any={
            interfaceName: "",
            interfaceAddress: "",
            interfaceMethod: "",
            description: ""
        };
        private roleRules: any = {
            moduleName: [
                {
                    required: true,
                    message: "请输入模块名称",
                    trigger: "blur"
                }
            ],
        };
        private interfaceRoleRules:any = {
            interfaceName: [
                {
                    required: true,
                    message: "请输入接口名称",
                    trigger: "blur"
                }
            ],
            interfaceAddress: [
                {
                    required: true,
                    message: "请输入接口地址",
                    trigger: "blur"
                }
            ]
        }
        private columns = [
            {title: '接口名称', dataIndex: 'name', key: 'name'},
            {title: '地址', dataIndex: 'url', key: 'url'},
            {title: '最后编辑人', dataIndex: 'updatedBy', key: 'updatedBy'},
            {title: '更新时间', dataIndex: 'updatedAt', key: 'updatedAt',scopedSlots: {customRender: 'updatedAt'}},
            {title: '操作', key: 'operation', scopedSlots: {customRender: 'operation'}},
        ];
        // private data = [{key: 1,name: 'Screem',address: 'iOS',updator: 'Jack',updatedAt: '2014-12-24 23:12:00'}];
        //
        private innerColumns = [
            {title: '用例名称', dataIndex: 'caseName', key: 'caseName',scopedSlots:{customRender:'caseName'}},
            {title: '所属环境', dataIndex: 'caseEnvId', key: 'caseEnvId',
                scopedSlots: { customRender: 'caseEnv' }
            },
            {title: '最后编辑人', dataIndex: 'caseUpdatedBy', key: 'caseUpdatedBy'},
            {title: '更新时间', dataIndex: 'caseUpdatedAt', key: 'caseUpdatedAt',scopedSlots:{customRender:'caseUpdatedAt'}},
            {
                title: '操作',
                key: 'operation',
                scopedSlots: {customRender: 'operation'},
            },
        ];
        // private innerData = [{key: 1, "environment": "测试环境",updator: 'Jack',updatedAt: '2014-12-24 23:12:00',caseName: 'This is production name'}];
        private mounted(): void {
            this.moduleList();
        }



        private moduleList(): void{
            getModuleList(Number(this.proEnv), this.repositoryId).then(
                (result: any) => {
                    if (result.errcode === "0") {
                        this.modules = result.retval;
                        if(this.modules.length>0){
                            if(this.activeKey === 0){
                                this.activeKey = this.modules[this.modules.length-1].id;
                            }
                            this.interfaceList(this.activeKey);
                        }

                    }
                },
                (err: any) => {
                    this.$message;
                }
            );
        }

        private interfaceList(activeKey: number): void{
            this.moduleId =  activeKey;
            getInterfaceList(Number(this.proEnv), this.repositoryId, this.moduleId ).then(
                (result: any) => {
                    if (result.errcode === "0"){
                        this.interInfo = result.retval;
                    }
                },
                (err: any) => {
                    this.$message;
                }
            );

        }

        private handleAddModule(): void{
            const ref: any = this.$refs.moduleRuleForm;
            ref.validate((valid: boolean) => {
                if(valid) {
                    this.loading = true;
                    addModule(Number(this.proEnv),this.repositoryId,this.moduleForm.moduleName,this.moduleForm.description).then(
                        (result: any) => {
                            if (result.errcode === "0"){
                                this.$message.success("添加成功");
                                this.loading = false;
                                this.visible = false;
                                this.moduleList();
                            }
                        },
                        (err: any) => {
                            if (err.errcode === "MO002") {
                                this.$message;
                                return;
                            }
                            this.$message;
                        }
                    );
                }else {
                    return false;
                }
            })

        }

        private handleCancel(): void{
            this.visible = false;
        }

        private handleAddCase(interid:number): void{
            this.$router.push({
                path:`/detail/${this.$route.params.id}/addcase/${this.$route.params.id}/${this.proEnv}/${interid}`

                // path:`/addcase/${id}`
            });
        }
        private handleInfo(data: any): void{
            if(data==="1"){
                console.log()
                this.moduleList();
                this.$router.push(
                    {
                        path: `/detail/${this.$route.params.id}`
                    }
                )
            }
        }

        private handleReport(id:number): void{
            this.$router.push({
                name: 'report',
                params:{
                    id: String(id),
                },
                query:{
                    group: '0'
                }
                // path:`/report/${id}`
            })
        }

        private handleEditTestcase(interid: number): void{
            this.$router.push({
                path:`/detail/${this.$route.params.id}/editcase/${this.$route.params.id}/${this.proEnv}/${interid}`
            })
        }

        private handleRunTestcase(caseId: number): void{
            var caseIds: number[] = [];
            caseIds.push(caseId);
            var that: any=this;
            this.$confirm({
                // title: `需要在运行用例后删除项目数据信息吗？`,
                title: `确定要运行用例吗？`,
                // content: '删除后不能查看数据!',
                onOk(){
                    that.flag=true;
                    runtestcase(caseIds,Number(that.$route.params.id),Number(that.proEnv),that.flag).then(

                        (result: any) => {
                            if (result.errcode === "0"){
                                that.$message.success("用例正在运行，请稍后查看结果！")
                            }
                        },
                        (err: any) => {
                            that.$message.error(err.errmsg);
                        }
                    )
                },
                onCancel(){
                    that.flag=false;
                    console.log(that.flag,1111);
                    runtestcase(caseIds,Number(that.$route.params.id),Number(that.proEnv),that.flag).then(

                        (result: any) => {
                            if (result.errcode === "0"){
                                that.$message.success("用例正在运行，请稍后查看结果！")
                            }
                        },
                        (err: any) => {
                            that.$message.error(err.errmsg);
                        }
                    )
                }

            });

        }

        private handleDeleteTestcase(id:number): void{
            deleteTestcase(id).then(
                (result: any) => {
                    if (result.errcode === "0"){
                        this.$message.success("删除成功");
                        this.moduleList();
                    }
                },
                (err: any) => {
                    this.$message;
                }

            );
        }

        private handleAddInterface(): void{
            const ref: any = this.$refs.interfaceRuleForm;
            ref.validate((valid: boolean) => {
                if (valid) {
                    addInterfaceInfo(this.interfaceForm,Number(this.$route.params.id),this.moduleId,Number(this.proEnv)).then(
                        (result: any) => {
                            if (result.errcode==="0"){
                                this.$message.success("新增成功，即将跳转到编辑页面");
                                this.handleInterInfo(result.retval.interfaceId);
                            }
                        },
                        (err: any) => {
                            this.$message;
                        }
                    )
                } else {
                    return false;
                }
            })

        }

        private handleInterInfo(id:number): void {
            this.$router.push({
                name: 'rappage',
                params: {id: String(id)}
            });
            // this.$router.push({
            //     path:`/detail/${this.$route.params.id}/addcase/${this.$route.params.id}/${this.proEnv}/${id}`
            // });
            // window.open('http://172.16.9.170:3000/repository/editor?id='+String(id),'_blank');
        }

    }

</script>
<style scoped>
    span >>> a {
        display: inline-block;
        margin-right: 10px;
    }
</style>
