<template>
    <div>
        <a-layout id="components-layout-demo-side" style="min-height: 100vh">
            <a-layout-sider :trigger="null" v-model="collapsed" collapsible width="256px">
                <div class="logo" >自动化平台</div>
                <SiderMenu></SiderMenu>
            </a-layout-sider>
            <a-layout>
                <a-layout-header style="background: #fff; padding: 0" >
                    <a-icon class="trigger" :type="collapsed ? 'menu-unfold':'menu-fold'" @click="collapsed = !collapsed"></a-icon>
                    <Header></Header>
                </a-layout-header>
                <a-layout-content style="margin: 0 16px">
                    <router-view/>
                </a-layout-content>
                <a-layout-footer style="text-align: center">
                    <Footer></Footer>
                </a-layout-footer>
            </a-layout>
        </a-layout>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import Header from '@/components/Header/Header.vue';
    import Footer from '@/components/Footer/Footer.vue';
    import SiderMenu from '@/components/Menu/SiderMenu.vue';
    @Component({
        components: {
            Header,
            Footer,
            SiderMenu
        }
    })
    export default class Layout extends Vue {
        private collapsed: boolean = false;

    }
</script>
<style>
    #components-layout-demo-side .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
    }
    .trigger {
        padding:0 20px;
        line-height: 64px;
        font-size: 20px;
    }
    .trigger:hover {
        background: #eee;
    }
    .logo {
        height: 32px;
        line-height: 32px;
        text-align: center;
        color:#fff;
        overflow: hidden;
    }
</style>

