<!--<template>-->
<!--  <div class="home">-->
<!--    <el-container class="conatainer">-->
<!--      <el-header>-->
<!--        <top @operateMenu="operateMenu"></top>-->
<!--      </el-header>-->
<!--      <el-container>-->
<!--        <left :isCollapse="isCollapse"></left>-->
<!--        <el-container class="c-main">-->
<!--          <el-main >-->
<!--            <router-view/>-->
<!--          </el-main>-->
<!--          <el-footer><bottom></bottom></el-footer>-->
<!--        </el-container>-->
<!--      </el-container>-->
<!--    </el-container>-->
<!--  </div>-->
<!--</template>-->
<!--<script lang="ts">-->
<!--  import { Component, Vue, Prop } from 'vue-property-decorator';-->
<!--  import Top from '@/components/Top/Top.vue';-->
<!--  import Bottom from '@/components/Bottom/Bottom.vue';-->
<!--  import Left from '@/components/Left/Left.vue';-->
<!--  @Component({-->
<!--    components: {-->
<!--      Top,-->
<!--      Bottom,-->
<!--      Left-->
<!--    }-->
<!--  })-->
<!--  export default class Layout extends Vue {-->
<!--    private isCollapse: boolean =  false;-->
<!--    private operateMenu(): void {-->
<!--      this.isCollapse = !this.isCollapse;-->
<!--    }-->
<!--    private mounted(): void {-->
<!--      this.setWindowsSize();-->
<!--      window.onresize = () => {-->
<!--        this.setWindowsSize();-->
<!--      };-->
<!--    }-->
<!--    private setWindowsSize(): void {-->
<!--      if (window.innerWidth < 1200) {-->
<!--        this.isCollapse = true;-->
<!--      } else {-->
<!--        this.isCollapse = false;-->
<!--      }-->
<!--      console.log(this.isCollapse)-->
<!--    }-->
<!--  }-->
<!--</script>-->


<!--<style lang="scss">-->
<!--  .home{-->
<!--    .el-header, .el-footer {-->
<!--      //background-color: #ccc;-->
<!--      color: #333;-->
<!--      text-align: center;-->
<!--      line-height: 60px;-->
<!--      padding: 0;-->
<!--    }-->
<!--    .el-header{-->
<!--      background-color: rgb(84, 92, 100);-->
<!--    }-->
<!--    .el-aside {-->
<!--      background-color: #D3DCE6;-->
<!--      color: #333;-->
<!--      text-align: center;-->
<!--    }-->

<!--    .el-main {-->
<!--      //background-color: #E9EEF3;-->
<!--      color: #333;-->
<!--      text-align: center;-->
<!--      overflow: initial;-->
<!--      padding: 20px 20px;-->
<!--    }-->

<!--    .el-container {-->

<!--    }-->

<!--    .el-container:nth-child(5) .el-aside,-->
<!--    .el-container:nth-child(6) .el-aside {-->

<!--    }-->

<!--    .el-container:nth-child(7) .el-aside {-->

<!--    }-->
<!--    .conatainer{-->
<!--      height: 100vh;-->
<!--    }-->
<!--    .c-main{-->
<!--      height: calc(100vh - 61px);-->
<!--      overflow: auto;-->
<!--    }-->
<!--  }-->
<!--</style>-->
