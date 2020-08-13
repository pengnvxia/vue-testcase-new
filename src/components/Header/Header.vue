<template>
    <div class="header">我是Header</div>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    @Component
    export default class Header extends Vue {

    }
</script>

<style>
.header {
    float: right;
}
</style>
