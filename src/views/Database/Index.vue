<template>
    <div>
        <a-form-model layout="inline" class="searchForm">
            <a-form-model-item label="数据库名称：">
                <a-input  v-model="searchData.dbName"></a-input>
            </a-form-model-item>
            <a-form-model-item label="所属环境：">
                <a-select v-model="searchData.envId">
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
        <a-table :columns="columns" :data-source="databaseData" rowKey="id" class="databaseTable" :pagination="paginationConf" @change="handlePageChange">
        <span slot="env" slot-scope="envId">
            {{ envId == 1 ? '测试':'生产' }}
        </span>
            <span slot="updatedAt" slot-scope="updatedAt">
            {{ updatedAt | formatDate }}
        </span>
            <span slot="operation" slot-scope="record">
            <a @click="handleEdit(record.id)">编辑</a>
            <a @click="handleDel(record.id)">删除</a>
        </span>
            <span slot="pagination" :default-current="2" :total="50"/>
        </a-table>
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { searchDatabase,deleteDatabase } from '@/services/database/index';
    import { Pagination } from "ant-design-vue";

    interface SearchCondition{
        current: number,
        pageSize: number,
        envId: number|null,
        dbName: string|null
    }
    interface DatabaseItem{
        id: number,
        dbName: string,
        host: string,
        port: number,
        username: string,
        envId: number,
        updatedAt: string
    }

    @Component({
        components: {}
    })
    export default class Database extends Vue {

        private searchData: SearchCondition={
            current:1,
            pageSize:10,
            envId:null,
            dbName:null
        }
        private databaseData: DatabaseItem[]=[];
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
        private columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '数据库名称',
                dataIndex: 'dbName',
                key: 'dbName'
            },
            {
                title: 'host',
                dataIndex: 'host',
                key: 'host',
            },
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username'
            },
            {
                title: '所属环境',
                dataIndex: 'envId',
                key: 'envId',
                scopedSlots: { customRender: 'env' }
            },
            {
                title: '最后编辑人',
                key: 'updatedBy',
                dataIndex: 'updatedBy',
            },
            {
                title: '更新时间',
                key: 'updatedAt',
                dataIndex: 'updatedAt',
                scopedSlots: { customRender: 'updatedAt' },
            },
            {title: '操作', key: 'operation', scopedSlots: {customRender: 'operation'}},


        ];

        private mounted():void{
            this.getDatabaseList(this.searchData);
        }

        private getDatabaseList(searchData : SearchCondition): void{
            searchDatabase(searchData).then(
                (result: any) => {
                    if (result.errcode === "0") {
                        this.databaseData=result.retval.databaseList;
                        this.paginationConf.total=result.retval.total;
                    }
                },
                (err: any) => {
                    this.$message;
                }
            )
        }

        private handleSearch(): void{
            this.paginationConf.current = 1;
            this.searchData.current=1;
            this.searchData.pageSize=this.pageSize;
            this.getDatabaseList(this.searchData);
        }

        private handleReset(): void{
            this.paginationConf.current = 1;
            this.searchData.current=1;
            this.searchData.envId=null;
            this.searchData.dbName=null;
            this.getDatabaseList(this.searchData);
        }

        private handlePageChange(pagination: Pagination): void{
            //修改列表组建中的值
            this.paginationConf.current = pagination.current as number;
            if (this.pageSize !== pagination.pageSize) {
                this.paginationConf.current = 1;
                this.pageSize = pagination.pageSize as number;
            }
            //修改查询条件中的值
            this.searchData.current=this.paginationConf.current;
            this.searchData.pageSize=this.pageSize;
            this.getDatabaseList(this.searchData);
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }

        private handleAdd(): void{
            this.$router.push({
                name: 'databaseAdd',
            })
        }

        private handleEdit(id: number): void{
            this.$router.push({
                name: 'databaseEdit',
                params: {id: String(id)}
            });
        }

        private handleDel(id: number): void{
            deleteDatabase(id).then(
                (result: any) => {
                    if (result.errcode === "0") {
                        this.handleSearch();
                    }
                },
                (err: any) => {
                    this.$message;
                }
            )
        }

    }

</script>
