<template>
  <div id="app">
    <a-config-provider :locale="zh_CN">
      <router-view />
    </a-config-provider>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
@Component
export default class App extends Vue {
  private zh_CN: any = zh_CN;
}
</script>

<style scoped lang="scss">
#mainApp {
  min-height: calc(100vh - 168px);
}
</style>
