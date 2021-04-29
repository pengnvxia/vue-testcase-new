<template>
<!--    <a-modal v-model="visible" title="报告详情">-->
        <a-table
                :data-source="details"
                :columns="columns"
                :pagination="false"
                :scroll="{ x: true }"
                class="tableDetail">
        </a-table>
<!--    </a-modal>-->
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";


    interface Detail{
        url: string,
        method: string,
        statusCode: string,
        requestHeaders: string,
        requestBody: string,
        response: string,
        validators: string,
        exception: string
    }

    @Component
    export default class ReportDetail extends Vue {
        @Prop({ type: Array, default: () => []})
        private readonly details!: Detail[];

        // @Prop({ type: Boolean, default: () => false })
        // private readonly visible!: boolean;

        private columns = [
            {
                title: 'url',
                dataIndex: 'url',
                scopedSlots: {customRender: 'url'},
            },
            {
                title: 'method',
                dataIndex: 'method',
                scopedSlots: { customRender: 'method' },
            },
            {
                title: 'statusCode',
                dataIndex: 'statusCode',
                scopedSlots: { customRender: 'statusCode' },
            },
            {
                title: 'attachment',
                dataIndex: 'attachment',
                scopedSlots: { customRender: 'attachment' },
            },
            {
                title: 'requestHeaders',
                dataIndex: 'requestHeaders',
                scopedSlots: { customRender: 'requestHeaders' },
            },
            {
                title: 'requestBody',
                dataIndex: 'requestBody',
                scopedSlots: { customRender: 'requestBody' },
            },
            {
                title: 'response',
                dataIndex: 'response',
                scopedSlots: { customRender: 'response' },
            },
            {
                title: 'validators',
                dataIndex: 'validators',
                scopedSlots: { customRender: 'validators' },
            },
            {
                title: 'exception',
                dataIndex: 'exception',
                scopedSlots: { customRender: 'exception' },
            }
        ]

    }
</script>

<style scoped>
        /deep/.tableDetail {
                width: 1000px;
        }
</style>
