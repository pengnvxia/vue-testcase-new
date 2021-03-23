<template>
    <div class="breadcrumb">
        <div class="breadcrumb-container">
            <a-breadcrumb separator=">">
                <a-breadcrumb-item v-if="breadcrumbList">
                    <a href="javascript:void(0)">{{breadcrumbList}}</a>
                </a-breadcrumb-item>
                <a-breadcrumb-item v-for="item in data">
                    <span>{{item.title}}</span>
<!--                    <a @click="goUrl(item.name ? item.name : item.path, item.name ? 1 : 2)" href="javascript:void(0)">{{item.title}}</a>-->
                </a-breadcrumb-item>
            </a-breadcrumb>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch, Prop } from 'vue-property-decorator';

    @Component({
        components: {

        }
    })

    export default class Breadcrumb extends Vue {
        private data: any[] = [];

        @Prop({
            type: String,
            default(): string {
                return '';
            }
        })
        private breadcrumbList: any;

        @Watch('$route')
        public route(): void {
            this.setRouter();
        }
        private mounted(): void {
            this.setRouter();
        }

        private setRouter(): void {
            const matched: any[] = this.$route.matched;
            const father: any = this.$route.meta.father;
            const data: any[] = [];
            let obj: any = {};
            matched.forEach(item => {
                obj = {
                    name: item.name,
                    path: item.path,
                    title: item.meta.title
                };
                data.push(obj);
            });
            obj = {};
            if (father) {
                obj = {
                    name: father.name,
                    title: father.title
                };
                data.splice(matched.length - 1, 0, obj);
            }
            this.data = data;
        }

        private goUrl(name: string, type: number): void {
            if (!name) return;
            if (type === 2) {
                this.$router.push({
                    path: name
                });
            } else {
                this.$router.push({
                    name
                });
            }
        }
    }
</script>


<style>
    .breadcrumb {
        display: inline-block;
    }
</style>
