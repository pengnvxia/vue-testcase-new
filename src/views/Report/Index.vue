<template>
    <div>
        <a-table :columns="columns" :data-source="reportData" rowKey="id">
        <span slot="createdAt" slot-scope="createdAt">
            {{ createdAt | formatDate }}
        </span>
            <span slot="result" slot-scope="result">
            <a-tag :color="result === 1 ? 'green':'red'">
                {{result==1?'成功':'失败'}}
            </a-tag>
        </span>
        <span slot="operation" slot-scope="record">
            <a @click="handleDetails(record.id)">查看详情</a>
        </span>
        </a-table>
        <a-modal v-model="visible">
            <ReportDetail :details="details">
            </ReportDetail>
        </a-modal>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import {groupReportList, reportList, reportDetails} from "@/services/report/index";
    import ReportDetail from '@/components/Report/ReportDetail.vue';

    interface ReportItem {
        id: number,
        createdAt?: string,
        createdBy?: string,
        result: number,
        reportLink?: string,
        reportHtml: string
    }

    interface Detail{
        url: string,
        method: string,
        statusCode: string,
        requestHeaders: string,
        requestBody: string,
        validators: string,
        exception: string
    }

    @Component({
        components: {ReportDetail}
    })
    export default class Report extends Vue {

        private reportData: ReportItem[]=[];
        private visible: boolean= false;
        private details: Detail[]= [];
        private columns = [
            {
                title: '执行时间',
                dataIndex: 'createdAt',
                key: 'createdAt',
                scopedSlots: { customRender: 'createdAt' },

            },
            {
                title: '执行人',
                dataIndex: 'createdBy',
                key: 'createdBy',
            },
            {
                title: '结果',
                key: 'result',
                dataIndex: 'result',
                scopedSlots: { customRender: 'result' },
            },
            {
                title: '操作',
                key: 'operation',
                scopedSlots: {customRender: 'operation'}
            },
        ];
        private mounted(): void {
            this.reportList();
        }

        private reportList():void{
            if(this.$route.query.group==='0'){
                reportList(Number(this.$route.params.id)).then(
                    (result: any) => {
                        if (result.errcode === "0") {
                            this.reportData=result.retval;
                        }
                    },
                    (err: any) => {
                        this.$message;
                    }
                );
            }else {
                groupReportList(Number(this.$route.params.id)).then(
                    (result: any) => {
                        if (result.errcode === "0") {
                            this.reportData=result.retval;
                        }
                    },
                    (err: any) => {
                        this.$message;
                    }
                );
            }

        }

        private handleDetails(id: number): void{
            this.visible= true;
            reportDetails(id).then(
                (result: any) => {
                    if (result.errcode === "0") {
                        this.details= result.retval;
                    }
                },
                (err: any) => {
                    this.$message;
                }
            )
        }


        // private handleLookRrport(content: string):void{
        //     document.write(content);
        //     document.close();
        // }


    }
</script>

<style scoped>
    /deep/.ant-modal-content {
        width: 1200px;
    }
</style>
