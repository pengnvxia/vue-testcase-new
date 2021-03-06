<template>
<!--    <div class="header">我是Header</div>-->
    <a-dropdown class="header">
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            {{username}}<a-icon type="down" />
        </a>
        <a-menu slot="overlay">
            <a-menu-item>
                <a @click="handleLogout">登出</a>
            </a-menu-item>
        </a-menu>
    </a-dropdown>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    @Component
    export default class Header extends Vue {

        private username: string|null='';

        private mounted(): void {
            this.username=localStorage.getItem('username');
        }

        private handleLogout(): void{
            localStorage.clear();
            this.$router.push({
                name:'login',
            })
        }
    }
</script>

<style>
    .header {
        float: right;
        margin-right: 20px;
    }
    .ant-dropdown-link{
        color: black;
    }
    .ant-dropdown-link .anticon{
        margin-left: 10px;
    }

</style>
