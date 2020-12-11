<template>
    <div>
        <a-form-model layout="inline" class="searchForm">
            <a-form-model-item label="配置名称：">
                <a-input  v-model="configName"></a-input>
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
        <a-table :columns="columns"
                 :row-selection="rowSelection"
                 :data-source="configData" class="configTable" :pagination="paginationConf" @change="handlePageChange"
                 :rowKey="(record) => {return record.id + '_' + record.configName}"
        >
        <span slot="env" slot-scope="envId">
            {{ envId == 1 ? '测试':'生产' }}
        </span>
            <span slot="updatedAt" slot-scope="updatedAt">
            {{ updatedAt | formatDate }}
        </span>
            <span slot="pagination" :default-current="2" :total="50"/>
        </a-table>
        <div class="sub-btn">
            <a-button type="primary" @click="handleAdd" class="submit-btn">添加</a-button>
            <a-button @click="handleCancel" class="cancel-btn">取消</a-button>
        </div>
    </div>

</template>



<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { searchConfig,configDelete } from '@/services/testcaseConfig/index';
    import { Pagination } from "ant-design-vue";


    interface ConfigItem {
        id: number,
        configName: string,
        projectId: number,
        projectName: string,
        envId: number
        updatedBy?: string,
        updatedAt?: string,
        description?: string,
    }

    interface ChooseConfig {
        id: number,
        configName: string
    }

    @Component({
        components: {}
    })
    export default class Config extends Vue {
        private configName: string='';
        private projectName: string='';
        private envId: number|null= null;
        private configData: ConfigItem[]=[];
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
        private selectedRowKeys: any[] = [];
        private columns = [
            {
                title: '配置名称',
                dataIndex: 'configName',
                key: 'configName'
            },
            {
                title: '所属项目',
                dataIndex: 'projectName',
                key: 'projectName',
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
            {
                title: '备注',
                key: 'description',
                dataIndex: 'description'
            }


        ];

        private mounted():void {
            this.getConfigList(this.paginationConf.current,this.pageSize);
            // this.processConfig();
        }

        // private processConfig(): void {
        //     let that=this;
        //     if(this.$store.getters.caseGroupEditConfig.length>0){
        //         (this.$store.getters.caseGroupEditConfig).forEach(function(value: ChooseConfig){
        //             that.selectedRowKeys.push(value.id+'_'+value.configName);
        //         })
        //     }
        //
        // }

        private getConfigList(current: number, size: number,configName? : string,envId? : number|null,projectName? : string,lastUpdatedBy? : string){
            searchConfig(current,size,configName,envId,projectName,lastUpdatedBy).then(
                (result: any) => {
                    if (result.errcode === "0") {
                        this.configData=result.retval.configsList;
                        this.paginationConf.total=result.retval.total;
                    }
                },
                (err: any) => {
                    this.$message.error(err.message);
                }
            )
        }


        private handlePageChange(pagination: Pagination): void{
            this.paginationConf.current = pagination.current as number;
            if (this.pageSize !== pagination.pageSize) {
                this.paginationConf.current = 1;
                this.pageSize = pagination.pageSize as number;
            }
            this.getConfigList(this.paginationConf.current,this.pageSize);
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }

        private handleSearch(): void {
            this.paginationConf.current=1;
            this.getConfigList(this.paginationConf.current,this.pageSize,this.configName,this.envId,this.projectName);
        }

        private handleReset(): void {
            this.configName='';
            this.envId=null;
            this.projectName='';
            this.paginationConf.current=1;
            this.getConfigList(this.paginationConf.current,this.pageSize,this.configName,this.envId,this.projectName);
        }


        private get rowSelection(): object {
            // const selectedRowKeys: string[] = this.selectedRowKeys;
            return {
                onChange: this.handleSelectKeyChange,
                hideDefaultSelections: true
            }
        }

        private handleSelectKeyChange(selectedRowKeys: Array<string>): any {
            this.selectedRowKeys=[];
            let that = this;
            (selectedRowKeys as string[]).forEach(function(value: string){
                let temporyList = value.split('_');
                that.selectedRowKeys.push({id:Number(temporyList[0]),configName: temporyList[1]})
            })
        }

        private handleAdd(): void {
            this.$store.commit('caseGroupEditConfig',this.selectedRowKeys);
            this.$router.go(-1);
        }

        private handleCancel(): void {
            this.$router.go(-1);
        }

    }
</script>

<style>

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

    .sub-btn .submit-btn {
        left: 50%;
        margin-left: -90px;
    }

    .sub-btn .cancel-btn {
        left: 50%;
        margin-left: 30px;
    }


</style>
