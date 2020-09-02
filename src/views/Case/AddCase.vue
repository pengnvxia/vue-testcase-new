<template>
    <a-form-model :model="testcaseForm" class="caseForm" :rules="ruleForm">
        <div>
            <a-row>
                <a-col :span="12">
            <a-form-model-item prop="testcaseName" label="用例名称：" :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }">
                <a-input placeholder="输入名称" v-model="testcaseForm.testcaseName"></a-input>
            </a-form-model-item>
                </a-col>
                <a-col :span="12">
            <a-form-model-item prop="projectName" label="环境：" :label-col="{ span: 2 }" :wrapper-col="{ span:10 }">
                <a-select v-model="testcaseForm.envId">
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
            <a-form-model-item label="配置项：" :label-col="{ span: 2 }" :wrapper-col="{ span: 5 }">
                <a-select mode="multiple" placeholder="Inserted are removed" :value="selectedItems" @change="handleChange">
                    <a-select-option v-for="item in notSelectedItems" :key="item" :value="item">{{ item }}</a-select-option>
                </a-select>
            </a-form-model-item>
        </div>
        <a-collapse expandIconPosition="right">
            <a-collapse-panel  key="2" header="Variables">
                <a-table bordered :data-source="testcaseForm.variables" :columns="variablesColumns" :pagination="false">
                    <template v-for="col in ['name', 'type', 'value', 'database']" :slot="col" slot-scope="text, record, index">
                    <div :key="col">
<!--                        <a-form-model-item prop="inputText">-->
<!--                            <a-input v-model="record.name" v-if="col == 'name'"/>-->
<!--                            <a-input v-model="record.value" v-else-if="col == 'value'" @change="testinput"/>-->
<!--                            <a-select style="width: 100px;" :defaultValue="text" @change="e => handleChangeVariables(e,record.key,col)" v-else>-->
<!--                                <a-select-option value="String">String</a-select-option>-->
<!--                            </a-select>-->
<!--                        </a-form-model-item>-->
                        <a-form-model-item prop="inputText" v-if="col == 'name'">
                            <a-input v-model="record.name"/>
                        </a-form-model-item>
                        <a-form-model-item v-else-if="col == 'value'">
                            <a-input v-model="record.value" @change="testinput"/>
                        </a-form-model-item>
                        <a-form-model-item v-else-if="col == 'type'">
                        <a-select style="width: 100px;" defaultValue="String">
                            <a-select-option value="String">String</a-select-option>
                            <a-select-option value="Number">Number</a-select-option>
                            <a-select-option value="Boolean">Boolean</a-select-option>
                            <a-select-option value="Sql">Sql</a-select-option>
                        </a-select>
                        </a-form-model-item>
                        <a-form-model-item v-else>
                            <a-select style="width: 100px;" :defaultValue="1">
                                <a-select-option :value="1">paper</a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </div>
                    </template>
                    <template slot="operation" slot-scope="text, record, index">
                <a-icon type="minus" @click="handleDeleteVariables(index)"/>
                <a-icon type="plus" @click="handleAddVariables(index)"/>
            </template>
                    <a-icon type="plus" slot="footer" v-if="testcaseForm.variables.length<=0" @click="handleAddVariables(0)"/>
                </a-table>
            </a-collapse-panel>
            <a-collapse-panel  key="3" header="Parameters">
                <a-table bordered :data-source="testcaseForm.parameters" :columns="parametersColumns" :pagination="false">
                    <template v-for="col in ['name', 'value']" :slot="col" slot-scope="text, record, index">
                        <div :key="col">
                            <a-form-model-item>
                                <a-input v-model="record.name" v-if="col == 'name'"/>
                                <a-input v-model="record.value" v-if="col == 'value'"/>
                            </a-form-model-item>
                        </div>
                    </template>
                    <template slot="operation" slot-scope="text, record, index">
                        <a-popconfirm v-if="testcaseForm.parameters.length">
                            <a-icon type="minus" @click="handleDeleteParameters(index)"/>
                        </a-popconfirm>
                        <a-icon type="plus" @click="handleAddParameters(index)"/>
                    </template>
                    <a-icon type="plus" slot="footer" v-if="testcaseForm.parameters.length<=0" @click="handleAddParameters(0)"/>

                </a-table>
            </a-collapse-panel>
            <a-collapse-panel  key="4" header="Setuphooks">
                <a-table bordered :data-source="testcaseForm.setuphooks" :columns="setuphooksColumns" :pagination="false">
                    <template v-for="col in ['sql', 'database']" :slot="col" slot-scope="text, record, index">
                        <div :key="col">
                            <a-form-model-item prop="inputText" v-if="col == 'sql'">
                                <a-input v-model="record.sql"/>
                            </a-form-model-item>
                            <a-form-model-item v-else>
                                <a-select style="width: 100px;" :defaultValue="1">
                                    <a-select-option :value="1">paper</a-select-option>
                                </a-select>
                            </a-form-model-item>
                        </div>
                    </template>
                    <template slot="operation" slot-scope="text, record, index">
                        <a-popconfirm v-if="testcaseForm.setuphooks.length">
                            <a-icon type="minus" @click="handleDeleteSetuphooks(index)"/>
                        </a-popconfirm>
                        <a-icon type="plus" @click="handleAddSetuphooks(index)"/>
                    </template>
                    <a-icon type="plus" slot="footer" v-if="testcaseForm.setuphooks.length<=0" @click="handleAddSetuphooks(0)"/>
                </a-table>
            </a-collapse-panel>
            <a-collapse-panel  key="5" header="Request&Response">
                <div>
                    <h3 class="title">
            Request
        </h3>
                    <a-tabs default-active-key="1">
                        <a-tab-pane key="1" tab="headers">
                <a-table bordered :data-source="testcaseForm.reqHeaders" :columns="resHeaderColumns" :pagination="false">
                    <template
                            v-for="col in ['key', 'value']"
                            :slot="col"
                            slot-scope="text, record, index"

                    >
                        <div :key="col">
                            <a-form-model-item prop="inputText">
                            <a-input v-model="record.keyName" v-if="col =='key'"/>
                            <input v-model="record.value" v-else/>
                            </a-form-model-item>
                        </div>
                    </template>
                    <template slot="operation" slot-scope="text, record, index">
                        <a-popconfirm
                                v-if="resHeaderColumns.length"
                        >
                            <a-icon type="minus" @click="handleDeleteResHeader(index)"/>
                        </a-popconfirm>
                        <a-icon type="plus" @click="handleAddResHeader(index)"/>
                    </template>
                    <a-icon type="plus" slot="footer" v-if="testcaseForm.reqHeaders.length<=0" @click="handleAddResHeader(0)"/>

                </a-table>
            </a-tab-pane>
                        <a-tab-pane key="2" tab="params" force-render>
                <a-table bordered :data-source="testcaseForm.reqParams" :columns="resParamsColumns" :pagination="false">
                    <template
                            v-for="col in ['key', 'value']"
                            :slot="col"
                            slot-scope="text, record, index"

                    >
                        <div :key="col">
                            <a-form-model-item prop="inputText">
                            <a-input
                                    v-model="record.keyName" v-if="col == 'key'"/>
                                <a-input v-model="record.value" v-if="col == 'value'"/>
                             </a-form-model-item>

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
                    <a-icon type="plus" slot="footer" v-if="testcaseForm.reqParams.length<=0" @click="handleAddResParams(0)"/>

                </a-table>

            </a-tab-pane>
                        <a-tab-pane key="3" tab="requestBody">
                            <a-form-model-item>
                                <a-textarea placeholder="请输入..." :rows="6" v-model="testcaseForm.requestBody"/>
                            </a-form-model-item>
                        </a-tab-pane>
                    </a-tabs>
                </div>
                <div>
                    <h3 class="title">
             Response
         </h3>
                    <a-table bordered :data-source="testcaseForm.responses" :columns="responseColumns" :pagination="false">
                <template
                        v-for="col in ['name', 'type', 'comparator', 'expected']"
                        :slot="col"
                        slot-scope="text, record, index"

                >
                    <div :key="col">
                        <a-form-model-item v-if="col == 'comparator'">
                        <a-select style="width: 100px;" defaultValue="=">
                            <a-select-option value="=">
                                =
                            </a-select-option>
                            <a-select-option value="<">
                                <
                            </a-select-option>
                            <a-select-option value=">">
                                >
                            </a-select-option>
                            <a-select-option value="<=">
                                <=
                            </a-select-option>
                            <a-select-option value=">=">
                                >=
                            </a-select-option>
                            <a-select-option value="!=">
                                !=
                            </a-select-option>
                            <a-select-option value="contain">
                                包含
                            </a-select-option>
                            <a-select-option value="notcontain">
                                不包含
                            </a-select-option>
                        </a-select>
                        </a-form-model-item>
                        <a-form-model-item v-else-if="col == 'type'">
                                <a-select style="width: 100px;" defaultValue="String">
                                    <a-select-option value="String">String</a-select-option>
                                    <a-select-option value="Number">Number</a-select-option>
                                    <a-select-option value="Boolean">Boolean</a-select-option>
                                    <a-select-option value="Sql">Sql</a-select-option>
                                </a-select>
                        </a-form-model-item>
                        <a-form-model-item prop="inputText" v-else>
                            <a-input
                                    v-model="record.name" v-if="col == 'name'"
                            />
                            <a-input
                                    v-model="record.expected" v-else
                            />
                        </a-form-model-item>

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
                        <a-icon type="plus" slot="footer" v-if="testcaseForm.responses.length<=0" @click="handleAddResponse(0)"/>
                    </a-table>
                </div>
            </a-collapse-panel>
        </a-collapse>
        <a-form-model-item class="btn">
            <a-button type="primary" class="saveBtn" @click="submit">提交</a-button>
            <a-button class="cancelBtn">取消</a-button>
        </a-form-model-item>
    </a-form-model>

</template>
<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
    import { addTestcase,interfaceInfo } from '@/services/testcase/index';

    interface Testcase {
        testcaseName: string,
        envId: number,
        configIds: string,
        requestBody: string,
        variables: any[],
        parameters: any[],
        setuphooks: any[],
        reqHeaders: any[],
        reqParams: any[],
        responses: any[]
    }

    // interface Variable {
    //     key: string,
    //     name: string,
    //     type: string,
    //     value: string,
    //     databaseId?: number
    // }
    //
    // interface Parameter {
    //     key: string,
    //     keyName: string,
    //     value: string
    // }
    //
    // interface Setuphook {
    //     key: string,
    //     sql: string,
    //     databaseId: number
    // }
    //
    // interface ReqHeader {
    //     key: string,
    //     keyName: string,
    //     value: string
    //
    // }
    //
    // interface ReqParam {
    //     key: string,
    //     keyName: string,
    //     value: string
    // }
    //
    // interface Response {
    //     key:string,
    //     name: string,
    //     type: string,
    //     comparator: string,
    //     expectedValue: string
    // }
    @Component({
    })
    export default class AddCase extends Vue {
        private testcaseForm: Testcase={
            testcaseName: '',
            envId: 1,
            configIds: '1',
            requestBody: '',
            variables: [],
            parameters: [],
            setuphooks: [],
            reqHeaders: [],
            reqParams: [],
            responses: []
        };

        private selectedItems: string[] = ['Apples'];
        private options = ['Apples', 'Nails', 'Bananas', 'Helicopters', 'aca', 'bbc'];
        private notSelectedItems: string[] = [];
        // private parametersDataSource: any[] = [];
        // private setuphooksDataSource: any[] = [];
        // private resHeaderDataSource: any[] = [];
        // private resParamsDataSource: any[] = [];
        // private responseDataSource: any[] = [];
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

        private ruleForm:any ={
            testcaseName:[
                {
                    required: true,
                    message: "请输入项目名称",
                    trigger: "blur"
                }
            ],
            // inputText:[
            //     {
            //         required: true,
            //         message: "请输入",
            //         trigger: "blur"
            //     }
            // ]
        }

        private mounted():void {
            this.filteredOptions();
            this.getInterfaceInfo();
            console.log(this.testcaseForm);
        }

        @Watch("selectedItems")
        private  filteredOptions(): string[]{
            return this.notSelectedItems = this.options.filter(o => !this.selectedItems.includes(o));

        }
        private handleChange(selectedItems: string[]): void{
            this.selectedItems = selectedItems;
        }

        // private handleChangeVariables(value:String,key:string,column:string){
        //     const newData = [...this.testcaseForm.variables];
        //     const target = newData.filter(item => key === item.key)[0];
        //     if(target) {
        //         target[column] = value;
        //         this.testcaseForm.variables = newData;
        //     }
        // }
        //
        // private handleChangeParameters(value:String,key:string,column:string){
        //
        //     const newData = [...this.testcaseForm.parameters];
        //     const target = newData.filter(item => key === item.key)[0];
        //     if(target) {
        //         target[column] = value;
        //         this.testcaseForm.parameters = newData;
        //     }
        // }
        //
        // private handleChangeSetuphooks(value:String,key:string,column:string){
        //
        //     const newData = [...this.testcaseForm.setuphooks];
        //     const target = newData.filter(item => key === item.key)[0];
        //     if(target) {
        //         target[column] = value;
        //         this.testcaseForm.setuphooks = newData;
        //     }
        // }
        //
        // private handleChangeResHeaders(value:String,key:string,column:string){
        //     if(column === 'key'){
        //         column = 'keyName';
        //     }
        //     const newData = [...this.testcaseForm.reqHeaders];
        //     const target = newData.filter(item => key === item.key)[0];
        //     if(target) {
        //         target[column] = value;
        //         this.testcaseForm.reqHeaders = newData;
        //     }
        // }
        //
        // private handleChangeResParams(value:String,key:string,column:string){
        //     if(column === 'key'){
        //         column = 'keyName';
        //     }
        //     const newData = [...this.testcaseForm.reqParams];
        //     const target = newData.filter(item => key === item.key)[0];
        //     if(target) {
        //         target[column] = value;
        //         this.testcaseForm.reqParams = newData;
        //     }
        // }
        //
        // private handleChangeResponse(value:String,key:string,column:string){
        //
        //     const newData = [...this.testcaseForm.responses];
        //     const target = newData.filter(item => key === item.key)[0];
        //     if(target) {
        //         target[column] = value;
        //         this.testcaseForm.responses = newData;
        //     }
        // }

        private handleAddVariables(index: number): void{
            const newData = {
                key: (new Date()).valueOf(),
                name: '',
                type: '',
                value: '',
                database: '',
            };
            this.testcaseForm.variables.splice(index+1,0,newData);
        }

        private handleDeleteVariables(index: number): void{
            this.testcaseForm.variables.splice(index,1);
        }

        private handleAddParameters(index: number): void {
            const newData = {
                key: (new Date()).valueOf(),
                name: '',
                value: ''
            };
            this.testcaseForm.parameters.splice(index+1,0,newData);
        }

        private handleDeleteParameters(index: number): void {
            this.testcaseForm.parameters.splice(index, 1);
        }

        private handleAddSetuphooks(index: number): void {
            const newData = {
                key: (new Date()).valueOf(),
                sql: '',
                database: ''
            };
            this.testcaseForm.setuphooks.splice(index+1,0,newData);
        }

        private handleDeleteSetuphooks(index: number): void {
            this.testcaseForm.setuphooks.splice(index,1);
        }

        private handleAddResHeader(index: number): void {
            const newData = {
                key: (new Date()).valueOf(),
                keyName: '',
                value: ''
            };
            this.testcaseForm.reqHeaders.splice(index+1,0,newData);
        }

        private handleDeleteResHeader(index: number): void {
            this.testcaseForm.reqHeaders.splice(index,1);
        }


        private handleAddResParams(index: number): void {
            const newData = {
                key: (new Date()).valueOf(),
                keyName: '',
                value: ''
            };
            this.testcaseForm.reqParams.splice(index+1,0,newData);
        }

        private handleDeleteResParams(index: number): void {
            this.testcaseForm.reqParams.splice(index,1);
        }
        private handleAddResponse(index: number): void {
            const newData = {
                // key: String(this.testcaseForm.responses.length),
                key: (new Date()).valueOf(),
                name: '',
                type: '',
                comparator: '',
                expected: ''
            };
            this.testcaseForm.responses.splice(index+1,0,newData);
        }

        private handleDeleteResponse(index: number): void {
            this.testcaseForm.responses.splice(index,1);
        }

        private getInterfaceInfo():void {
            interfaceInfo(Number(this.$route.params.id)).then(
                (result: any) => {
                    if (result.errcode === "0") {
                        this.addKey(result.retval);
                    }
                },
                (err: any) => {
                    this.$message;
                }
            )
        }

        private addKey(testcase: Testcase): Testcase {
            if(testcase.reqHeaders.length>0){
                for(var i=0;testcase.reqHeaders.length-1;i++){
                    testcase.reqHeaders[i].key=i;
                }
            }
            if(testcase.reqParams.length-1>0){
                for(var i=0;testcase.reqParams.length;i++){
                    testcase.reqParams[i].key=i;
                }

            }
            if(testcase.responses.length-1>0){
                for(var i=0;testcase.responses.length;i++){
                    testcase.responses[i].key=i;
                }

            }
            this.testcaseForm=testcase;

            return this.testcaseForm;

        }

        private submit(): void {

            this.processTestcaseForm(this.testcaseForm);
            addTestcase(Number(this.$route.params.id),this.testcaseForm).then(
                (result: any) => {
                    if (result.errcode === "0") {
                        this.$message.success("提交成功");
                        // this.$router.push({path:'/index'});
                    }
                },
                (err: any) => {
                    this.$message;
                }
            );
        }

        private processTestcaseForm(testcase: Testcase): Testcase{
            if(testcase.variables.length>0){
                testcase.variables.forEach(function (value) {
                    delete value.key;
                })
            }
            if(testcase.parameters.length>0){
                testcase.parameters.forEach(function (value) {
                    delete value.key;
                })

            }
            if(testcase.setuphooks.length>0){
                testcase.setuphooks.forEach(function (value) {
                    delete value.key;
                })
            }
            if(testcase.reqHeaders.length>0){
                testcase.reqHeaders.forEach(function (value) {
                    delete value.key;
                })
            }
            if(testcase.reqParams.length>0){
                testcase.reqParams.forEach(function (value) {
                    delete value.key;
                })
            }
            if(testcase.responses.length>0){
                testcase.responses.forEach(function (value) {
                    delete value.key;
                })
            }

            return this.testcaseForm;
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
    .caseForm .ant-table-tbody .ant-form-item{
        margin-bottom: 0;
        margin: -5px 0;
    }
    .caseForm .ant-form-item-control{
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
