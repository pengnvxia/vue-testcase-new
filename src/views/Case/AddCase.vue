<template>
    <a-form-model :model="testcaseForm" class="caseForm" :rules="ruleForm" ref="testcaseRuleForm">
        <div>
            <a-row>
                <a-col :span="12">
            <a-form-model-item prop="testcaseName" label="用例名称：" :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }">
                <a-input placeholder="输入名称" v-model="testcaseForm.testcaseName"></a-input>
            </a-form-model-item>
                </a-col>
                <a-col :span="12">
                    <a-form-model-item prop="path" label="路径：" :label-col="{ span: 2 }" :wrapper-col="{ span: 10 }">
                        <a-input placeholder="如 xx/xx" v-model="testcaseForm.path"></a-input>
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="12">
                    <a-form-model-item label="配置项：" :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }">
                        <a-select mode="multiple" placeholder="请选择配置项" v-model="selectedItemsList"  @change="handleChange">
                            <a-select-option v-for="item in notSelectedItems" :key="item.id" :value="item.configName">{{ item.configName }}</a-select-option>
                        </a-select>
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

        </div>
        <a-collapse expandIconPosition="right" defaultActiveKey="request&response">
            <a-collapse-panel  key="variables" header="Variables">
                <a-table bordered :data-source="testcaseForm.variables" :columns="variablesColumns" :pagination="false">
                    <template v-for="col in ['name', 'type', 'value', 'database']" :slot="col" slot-scope="text, record, index">
                    <div :key="col">
                        <a-form-model-item prop="inputText" v-if="col == 'name'" :prop="'variables.'+index+'.name'" :rules="ruleForm.proName">
                            <a-input v-model="record.name"/>
                        </a-form-model-item>
                        <a-form-model-item prop="inputText" v-else-if="col == 'value'" :prop="'variables.'+index+'.value'" :rules="ruleForm.proValue">
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
                            <a-form-model-item v-if="col == 'name'" :prop="'parameters.'+index+'.name'" :rules="ruleForm.proName">
                                <a-input v-model="record.keyName" v-if="col == 'name'"/>
                            </a-form-model-item>
                            <a-form-model-item v-if="col == 'value'" :prop="'parameters.'+index+'.value'" :rules="ruleForm.proValue">
                                <a-input v-model="record.value"/>
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
                            <a-form-model-item prop="inputText" v-if="col == 'sql'" :prop="'setuphooks.'+index+'.sql'" :rules="ruleForm.proSql">
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
                            <a-form-model-item :prop="'reqHeaders.'+index+'.keyName'" :rules="ruleForm.proName" v-if="col =='key'">
                            <a-input v-model="record.keyName"/>
                            </a-form-model-item>
                            <a-form-model-item v-else :prop="'reqHeaders.'+index+'.value'" :rules="ruleForm.proValue">
                                <a-input v-model="record.value"/>
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
                            <a-form-model-item :prop="'reqParams.'+index+'.keyName'" :rules="ruleForm.proName"  v-if="col == 'key'">
                            <a-input
                                    v-model="record.keyName"/>
                             </a-form-model-item>
                            <a-form-model-item v-if="col == 'value'" :prop="'reqParams.'+index+'.value'" :rules="ruleForm.proValue">
                                <a-input v-model="record.value" />
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
                <div class="response">
                    <h3 class="title">
             Response
         </h3>
                    <a-table bordered :data-source="testcaseForm.responses" :columns="responseColumns" :pagination="false" :indentSize=20>
                <template
                        v-for="col in ['name', 'type', 'comparator', 'expectedValue']"
                        :slot="col"
                        slot-scope="text, record, index"

                >
                    <div :key="col" class="responseForm">
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
                        <a-form-model-item v-else-if="col == 'name'">
                            <a-input id="indexId" v-model.number="record.indexValue" v-if="record.indexValue!=null"></a-input>
                            <a-input id="responseName"
                                    v-model="record.name"
                            />
                        </a-form-model-item>
                        <a-form-model-item  v-else>
                            <a-input
                                    v-model="record.expectedValue"
                            />
                        </a-form-model-item>

                    </div>
                </template>
                <template slot="operation" slot-scope="text, record, index">
                        <a-icon type="minus" @click="handleDeleteResponse(index,record.key)"/>
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
    import { addTestcase,interfaceInfo } from '@/services/testcase/index';
    import { configList } from '@/services/testcaseConfig/index';


    interface Testcase {
        testcaseName: string,
        path: string,
        envId: number,
        method: string,
        configIds: number[],
        requestBody: string,
        variables: any[],
        parameters: any[],
        setuphooks: any[],
        reqHeaders: any[],
        reqParams: any[],
        responses: any[]
    }


    @Component({
        components: {}
    })
    export default class AddCase extends Vue {
        private testcaseForm: Testcase={
            testcaseName: '',
            path: '',
            envId: Number(this.$route.params.envId),
            method: '',
            configIds: [],
            requestBody: '',
            variables: [],
            parameters: [],
            setuphooks: [],
            reqHeaders: [],
            reqParams: [],
            responses: []

        };

        private selectedItemsList: string[]=[];
        private selectedItems: any[] = [];
        private options: any[]=[];
        private notSelectedItems: any[] = [];
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
                title: 'operation',
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
                width: '50%',
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

        private ruleForm:any ={
            testcaseName:[
                {
                    required: true,
                    message: "请输入用例名称",
                    trigger: "blur"
                }
            ],
            path: [{
                required: true,
                message: "请输入路径",
                trigger: "blur"
            }],
            proName: [{
                required: true,
                message: "请输入name的值",
                trigger: "blur"
            }],
            proValue: [{
                required: true,
                message: "请输入value的值",
                trigger: "blur"
            }],
            proSql: [{
                required: true,
                message: "请输入sql的值",
                trigger: "blur"
            }]

        }
        private inputRule: any = [{
            required: true,
            message: "请输入aaa",
            trigger: "blur"
        }]

        private mounted():void {
            this.getOptions();
        }

        private getOptions(){
            configList(Number(this.$route.params.projectId),this.testcaseForm.envId).then(
                (result: any) => {
                    if (result.errcode === "0") {
                        this.options=result.retval;
                        this.getInterfaceInfo();
                    }
                },
                (err: any) => {
                    this.$message.error(err.message);
                }
            )
        }

        @Watch("selectedItems")
        private  filteredOptions(): void{
            this.notSelectedItems = this.options.filter(o => !this.selectedItems.includes(o));
        }
        private handleChange(): void{
            this.selectedItems = this.options.filter(o => this.selectedItemsList.includes(o.configName));
            this.testcaseForm.configIds=[];
            if(this.selectedItems.length>0){
                for(let i=0;i<this.selectedItems.length;i++){
                    this.testcaseForm.configIds.push(this.selectedItems[i].id);
                }

            }
        }

        private handleAddVariables(index: number): void{
            const newData = {
                key: (new Date()).valueOf(),
                name: '',
                type: 'String',
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
        private handleAddResponse(index: number,key:number): void {
            const newData = {
                key: (new Date()).valueOf(),
                name: '',
                type: '',
                comparator: '=',
                expectedValue: '',
            };
            let that=this;
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
                key: (new Date()).valueOf(),
                name: '',
                type: '',
                comparator: '=',
                expectedValue: '',
            };
            if(value.key==key){
                if(value.indexValue!=null){
                    previousValue.splice(index+1,0,{
                        key: (new Date()).valueOf(),
                        indexValue:0,
                        name: '',
                        type: '',
                        comparator: '=',
                        expectedValue: '',
                    });
                }else {
                    previousValue.splice(index+1,0,newData);
                }
            }else if (value.hasOwnProperty("children")) {
                var that=this;
                value.children.forEach(function (childrenValue: any) {
                    that.addNewData(value.children,childrenValue,key,index);
                })
            }
        }

        private handleDeleteResponse(index: number,key: number): void {
            var that= this;
            this.testcaseForm.responses.forEach(function (value) {
                that.deleteResponse(that.testcaseForm.responses,value,index,key)
            })
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
            interfaceInfo(Number(this.$route.params.id)).then(
                (result: any) => {
                    if (result.errcode === "0") {
                        this.addKey(result.retval);
                        this.filteredOptions();
                    }
                },
                (err: any) => {
                    this.$message.error(err.message);
                }
            )
        }

        private addKey(testcase: Testcase): void {
            if(testcase.reqHeaders.length>0 && testcase.reqHeaders.length>0){
                for(var i=0;i<testcase.reqHeaders.length;i++){
                    testcase.reqHeaders[i].key=i;
                }
            }
            if(testcase.reqParams.length>0 && testcase.reqParams.length>0){
                for(var i=0;i<testcase.reqParams.length;i++){
                    testcase.reqParams[i].key=i;
                }

            }
            if(testcase.responses.length>0 && testcase.responses.length>0){
                this.resursionAddKey(testcase.responses);


            }
            Object.assign(this.testcaseForm, testcase);
            this.selectedItems=this.options.filter(o => this.testcaseForm.configIds.includes(o.id));
            if(this.selectedItems.length>0){
                for(let i=0;i<this.selectedItems.length;i++){
                    this.selectedItemsList.push(this.selectedItems[i].configName);
                }
            }
        }

        private resursionAddKey(addKeyValue:any): void{
            let that=this;
            addKeyValue.forEach(function (value:any){
                value.key=(new Date()).valueOf()+Math.floor(Math.random() * 100000);
                if((value.type=="Array" || value.type=="Object") && !value.hasOwnProperty("children")){
                    // const newData=[{
                    //     name: '',
                    //     type: '',
                    //     comparator: '=',
                    //     expectedValue: ''
                    // }];
                    //新修改
                    // value.children = newData;
                    if(value.type=="Array"){
                        Vue.set(value,'children',[{
                            indexValue:0,
                            name: '',
                            type: '',
                            comparator: '=',
                            expectedValue: ''
                        }]);
                    }else {
                        Vue.set(value,'children',[{
                            name: '',
                            type: '',
                            comparator: '=',
                            expectedValue: ''
                        }]);
                    }
                }
                if(value.hasOwnProperty("children")){
                    that.resursionAddKey(value.children);
                }
            });
        }

        private verifyResponse(responses: any): boolean {
            let that=this;
            let flag=true;
            responses.forEach(function (value: any) {
                if(value.type=="Array" || value.type=="Object"){
                    if(value.name==""){
                        flag=false;
                    }else{
                        if(value.hasOwnProperty("children")){
                            flag=that.verifyResponse(value.children);
                        }
                    }
                }else {
                    if(value.type=="" || value.name=="" || value.expectedValue=="" || value.comparator==""){
                        flag=false;
                    }else {
                        if(value.hasOwnProperty("children")){
                            flag=that.verifyResponse(value.children);
                        }
                    }
                }
            })
            return flag;
        }


        private submit(): void {
            const ref: any = this.$refs.testcaseRuleForm;
            ref.validate((valid: boolean) => {
                if (valid) {
                    if(this.testcaseForm.responses.length<=0 || this.verifyResponse(this.testcaseForm.responses)){
                        this.processTestcaseForm(this.testcaseForm);
                        addTestcase(Number(this.$route.params.id), this.testcaseForm).then(
                            (result: any) => {
                                if (result.errcode === "0") {
                                    this.$message.success("提交成功");
                                    this.$router.go(-1);
                                }
                            },
                            (err: any) => {
                                this.$message;
                            }
                        );
                    }else {
                    this.$message.error("response中有值未填写")
                    }
                }else {
                    return false;
                }
            })
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
            let that=this;
            this.addType(that.testcaseForm.responses,type,key);
        }

        private addType(value: any, type: string, key: number): any{
            var that=this;
            value.forEach(function (value: any) {
                if(value.key == key){
                    if(type=="Array" || type=="Object"){
                        if(type=="Array"){
                            Vue.set(value,'children',[{
                                key: (new Date()).valueOf(),
                                indexValue:0,
                                name: '',
                                type: '',
                                comparator: '=',
                                expectedValue: '',
                            }]);

                        }else {
                            Vue.set(value,'children',[{
                                key: (new Date()).valueOf(),
                                name: '',
                                type: '',
                                comparator: '=',
                                expectedValue: '',
                            }]);
                        }

                    }else {
                        if(value.hasOwnProperty("children")){
                            Vue.delete(value,'children');
                        }
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
        /*border: none;*/
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
        /*background-color: transparent;*/
    }
    .btn .ant-form-item-children{
        position: absolute;
        left: 50%;
        margin-left: -163.9px;

    }
    .btn .cancelBtn{
        margin-left: 200px;
    }

    .responseForm{
        display: inline-block;
        width: 80%;
    }

    #responseName {
        display: inline-block;
        width: 95%;
    }

    #indexId {
        display: inline-block;
        width: 5%;
    }



</style>
