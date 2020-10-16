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
        <a-collapse expandIconPosition="right" defaultActiveKey="request&response">
            <a-collapse-panel  key="variables" header="Variables">
                <a-table bordered :data-source="testcaseForm.variables" :columns="variablesColumns" :pagination="false">
                    <template v-for="col in ['name', 'type', 'value', 'database']" :slot="col" slot-scope="text, record, index">
                        <div :key="col">
                            <a-form-model-item prop="inputText" v-if="col == 'name'">
                                <a-input v-model="record.name"/>
                            </a-form-model-item>
                            <a-form-model-item v-else-if="col == 'value'">
                                <a-input v-model="record.value"/>
                            </a-form-model-item>
                            <a-form-model-item v-else-if="col == 'type'">
                                <a-select style="width: 100px;" defaultValue="String" v-model="record.type">
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
                            <a-form-model-item v-else>
                                <a-select style="width: 100px;" :defaultValue="1" v-model="record.databaseId">
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
            <a-collapse-panel  key="parameters" header="Parameters">
                <a-table bordered :data-source="testcaseForm.parameters" :columns="parametersColumns" :pagination="false">
                    <template v-for="col in ['name', 'value']" :slot="col" slot-scope="text, record, index">
                        <div :key="col">
                            <a-form-model-item>
                                <a-input v-model="record.keyName" v-if="col == 'name'"/>
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
            <a-collapse-panel  key="setuphooks" header="Setuphooks">
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
            <a-collapse-panel  key="request&response" header="Request&Response">
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
                                <a-textarea placeholder="请输入..." :rows="6" v-model="testcaseForm.reqBody.requestBody"/>
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
                                v-for="col in ['name', 'type', 'comparator', 'expectedValue']"
                                :slot="col"
                                slot-scope="text, record, index"

                        >
                            <div :key="col">
                                <a-form-model-item v-if="col == 'comparator'">
                                    <a-select style="width: 100px;" defaultValue="=" v-model="record.comparator">
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
                                    <a-select style="width: 100px;" defaultValue="String" v-model="record.type" @change="handleType(index,record.type,record.key)">
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
                                <a-form-model-item prop="inputText" v-else>
                                    <a-input
                                            v-model="record.name" v-if="col == 'name'"
                                    />
                                    <a-input
                                            v-model="record.expectedValue" v-else
                                    />
                                </a-form-model-item>

                            </div>
                        </template>
                        <template slot="operation" slot-scope="text, record, index">
                            <a-popconfirm
                                    v-if="responseColumns.length"
                            >
                                <a-icon type="minus" @click="handleDeleteResponse(index,record.key)"/>
                            </a-popconfirm>
                            <a-icon type="plus" @click="handleAddResponse(index,record.key)"/>
                        </template>
                        <a-icon type="plus" slot="footer" v-if="testcaseForm.responses.length<=0" @click="handleAddResponse(0,-1)"/>
                    </a-table>
                </div>
            </a-collapse-panel>
        </a-collapse>
        <a-form-model-item class="btn">
            <a-button type="primary" class="saveBtn" @click="submit">提交</a-button>
            <a-button class="cancelBtn" @click="handleReset">取消</a-button>
        </a-form-model-item>
    </a-form-model>

</template>
<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
    import { editTestcase,testcaseInfo } from '@/services/testcase/index';

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
        reqBody: {}
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
            responses: [],
            reqBody: {}

        };

        private selectedItems: string[] = ['Apples'];
        private options = ['Apples', 'Nails', 'Bananas', 'Helicopters', 'aca', 'bbc'];
        private notSelectedItems: string[] = [];
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
                dataIndex: 'keyNname',
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
                title: 'expectedValue',
                dataIndex: 'expectedValue',
                scopedSlots: { customRender: 'expectedValue' },
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
        }

        @Watch("selectedItems")
        private  filteredOptions(): string[]{
            return this.notSelectedItems = this.options.filter(o => !this.selectedItems.includes(o));

        }
        private handleChange(selectedItems: string[]): void{
            this.selectedItems = selectedItems;
        }

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
                keyName: '',
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
        private handleAddResponse(index: number,key: number): void {
            const newData = {
                // key: String(this.testcaseForm.responses.length),
                key: (new Date()).valueOf(),
                name: '',
                type: '',
                comparator: '',
                expectedValue: '',
            };
            var that=this;

            if(key==-1){
                that.testcaseForm.responses.splice(index+1,0,newData);
            }else {
                this.testcaseForm.responses.forEach(function (value: any) {
                    that.addNewData(that.testcaseForm.responses,value,key,index);
                })
            }

        }

        private addNewData(previousValue:any,value:any,key:number,index:number): any{
            const newData = {
                // key: String(this.testcaseForm.responses.length),
                key: (new Date()).valueOf(),
                name: '',
                type: '',
                comparator: '',
                expectedValue: '',
            };
            if(value.key==key){
                previousValue.splice(index+1,0,newData);
            }else if (value.hasOwnProperty("children")) {
                var that=this;
                // this.addNewData(value,value.children,key,index);
                value.children.forEach(function (childrenValue: any) {
                    that.addNewData(value.children,childrenValue,key,index);
                    // if(childrenValue.key==key){
                    //     value.children.splice(index+1,0,newData);
                    // }
                })
            }
        }

        private handleDeleteResponse(index: number,key: number): void {
            var that= this;
            this.testcaseForm.responses.forEach(function (value) {
                that.deleteResponse(that.testcaseForm.responses,value,index,key)
            })
            // this.testcaseForm.responses.splice(index,1);
        }

        private deleteResponse(previousValue: any, value: any, index: number, key: number): void{
            if(value.key==key){
                previousValue.splice(index,1);
            }else if(value.hasOwnProperty("children")){
                var that=this;
                value.children.forEach(function (childrenValue: any) {
                    that.deleteResponse(value.children,childrenValue,index,key);
                })
            }
        }

        private getInterfaceInfo():void {
            testcaseInfo(Number(this.$route.params.id)).then(
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
            if(testcase.hasOwnProperty("reqHeaders") && testcase.reqHeaders.length>0){
                for(var i=0;i<testcase.reqHeaders.length;i++){
                    testcase.reqHeaders[i].key=i;
                }
            }
            if(testcase.hasOwnProperty("reqParams") && testcase.reqParams.length>0){
                for(var i=0;i<testcase.reqParams.length;i++){
                    testcase.reqParams[i].key=i;
                }

            }
            if(testcase.hasOwnProperty("responses") && testcase.responses.length>0){
                // for(var i=0;i<testcase.responses.length;i++){
                //     testcase.responses[i].key=i;
                //
                // }
                this.resursionAddKey(testcase.responses);

            }
            if(testcase.hasOwnProperty("variables") && testcase.variables.length>0){
                for(var i=0;i<testcase.variables.length;i++){
                    testcase.variables[i].key=i;
                }
            }
            if(testcase.hasOwnProperty("parameters") && testcase.parameters.length>0){
                for(var i=0;i<testcase.parameters.length;i++){
                    testcase.parameters[i].key=i;
                }
            }
            if(testcase.hasOwnProperty("setuphooks") && testcase.setuphooks.length>0){
                for(var i=0;i<testcase.setuphooks.length;i++){
                    testcase.setuphooks[i].key=i;
                }
            }
            this.testcaseForm=testcase;
            console.log(this.testcaseForm);
            return this.testcaseForm;

        }

        private resursionAddKey(addKeyValue:any): void{
            var that=this;
            var i=0;
            addKeyValue.forEach(function (value:any){
                value.key=(new Date()).valueOf()+i;
                if((value.type=="Array" || value.type=="Object") && !value.hasOwnProperty("children")){
                    const newData=[{
                        name: '',
                        type: '',
                        comparator: '',
                        expectedValue: ''
                    }];
                    value.children = newData;
                }
                if(value.hasOwnProperty("children")){
                    that.resursionAddKey(value.children);
                }
                i=i+1;
            });
        }

        private submit(): void {

            this.processTestcaseForm(this.testcaseForm);
            editTestcase(Number(this.$route.params.id),this.testcaseForm).then(
                (result: any) => {
                    if (result.errcode === "0") {
                        this.$message.success("更新成功");
                        this.$router.go(-1);
                    }
                },
                (err: any) => {
                    this.$message.error(err.errmsg);
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
                // testcase.responses.forEach(function (value) {
                //     delete value.key;
                // })
                this.deleteKey(testcase.responses);

            }

            return this.testcaseForm;
        }

        private deleteKey(previousValue: any): void{
            var that=this;
            previousValue.forEach(function (value: any,index: number){
                if(value.name == ''){
                    delete previousValue[index];
                }else {
                    delete value.key;
                    if (value.hasOwnProperty("children")) {
                        that.deleteKey(value.children);
                        console.log(value.children,101010);
                        if(value.children==false){
                            delete value.children;
                        }
                    }
                }

            });
        }

        private handleReset(): void{
            this.$router.go(-1);
        }

        private handleType(index:number, type: string, key: number): void{
            var that=this;
            this.addType(that.testcaseForm.responses,type,key);
        }

        private addType(value: any, type: string, key: number): any{
            const newData = [{
                key: (new Date()).valueOf(),
                name: '',
                type: '',
                comparator: '',
                expectedValue: '',
            }];
            var that=this;
            value.forEach(function (value: any) {
                if(value.key == key){
                    if(type=="Array" || type=="Object"){
                        value.children= newData;
                    }
                }else if (value.hasOwnProperty("children")) {
                    that.addType(value.children,type,key);
                }
            })
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
        background-color: transparent;
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
