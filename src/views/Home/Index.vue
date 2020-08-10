<template>
  <div class="home">
    家辉PC前端模板
    <div class="btns">
      <a-button type="primary" @click="goAbout">关于我们</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class Home extends Vue {
  private goAbout(): void {
    this.$router.push({path: '/about'});
  }
}
</script>
<style scoped lang="scss">
.home {
  height: 100vh;
  padding-top: 10%;
  text-align: center;
  background-color: #fff;
  font-weight: bold;
  font-size: 24px;
  .btns{
    padding-top: 50px;
  }
}
</style>
