<template>
    <div>
<!--        -->
    <iframe class="rapIframe" :src=skipUrl scrolling="no">
    </iframe>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    @Component
    export default class RapPage extends Vue {

        private skipUrl: string='';

        private mounted(): void {
            this.skipUrl='http://172.16.9.170:3000/repository/editor?id='+this.$route.params.id+'&userID='+localStorage.getItem('userId');
            console.log(this.skipUrl);
        }
    }
</script>
<style>
    .rapIframe {
        width: 100%;
        /*需要重新编写*/
        height: 1750px;
    }
</style>
