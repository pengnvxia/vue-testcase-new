
<template>
    <a-tabs @change="callback">
        <a-tab-pane key="1" tab="模块1">
            <a-table :columns="columns" :data-source="data" class="components-table-demo-nested">
        <span slot="operation" slot-scope="text">
        <a>编辑</a>
        <a>删除</a>
        </span>
                <a-table
                        slot="expandedRowRender"
                        slot-scope="text"
                        :columns="innerColumns"
                        :data-source="innerData"
                        :pagination="false"
                >
            <span slot="operation" slot-scope="text" class="table-operation">
        <a>编辑</a>
        <a>运行</a>
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item>
              删除
            </a-menu-item>
            <a-menu-item>
              复制
            </a-menu-item>
          </a-menu>
          <a>···<a-icon type="down" /> </a>
        </a-dropdown>
      </span>
                    <a-button slot="footer" class="addCaseBtn">添加</a-button>
                </a-table>
            </a-table>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Tab 2">
            Content of Tab Pane 2
        </a-tab-pane>
        <a-tab-pane key="3">
            <a-icon slot="tab" type="plus" />
            Content of Tab Pane 3
        </a-tab-pane>

    </a-tabs>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    @Component
    export default class Detail extends Vue {
        private columns = [
            {title: '接口名称', dataIndex: 'name', key: 'name'},
            {title: '地址', dataIndex: 'address', key: 'address'},
            {title: '最后编辑人', dataIndex: 'updator', key: 'updator'},
            {title: '更新时间', dataIndex: 'updatedAt', key: 'updatedAt'},
            {title: '操作', key: 'operation', scopedSlots: {customRender: 'operation'}},
        ];
        private data = [{key: 1,name: 'Screem',address: 'iOS',updator: 'Jack',updatedAt: '2014-12-24 23:12:00'}];

        private innerColumns = [
            {title: '用例名称', dataIndex: 'caseName', key: 'caseName'},
            {title: '所属环境', dataIndex: 'environment', key: 'environment'},
            {title: '最后编辑人', dataIndex: 'updator', key: 'updator'},
            {title: '更新时间', dataIndex: 'updatedAt', key: 'updatedAt'},
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                scopedSlots: {customRender: 'operation'},
            },
        ];
        private innerData = [{key: 1, "environment": "测试环境",updator: 'Jack',updatedAt: '2014-12-24 23:12:00',caseName: 'This is production name'}];

    }

</script>
<style>
    span a {
        display: inline-block;
        margin-right: 10px;
    }
</style>
