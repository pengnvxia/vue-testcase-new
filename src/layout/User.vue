<template>
    <div>
        <div class="header">
        <RenderRouterView></RenderRouterView>
        </div>

        <router-view/>

    </div>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    export default class User extends Vue {

    }

</script>
<style>
    .header {
        height: 80px;
        width: 100px;
        margin: 0px auto;
        padding-top: 100px;
        padding-bottom: 10px;
        text-align: center;
    }

</style>
