<template>

    <div style="background-color: #ececec; padding: 20px;">
        <a-button type="primary" class="btn" @click="handleAdd()">
            新增
        </a-button>

        <a-row :gutter="16" class="row" v-for="projectItem in projectDataThree">
            <a-col :span="8" v-for="item in projectItem">
                <a-card :bordered="false" class="card">
                    <a slot="title" class="title" @click="handleDetail(item.id)">{{item.projectName}}</a>
                    <a slot="extra" class="link" @click="handleEdit(item.id)">编辑</a>
                    <a slot="extra" class="link" @click.delay="handleDel(item.id,item.projectName)">删除</a>
                    <p class="address"><span>测试环境地址：{{item.devAddress}}</span></p>
                    <p class="address"><span>生产环境地址：{{item.prodAddress}}</span></p>
                    <p class="date">{{item.updatedBy}}于{{item.updatedAt | formatDate}}编辑</p>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { getProjectList,deleteProject } from "@/services/project/index";

    interface ProjectItem {
        id: number;
        projectName: string;
        devAddress?: string;
        prodAddress?: string;
        updatedAt: string;
        updatedBy: string;
        description?: string;
    }

    @Component
    export default class Project extends Vue {

        private projectData: ProjectItem[] = [];
        private projectDataThree: any[] = [];
        private mounted(): void {
            this.projectList();
        }

        private projectList(): void {
            getProjectList().then(
                (result: any) => {
                    if (result.errcode === "0") {
                        this.projectData=result.retval;
                        this.projectListThree();
                    }
                },
                (err: any) => {
                    this.$message;
                }
            );
        }
        private projectListThree(): void {
            this.projectDataThree = [];
            if(this.projectData.length > 0){
                for( let i = 0 ; i<(this.projectData.length / 3 >> 0) + 1; i ++){
                    if( 3 * ( i + 1 )<this.projectData.length ){
                        this.projectDataThree.push(this.projectData.slice( 3 * i, 3 * ( i + 1 )));
                    }else {
                        this.projectDataThree.push(this.projectData.slice( 3 * i, this.projectData.length));
                    }

                }
            }

        }
        private handleAdd(): void {
            this.$router.push({
                path: '/add'
            });
        }
        private handleEdit(projectId:number): void {
            this.$router.push({
                path: `/edit/${projectId}`

            });

        }
        private handleDetail(projectId:number): void {
            this.$router.push({
                path:`/detail/${projectId}`
            });
        }

        private handleDel(id:number,name:string): void{
            let that: any=this;
            this.$confirm({
                title: `确定要删除${name}项目吗？`,
                content: '删除后将无法恢复!',
                onOk() {
                    deleteProject(id).then(
                        (result: any) => {
                            if (result.errcode === "0") {
                                that.$message.success("删除成功!");
                                //缺少重新加载语句
                                that.projectList();
                            }
                        },
                        (err: any) => {
                            if (err.errcode === "PRO001") {
                                that.$message;
                                return;
                            }
                            that.$message.error(err.errmsg);
                        }
                    );
                },
                onCancel(){},
            })
        }
    }

</script>

<style lang="scss" scoped>

    .row {
        padding: 10px;
    }
    .card {
        height: 200px;
    }
    .card .ant-card-body {
        padding: 24px 24px 0px 24px;
        height: 143px;
    }
    .address {
        margin: 10px 0px 10px 0px;
    }
    .date {
        float: right;
        margin-top: 20px;
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
