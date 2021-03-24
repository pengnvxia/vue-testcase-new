<template>
    <div>
        <a-form-model layout="inline" class="searchForm">
            <a-form-model-item label="用例组名称：">
                <a-input  v-model="groupName"></a-input>
            </a-form-model-item>
            <a-form-model-item label="项目名称：">
                <a-input v-model="projectName"></a-input>
            </a-form-model-item>
            <a-form-model-item label="所属环境：">
                <a-select v-model="envId">
                    <a-select-option :value="1">
                        测试
                    </a-select-option>
                    <a-select-option :value="2">
                        生产
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <!--            <a-form-model-item label="最后编辑人：">-->
            <!--                <a-select>-->
            <!--                    <a-select-option value="pengyishuang">pengyishuang</a-select-option>-->
            <!--                </a-select>-->
            <!--            </a-form-model-item>-->
            <a-form-model-item>
                <a-button type="primary" @click="handleSearch">搜索</a-button>
                <a-button @click="handleReset">重置</a-button>
            </a-form-model-item>
        </a-form-model>
        <a-button type="primary" class="btn" @click="handleAdd">
            新增
        </a-button>
        <a-table :columns="columns" :data-source="groupData" rowKey="id" class="groupTable" :pagination="paginationConf" @change="handlePageChange">
            <a slot="groupName" slot-scope="text,record" @click="handleReport(record.id)">{{text}}</a>
            <span slot="env" slot-scope="envId">
                {{ envId == 1 ? '测试':'生产' }}
            </span>
                <span slot="updatedAt" slot-scope="updatedAt">
                {{ updatedAt | formatDate }}
            </span>
                <span slot="operation" slot-scope="record">
                <a @click="handleRun(record.id)">运行</a>
                <a @click="handleEdit(record.id)">编辑</a>
                <a @click="handleDelete(record.id)">删除</a>
            </span>
                <span slot="pagination" :default-current="2" :total="50"/>
        </a-table>
    </div>
</template>



<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { searchList } from '@/services/caseGroup/index';
    import { Pagination } from "ant-design-vue";
    import { runGroup,deleteGroup } from "@/services/caseGroup/index";


    interface GroupItem {
        id: number,
        groupName: string,
        projectId: number,
        projectName: string,
        envId: number,
        updatedBy?: string,
        updatedAt?: string,
        description?: string
    }

    @Component
    export default class CaseGroup extends Vue{
        private groupName: string = '';
        private projectName: string = '';
        private envId: number = 1;
        private groupData: GroupItem[]=[];
        private pageSize: number = 10;
        private paginationConf: any = {
            total: 0,
            showSizeChanger: true,
            showTotal: (total: number) => `共 ${total} 条记录`,
            // hideOnSinglePage: true,
            defaultPageSize: this.pageSize,
            pageSizeOptions: ["10", "20"],
            current: 1
        };
        private columns=[
            {
                title: '用例组名称',
                dataIndex: 'groupName',
                key: 'groupName',
                scopedSlots: { customRender: 'groupName' }
            },
            {
                title: '所属项目',
                dataIndex: 'projectName',
                key: 'projectName'
            },
            {
                title: '环境',
                dataIndex: 'envId',
                key: 'envId',
                scopedSlots: { customRender: 'env' }
            },
            {
                title: '更新时间',
                dataIndex: 'updatedAt',
                key: 'updatedAt',
                scopedSlots: { customRender: 'updatedAt' }
            },
            {
                title: '更新人',
                dataIndex: 'updatedBy',
                key: 'updatedBy'
            },
            {
                title: '备注',
                dataIndex: 'description',
                key: 'description'
            },
            {
                title: '操作',
                key: 'operation',
                scopedSlots: {customRender: 'operation'}
            }
        ]

        private mounted():void {
            this.getGroup(this.paginationConf.current,this.pageSize,null,null,1);
        }

        private getGroup(current:number,size:number,groupName?:string|null,projectName?:string|null,envId?:number|null): void{
            searchList(current,size,groupName,projectName,envId).then(
                (result: any) => {
                    if (result.errcode === "0") {
                        this.groupData=result.retval.groupList;
                        this.paginationConf.total=result.retval.total;
                    }
                },
                (err: any) => {
                    this.$message;
                }
            )
        }

        private handlePageChange(pagination: Pagination): void{
            this.paginationConf.current = pagination.current as number;
            if (this.pageSize !== pagination.pageSize) {
                this.paginationConf.current = 1;
                this.pageSize = pagination.pageSize as number;
            }
            this.getGroup(this.paginationConf.current,this.pageSize,this.groupName,this.projectName,this.envId);
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }

        private handleSearch(): void{
            this.paginationConf.current=1;
            this.getGroup(this.paginationConf.current,this.pageSize,this.groupName,this.projectName,this.envId);
        }

        private handleReset(): void{
            this.groupName='';
            this.projectName='';
            this.envId=1;
            this.handleSearch();
        }

        private handleAdd(): void{
            this.$router.push({
                name: 'groupAdd'
            });
        }

        private handleEdit(id: number): void{
            this.$router.push({
                name: 'groupEdit',
                params: {id: String(id)}
            })
        }

        private handleRun(id: number): void {
            let groupIds: number[]=[];
            groupIds.push(id);
            runGroup(groupIds).then(
                (result: any) => {
                    if (result.errcode === "0") {
                        this.$message.success("正在运行用例组，请到报告页面查看结果！");
                    }
                },
                (err: any) => {
                    this.$message;
                }
            )
        }

        private handleDelete(id: number): void {
            deleteGroup(id).then(
                (result: any) => {
                    if (result.errcode === "0") {
                        this.$message.success("删除成功！");
                        this.paginationConf.current=1;
                        this.getGroup(this.paginationConf.current,this.pageSize,this.groupName,this.projectName,this.envId);
                    }
                },
                (err: any) => {
                    this.$message;
                }
            )
        }

        private handleReport(id:number): void{
            this.$router.push({
                name: 'report',
                params:{
                    id: String(id),
                },
                query:{
                    group: '1'
                }
                // path:`/report/${id}`
            })
        }
    }

</script>
<style lang="scss" scoped>
    .searchForm {
        margin: 30px 0px 20px;
    }

    .searchForm .ant-form-item-control-wrapper {
        width: 300px;
    }

    .ant-btn {
        margin-left: 50px;
    }

    .btn {
        margin-left: 0px;
        margin-bottom: 20px;
        background-color:#1890ff;
    }
</style>
