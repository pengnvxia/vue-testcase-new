

<template>
    <a-collapse-panel key="extract" header="Extract">

    </a-collapse-panel>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";

    @Component
    export default class CaseComponents extends Vue {

        @Prop({type: Object, default: null})
        private readonly item!: {};

        @Prop({type: Array, default: () => []})
        private readonly columnsName!:[];

        @Prop({type: Array, default: () => []})
        private readonly rulesInfo!: [];

        private mounted():void {
            console.log(this.item,8888);
            console.log(this.columnsName,9999);

        }

        // get effectiveCol(): string[]{
        //     let col:string[]=[];
        //     for(let i=0;i<this.columns.length-1;i++){
        //         col.push(this.columns[i].title);
        //     }
        //     return col;
        // }

        private handleDeleteSetupHooks(index: number): void {
            // this.item.splice(index,1);
        }

        private handleAddSetupHooks(index: number): void {
            const newData = {
                key: (new Date()).valueOf(),
                sql: '',
                databaseId: null
            };
            // this.item.splice(index+1,0,newData);
        }

    }
</script>
