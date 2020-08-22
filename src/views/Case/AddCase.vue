<template>
    <a-form-model>
        <div>
            <a-row>
                <a-col :span="12">
            <a-form-model-item prop="projectName" label="用例名称：" :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }">
                <a-input placeholder="输入名称"></a-input>
            </a-form-model-item>
                </a-col>
                <a-col :span="12">
            <a-form-model-item prop="projectName" label="环境：" :label-col="{ span: 2 }" :wrapper-col="{ span:10 }">
                <a-select defaultValue="1">
                    <a-select-option value="1">
                        测试
                    </a-select-option>
                    <a-select-option value="2">
                        生产
                    </a-select-option>
                </a-select>
            </a-form-model-item>
                </a-col>
            </a-row>
            <a-form-model-item prop="projectName" label="配置项：" :label-col="{ span: 2 }" :wrapper-col="{ span: 5 }">
                <a-select mode="multiple" placeholder="Inserted are removed" :value="selectedItems" @change="handleChange">
                    <a-select-option v-for="item in notSelectedItems" :key="item" :value="item">{{ item }}</a-select-option>
                </a-select>
            </a-form-model-item>
        </div>
        <a-collapse expandIconPosition="right">
            <a-collapse-panel  key="2" header="variables">
                <a-table bordered :data-source="variablesDataSource" :columns="variablesColumns" :pagination="false">
                    <template v-for="col in ['name', 'type', 'value', 'database']" :slot="col" slot-scope="text, record, index">
                    <div :key="col">
                        <a-form-model-item>
                            <a-input style="margin: -5px 0" :value="text" v-if="col == 'name' || col == 'value'"/>
                            <a-select v-else style="margin: -5px 0; width: 100px;" :defaultValue="text">
                                <a-select-option value="lucy">Lucy</a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </div>
                    </template>
                    <template slot="operation" slot-scope="text, record, index">
                <a-icon type="minus" @click="handleDeleteVariables(index)"/>
                <a-icon type="plus" @click="handleAddVariables(index)"/>
            </template>
                    <a-icon type="plus" slot="footer" v-if="variablesDataSource.length<=0" @click="handleAddVariables(0)"/>
                </a-table>
            </a-collapse-panel>
            <a-collapse-panel  key="3" header="Parameters">
                <a-table bordered :data-source="parametersDataSource" :columns="parametersColumns" :pagination="false">
                    <template v-for="col in ['name', 'value']" :slot="col" slot-scope="text, record, index">
                        <div :key="col">
                            <a-input style="margin: -5px 0" :value="text"/>
                        </div>
                    </template>
                    <template slot="operation" slot-scope="text, record, index">
                        <a-popconfirm v-if="parametersDataSource.length">
                            <a-icon type="minus" @click="handleDeleteParameters(index)"/>
                        </a-popconfirm>
                        <a-icon type="plus" @click="handleAddParameters(index)"/>
                    </template>
                    <a-icon type="plus" slot="footer" v-if="parametersDataSource.length<=0" @click="handleAddParameters(0)"/>

                </a-table>
            </a-collapse-panel>
            <a-collapse-panel  key="4" header="Setuphooks">
                <a-table bordered :data-source="setuphooksDataSource" :columns="setuphooksColumns" :pagination="false">
                    <template v-for="col in ['sql', 'database']" :slot="col" slot-scope="text, record, index">
                        <div :key="col">
                            <a-input style="margin: -5px 0" :value="text" v-if="col == 'sql'"/>
                            <a-select v-else style="margin: -5px 0; width: 100px;" :defaultValue="text">
                                <a-select-option value="lucy">Lucy</a-select-option>
                            </a-select>
                        </div>
                    </template>
                    <template slot="operation" slot-scope="text, record, index">
                        <a-popconfirm v-if="setuphooksDataSource.length">
                            <a-icon type="minus" @click="handleDeleteSetuphooks(index)"/>
                        </a-popconfirm>
                        <a-icon type="plus" @click="handleAddSetuphooks(index)"/>
                    </template>
                    <a-icon type="plus" slot="footer" v-if="setuphooksDataSource.length<=0" @click="handleAddSetuphooks(0)"/>
                </a-table>
            </a-collapse-panel>
            <a-collapse-panel  key="5" header="Request&Response">
                <div>
                    <h3 class="title">
            request
        </h3>
                    <a-tabs default-active-key="1">
                        <a-tab-pane key="1" tab="headers">
                <a-table bordered :data-source="resHeaderDataSource" :columns="resHeaderColumns" :pagination="false">
                    <template
                            v-for="col in ['keyName', 'value']"
                            :slot="col"
                            slot-scope="text, record, index"

                    >
                        <div :key="col">
                            <a-input
                                    style="margin: -5px 0"
                                    :value="text"
                            />

                        </div>
                    </template>
                    <template slot="operation" slot-scope="text, record">
                        <a-popconfirm
                                v-if="resHeaderColumns.length"
                        >
                            <a-icon type="minus" @click="handleDeleteResHeader(index)"/>
                        </a-popconfirm>
                        <a-icon type="plus" @click="handleAddResHeader(index)"/>
                    </template>
                    <a-icon type="plus" slot="footer" v-if="resHeaderDataSource.length<=0" @click="handleAddResHeader(0)"/>

                </a-table>
            </a-tab-pane>
                        <a-tab-pane key="2" tab="params" force-render>
                <a-table bordered :data-source="resParamsDataSource" :columns="resParamsColumns" :pagination="false">
                    <template
                            v-for="col in ['keyName', 'value']"
                            :slot="col"
                            slot-scope="text, record, index"

                    >
                        <div :key="col">
                            <a-input
                                    style="margin: -5px 0"
                                    :value="text"
                            />

                        </div>
                    </template>
                    <template slot="operation" slot-scope="text, record, index">
                        <a-popconfirm
                                v-if="resParamsColumns.length"
                        >
                            <a-icon type="minus" @click="handleDeleteResParams(index)"/>
                        </a-popconfirm>
                        <a-icon type="plus" @click="handleAddResParams(index)"/>
                    </template>
                    <a-icon type="plus" slot="footer" v-if="resParamsDataSource.length<=0" @click="handleAddResParams(0)"/>

                </a-table>

            </a-tab-pane>
                        <a-tab-pane key="3" tab="requestBody">
                <a-textarea placeholder="Basic usage" :rows="6" />
                        </a-tab-pane>
                    </a-tabs>
                </div>
                <div>
                    <h3 class="title">
             response
         </h3>
                    <a-table bordered :data-source="responseDataSource" :columns="responseColumns" :pagination="false">
                <template
                        v-for="col in ['name', 'type', 'comparator', 'expected']"
                        :slot="col"
                        slot-scope="text, record, index"

                >
                    <div :key="col">
                        <a-select v-if="col == 'comparator'" style="margin: -5px 0; width: 100px;" :defaultValue="text">
                            <a-select-option value="lucy">
                                Lucy
                            </a-select-option>
                        </a-select>
                        <a-input
                                style="margin: -5px 0"
                                :value="text"
                                v-else
                        />

                    </div>
                </template>
                <template slot="operation" slot-scope="text, record, index">
                    <a-popconfirm
                            v-if="responseColumns.length"
                    >
                        <a-icon type="minus" @click="handleDeleteResponse(index)"/>
                    </a-popconfirm>
                    <a-icon type="plus" @click="handleAddResponse(index)"/>
                </template>
                        <a-icon type="plus" slot="footer" v-if="responseDataSource.length<=0" @click="handleAddResponse(0)"/>
                    </a-table>
                </div>
            </a-collapse-panel>
        </a-collapse>
        <a-form-model-item :wrapper-col="{ span: 8, offset: 8 }">
            <a-button type="primary">提交</a-button>
            <a-button style="margin-left: 10px;">取消</a-button>
        </a-form-model-item>
    </a-form-model>

</template>
<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
    @Component
    export default class AddCase extends Vue {
        private selectedItems: string[] = ['Apples'];
        private options = ['Apples', 'Nails', 'Bananas', 'Helicopters', 'aca', 'bbc'];
        private notSelectedItems: string[] = [];
        private parametersDataSource: any[] = [];
        private setuphooksDataSource: any[] = [];
        private resHeaderDataSource: any[] = [];
        private resParamsDataSource: any[] = [];
        private responseDataSource: any[] = [];
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
                title: 'operation',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' },
            },
        ];
        private parametersColumns= [
            {
                title: 'name',
                dataIndex: 'name',
                width: '15%',
                scopedSlots: {customRender: 'name'},
            },
            {
                title: 'value',
                dataIndex: 'value',
                scopedSlots: { customRender: 'value' },
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' },
            },
        ]
        private setuphooksColumns = [
            {
                title: 'sql',
                dataIndex: 'sql',
                width: '15%',
                scopedSlots: {customRender: 'sql'},
            },
            {
                title: '所属数据库',
                dataIndex: 'database',
                scopedSlots: { customRender: 'database' },
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' },
            },
        ]
        private resHeaderColumns = [
            {
                title: 'key',
                dataIndex: 'keyName',
                width: '15%',
                scopedSlots: {customRender: 'key'},
            },
            {
                title: 'value',
                dataIndex: 'value',
                scopedSlots: { customRender: 'value' },
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' },
            },
        ]
        private resParamsColumns = [
            {
                title: 'key',
                dataIndex: 'keyName',
                width: '15%',
                scopedSlots: {customRender: 'key'},
            },
            {
                title: 'value',
                dataIndex: 'value',
                scopedSlots: { customRender: 'value' },
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' },
            },
        ]
        private responseColumns = [
            {
                title: 'name',
                dataIndex: 'name',
                width: '15%',
                scopedSlots: {customRender: 'name'},
            },
            {
                title: 'type',
                dataIndex: 'type',
                scopedSlots: { customRender: 'type' },
            },
            {
                title: 'comparator',
                dataIndex: 'comparator',
                scopedSlots: { customRender: 'comparator' },
            },
            {
                title: 'expected',
                dataIndex: 'expected',
                scopedSlots: { customRender: 'expected' },
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' },
            },
        ]
        private variablesDataSource=[
            {
                key: '0',
                name: 'Edward King 0',
                type: '32',
                value: 'London, Park Lane no. 0',
                database: 'paper'
            },
            {
                key: '1',
                name: 'Edward King 1',
                type: '32',
                value: 'London, Park Lane no. 1',
                database: 'quiz'
            },
        ];
        private mounted():void {
            this.filteredOptions();
        }

        @Watch("selectedItems")
        private  filteredOptions(): string[]{
            return this.notSelectedItems = this.options.filter(o => !this.selectedItems.includes(o));

        }
        private handleChange(selectedItems: string[]): void{
            this.selectedItems = selectedItems;
        }

        private handleAddVariables(index: number): void{
            console.log(index);
            const newData = {
                key: String(this.variablesDataSource.length),
                name: '',
                type: '',
                value: '',
                database: '',
            };
            this.variablesDataSource.splice(index+1,0,newData);
        }

        private handleDeleteVariables(index: number): void{
            console.log(index);
            this.variablesDataSource.splice(index,1);
        }

        private handleAddParameters(index: number): void {
            const newData = {
                key: String(this.parametersDataSource.length),
                name: '',
                value: ''
            };
            this.parametersDataSource.splice(index+1,0,newData);
        }

        private handleDeleteParameters(index: number): void {
            this.parametersDataSource.splice(index, 1);
        }

        private handleAddSetuphooks(index: number): void {
            const newData = {
                key: String(this.setuphooksDataSource.length),
                sql: '',
                database: ''
            };
            this.setuphooksDataSource.splice(index+1,0,newData);
        }

        private handleDeleteSetuphooks(index: number): void {
            this.setuphooksDataSource.splice(index,1);
        }

        private handleAddResHeader(index: number): void {
            const newData = {
                key: String(this.resHeaderDataSource.length),
                keyName: '',
                value: ''
            };
            this.resHeaderDataSource.splice(index+1,0,newData);
        }

        private handleDeleteResHeader(index: number): void {
            this.resHeaderDataSource.splice(index,1);
        }


        private handleAddResParams(index: number): void {
            const newData = {
                key: String(this.resParamsDataSource.length),
                keyName: '',
                value: ''
            };
            this.resParamsDataSource.splice(index+1,0,newData);
        }

        private handleDeleteResParams(index: number): void {
            this.resParamsDataSource.splice(index,1);
        }

        private handleAddResponse(index: number): void {
            const newData = {
                key: String(this.responseDataSource.length),
                name: '',
                type: '',
                comparator: '',
                expected: ''
            };
            this.responseDataSource.splice(index+1,0,newData);
        }

        private handleDeleteResponse(index: number): void {
            this.responseDataSource.splice(index,1);
        }
    }


</script>
<style>
    .title {
        margin-top: 20px;
        margin-bottom: 10px;
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
</style>
