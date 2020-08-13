<template>

    <div style="background-color: #ececec; padding: 20px;">
        <a-button type="primary" class="btn" @click="handleAdd()">
            新增
        </a-button>
        <a-row :gutter="16" class="row">
            <a-col :span="8">
                <a-card :bordered="false" class="card">
                    <a slot="title" href="" class="title" @click="handleDetail()">卡片标题</a>
                    <a slot="extra" href="" class="link" @click="handleEdit()">编辑</a>
                    <a slot="extra" href="" class="link" >删除</a>
                    <p><span>测试环境地址：</span><span>xxx</span></p>
                    <p><span>生产环境地址：</span><span>xxx</span></p>
                    <p class="date">card content</p>
                </a-card>
            </a-col>
            <a-col :span="8">
                <a-card title="Card title" :bordered="false" class="card">
                    <p>card content</p>
                </a-card>
            </a-col>
            <a-col :span="8">
                <a-card title="Card title" :bordered="false" class="card">
                    <p>card content</p>
                </a-card>
            </a-col>

        </a-row>
        <a-row :gutter="16" class="row">
            <a-col :span="8">
                <a-card title="Card title" :bordered="false" class="card">
                    <p>card content</p>
                </a-card>
            </a-col>
<!--            <a-col :span="8">-->
<!--                <a-card title="Card title" :bordered="false">-->
<!--                    <p>card content</p>-->
<!--                </a-card>-->
<!--            </a-col>-->
<!--            <a-col :span="8">-->
<!--                <a-card title="Card title" :bordered="false">-->
<!--                    <p>card content</p>-->
<!--                </a-card>-->
            </a-col>

        </a-row>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    export default class Project extends Vue {
        private handleAdd(): void {
            this.$router.push({
                path: '/add'
            })
        }
        private handleEdit(): void {
            this.$router.push({
                path: '/edit'
            })
        }
        private handleDetail(): void {
            this.$router.push({
                path: '/detail',
                query:{
                    id: '1'
                }
            })
        }
    }

</script>

<style>

    .row {
        padding: 10px;
    }
    .card {
        height: 200px;
    }
    .date {
        float: right;
        margin:0px 0px;
    }
    .link {
        display: inline-block;
        padding: 0px 10px;
        margin-right: -10px;
    }
    .btn {
        margin-left: 8px;
        background-color:#1890ff;
    }
</style>
