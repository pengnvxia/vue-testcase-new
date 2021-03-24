

<template>
            <a-table bordered :data-source="item" :columns="extractColumns" :pagination="false">
                <template
                        v-for="col in ['name', 'responseKey']"
                        :slot="col"
                        slot-scope="text, record, index"

                >
                    <div :key="col">
<!--                        :prop="'item.'+index+'.name'"-->
                        <a-form-model-item v-if="col == 'name'"  :rules="rulesInfoName">
                            <a-input
                                    v-model="record.name"/>
                        </a-form-model-item>
<!--                        :prop="'item.'+index+'.responseKey'"-->
                        <a-form-model-item v-if="col == 'responseKey'" :rules="rulesInfoResponseKey">
                            <a-input v-model="record.responseKey" />
                        </a-form-model-item>
                    </div>
                </template>
                <template slot="operation" slot-scope="text, record, index">
                    <a-popconfirm v-if="item.length">
                        <a-icon type="minus" @click="handleDeleteExtracts(index)"/>
                    </a-popconfirm>
                    <a-icon type="plus" @click="handleAddExtracts(index)"/>
                </template>
                <a-icon type="plus" slot="footer" v-if="item.length<=0" @click="handleAddExtracts(0)"/>
            </a-table>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";

    interface Extract{
        key: number,
        name: string,
        responseKey: string
    }

    @Component
    export default class CaseExtract extends Vue {

        @Prop({type: Array, default: () => []})
        private readonly item!: Extract[];

        @Prop({type: Array, default: () => []})
        private readonly columnsName!:[];

        @Prop({type: Array, default: () => []})
        private readonly rulesInfoName!: [];

        @Prop({type: Array, default: () => []})
        private readonly rulesInfoResponseKey!: [];

        // private mounted():void {
        //     console.log(this.rulesInfoName,8888);
        //     console.log(this.item,9999);
        // }

        private handleAddExtracts(index: number): void{
            const newData = {
                key: (new Date()).valueOf(),
                name: '',
                responseKey: ''
            };
            this.item.splice(index+1,0,newData);
        }

        private handleDeleteExtracts(index: number): void{
            this.item.splice(index,1);
        }

        private extractColumns = [
            {
                title: 'name',
                dataIndex: 'name',
                width: '50%',
                scopedSlots: {customRender: 'name'},
            },
            {
                title: 'responseKey',
                dataIndex: 'responseKey',
                scopedSlots: { customRender: 'responseKey' },
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' },
            },
        ]

    }
</script>
