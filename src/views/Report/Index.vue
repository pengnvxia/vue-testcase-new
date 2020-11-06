<template>
    <a-table :columns="columns" :data-source="reportData" rowKey="id">
        <span slot="createdAt" slot-scope="createdAt">
            {{ createdAt | formatDate }}
        </span>
        <span slot="result" slot-scope="result">
            <a-tag :color="result === 1 ? 'green':'red'">
                {{result==1?'成功':'失败'}}
            </a-tag>

        </span>
        <span slot="action" slot-scope="record">
            <a @click="handleLookRrport(record.reportHtml)">查看</a>
        </span>
    </a-table>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { reportList } from "@/services/report/index";

    interface ReportItem {
        id: number,
        createdAt?: string,
        createdBy?: string,
        result: number,
        reportLink?: string,
        reportHtml: string
    }

    @Component
    export default class Report extends Vue {

        private reportData: ReportItem[]=[];
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
                key: 'action',
                scopedSlots: { customRender: 'action' },
            },
        ];
        private mounted(): void {
            this.reportList();
        }

        private reportList():void{
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
        }

        private handleLookRrport(content: string):void{
            document.write(content);
            document.close();
        }


    }
</script>
