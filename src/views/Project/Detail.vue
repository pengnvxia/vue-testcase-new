
<template>
    <div>
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
        <span slot="operation" slot-scope="text">
        <a>编辑</a>
        <a>删除</a>
        </span>
                <a-table
                        slot="expandedRowRender"
                        slot-scope="interInfoOne"
                        :columns="innerColumns"
                        :data-source="interInfoOne.testcaseInfos"
                        :pagination="false" rowKey="caseId"
                >
            <span slot="operation" slot-scope="text" class="table-operation">
        <a>编辑</a>
        <a>运行</a>
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item>
              删除
            </a-menu-item>
            <a-menu-item>
              复制
            </a-menu-item>
          </a-menu>
          <a>···<a-icon type="down" /> </a>
        </a-dropdown>
      </span>
                    <a-button slot="footer" class="addCaseBtn">添加</a-button>
                </a-table>
            </a-table>
        </a-tab-pane>
<!--        <a-tab-pane key="2" tab="Tab 2">-->
<!--            Content of Tab Pane 2-->
<!--        </a-tab-pane>-->
        <a-tab-pane :key="-1">
            <a-icon slot="tab" type="plus" />
            Content of Tab Pane 3
        </a-tab-pane>

    </a-tabs>
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { getModuleList,getInterfaceList } from '@/services/project/index';

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
        // private innerData: Testcase[]=[];
        private columns = [
            {title: '接口名称', dataIndex: 'name', key: 'name'},
            {title: '地址', dataIndex: 'url', key: 'url'},
            {title: '最后编辑人', dataIndex: 'updatedBy', key: 'updatedBy'},
            {title: '更新时间', dataIndex: 'updatedAt', key: 'updatedAt'},
            {title: '操作', key: 'operation', scopedSlots: {customRender: 'operation'}},
        ];
        // private data = [{key: 1,name: 'Screem',address: 'iOS',updator: 'Jack',updatedAt: '2014-12-24 23:12:00'}];
        //
        private innerColumns = [
            {title: '用例名称', dataIndex: 'caseName', key: 'caseName'},
            {title: '所属环境', dataIndex: 'caseEnvId', key: 'caseEnvId'},
            {title: '最后编辑人', dataIndex: 'caseUpdatedBy', key: 'caseUpdatedBy'},
            {title: '更新时间', dataIndex: 'caseUpdatedAt', key: 'caseUpdatedAt'},
            {
                title: '操作',
                dataIndex: 'operation',
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
                        this.activeKey = this.modules[0].id;
                        this.interfaceList(this.activeKey);
                    }
                },
                (err: any) => {
                    this.$message.error(err.errmsg);
                }
            );
        }

        private interfaceList(activeKey: number): void{
            console.log(activeKey);
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
            )
        }

    }

</script>
<style>
    span a {
        display: inline-block;
        margin-right: 10px;
    }
</style>
