<template>
    <div>
            <a-select v-model="proEnv" disabled>
                <a-select-option value="1">测试</a-select-option>
                <a-select-option value="2">生产</a-select-option>
            </a-select>
            <a-tabs @change="interfaceList" v-model="activeKey">
                <a-tab-pane :key="moduleItem.id" v-for="moduleItem in modules" :tab="moduleItem.moduleName">
                    <a-table :columns="columns" :data-source="interInfo" class="components-table-demo-nested" rowKey="id"
                    >
                        <template slot="updatedAt" slot-scope="updatedAt">
                            {{ updatedAt | formatDate }}
                        </template>
                        <span slot="operation" slot-scope="text"/>

                        <a-table
                                :row-selection="rowSelection"
                                slot="expandedRowRender"
                                slot-scope="interInfoOne"
                                :columns="innerColumns"
                                :data-source="interInfoOne.testcaseInfos"
                                :pagination="false" :rowKey="(record) => { return interInfoOne.id + '_' + interInfoOne.name + '_' + record.caseId + '_' + record.caseName}"
                        >
                            <span slot="caseEnv" slot-scope="caseEnvId">
                                {{ caseEnvId == 1 ? '测试': '生产' }}
                            </span>
                    <span slot="caseUpdatedAt" slot-scope="caseUpdatedAt">
                        {{ caseUpdatedAt | formatDate }}
                    </span>
                        </a-table>
                    </a-table>
                </a-tab-pane>
            </a-tabs>
        <div class="btn">
            <a-button type="primary" @click="handleAdd" class="submit-btn">添加</a-button>
            <a-button @click="handleBack" class="cancel-btn">取消</a-button>
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

    interface EditCase {
        // id: number;
        // interfaceName: string;
        caseId: number;
        caseName: string;
        caseEnvId: number;
        caseUpdatedAt: string;
    }
    @Component
    export default class Detail extends Vue {
        private proEnv: string = this.$route.params.id;
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
            {title: '接口名称', dataIndex: 'name', key: 'name',
                // children: [
                //     {title: '用例名称', dataIndex: 'caseName', key: 'caseName',scopedSlots:{customRender:'caseName'}}
                // ]
            },
            {title: '地址', dataIndex: 'url', key: 'url'},
            {title: '最后编辑人', dataIndex: 'updatedBy', key: 'updatedBy'},
            {title: '更新时间', dataIndex: 'updatedAt', key: 'updatedAt',scopedSlots: {customRender: 'updatedAt'}},
        ];


        private innerColumns = [
            {title: '用例名称', dataIndex: 'caseName', key: 'caseName',scopedSlots:{customRender:'caseName'}},
            {title: '所属环境', dataIndex: 'caseEnvId', key: 'caseEnvId',
                scopedSlots: { customRender: 'caseEnv' }
            },
            {title: '最后编辑人', dataIndex: 'caseUpdatedBy', key: 'caseUpdatedBy'},
            {title: '更新时间', dataIndex: 'caseUpdatedAt', key: 'caseUpdatedAt',scopedSlots:{customRender:'caseUpdatedAt'}},
        ];

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
                    this.$message.error(err.errmsg);
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
                    this.$message.error(err.errmsg);
                }
            );

        }

        private handleCancel(): void{
            this.visible = false;
        }

        private selectedRowKeys: EditCase[] = [];


        //计算方法
        private get rowSelection(): object {
            // const selectedRowKeys: string[] = this.selectedRowKeys;
            return {
                // onChange: this.handleSelectKeyChange,
                onSelect: this.handleSelect,
                onSelectAll: this.handleSelectAll,
                hideDefaultSelections: true
            }
        }

        private handleAdd(): void {
            // let editCaseList: EditCase[] = [];
            // if(this.selectedRowKeys.length>0){
            //     this.selectedRowKeys.forEach(function (value: string) {
            //         let temporyList = value.split('_');
            //         console.log(temporyList,9999);
            //         editCaseList.push({id:Number(temporyList[0]),interfaceName:temporyList[1],caseId:Number(temporyList[2]),caseName:temporyList[3]})
            //     })
            // }
            // console.log(editCaseList,8888);
            console.log(this.selectedRowKeys,88888)
            this.$store.commit('caseGroupEditCase',this.selectedRowKeys);
            this.$router.go(-1);
        }

        private handleBack():void {
            this.$router.go(-1);
        }

        // private handleExpand(id:number[]): void{
        //     if(id.length==2){
        //         id.splice(0,1);
        //     }
        //     this.expendRoykeys.push(String(id[0]));
        //     console.log(id,333);
        // }
        private handleSelect(record: any,selected: boolean): void {
            if(selected){
                this.selectedRowKeys.push(record);
            }else {
                let recordIndex = this.selectedRowKeys.findIndex(
                    function(value: any) {
                        value==record;
                    });
                this.selectedRowKeys.splice(recordIndex,1);
            }
            // console.log(record,11111);
            // console.log(selected,22222);
        }

        private handleSelectAll(selected: boolean,selectedRows: any,changeRows: any): void{
            // console.log(selected,555);
            // console.log(selectedRows,666);
            // console.log(changeRows,777);
        }

        // private handleExpand(aaa: any): void {
        //     console.log(aaa,999999)
        //     // this.expendRoykeys.push("139");
        //     // console.log(this.expendRoykeys,88888);
        // }

    }

</script>
<style>
    span a {
        display: inline-block;
        margin-right: 10px;
    }
    .btn .submit-btn {
        left: 50%;
        margin-left: -90px;
    }

    .btn .cancel-btn {
        left: 50%;
        margin-left: 30px;
    }
</style>

