<template>
  <div class="weclome ant-view">
    <ant-menu-top class="menu-top"></ant-menu-top>
    <a-card>
      <div class="weclome-list">
        <div class="weclome-card">
          <img class="weclome-img" src="./image/error.png" alt srcset />
          <div class="weclome-font">页面好像走丢了～</div>
          <div class="weclome-info">
            <a-button type="primary" @click="jump">返回</a-button>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class WelCome extends Vue {
  private jump(): void {
    this.$router.go(-1);
  }
}
</script>
<style scoped lang="scss">
.weclome {
  .menu-top {
    height: 54px;
  }
  .weclome-list {
    height: calc(100vh - 220px);
    display: flex;
    align-items: center;
    justify-content: center;
    .weclome-card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      .weclome-img {
        width: 220px;
        height: 160px;
      }
      .weclome-font {
        margin-top: 4px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 20px;
      }
      .weclome-info {
        margin-top: 11px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(103, 103, 103, 1);
      }
    }
  }
}
</style>