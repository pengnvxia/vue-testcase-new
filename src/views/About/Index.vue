<template>
  <div class="about">
    <div class="wrapper">
      <h2>已安装技术列表</h2>
      <ul>
        <li>vue</li>
        <li>vue-router</li>
        <li>vuex</li>
        <li>typescript</li>
        <li>ant design vue</li>
        <li>sass</li>
      </ul>
    </div>
    <div class="wrapper">
      <h2>目录结构</h2>
      <ul>
        <li>config ------------- webpack 抽离配置</li>
        <li>dev ---------------- 测试环境nginx配置目录 </li>
        <li>prod --------------- 生产环境nginx配置目录 </li>
        <li>public ------------- 静态文件html位置、不被webapck处理的静态文件目录</li>
        <li>
          src ---------------- 项目代码主要目录
          <ul>
            <li>--- assets -------- 静态文件存放位置</li>
            <li>--- base ---------- 系统级非常底层组件，通node_modules组件（不带任何业务逻辑的组件）</li>
            <li>--- common ----- 公共TS, sass 存放位置</li>
            <li>--- components - 公共组件（可带复用业务逻辑）</li>
            <li>--- config -------- 全局配置信息</li>
            <li>--- router -------- 路由</li>
            <li>--- store --------- vuex</li>
            <li>--- types --------- typescript定义</li>
            <li>--- view ---------- 页面级组件存放位置</li>
            <li>--- APP ----------- 全局入口组件</li>
            <li>--- main.ts ------- 全局入口文件</li>
          </ul>
        </li>
        <li>.browserslistrc ---- 浏览器兼容版本信息</li>
        <li>.env --------------- 全局系统级常量配置文件</li>
        <li>.gitignore --------- git忽略的文件信息</li>
        <li>babel.config.js ---- babel配置项</li>
        <li>package.json ------- node_modules安装的插件配置信息</li>
        <li>tsconfig.json ------ ts配置文件</li>
        <li>tslint ------------- 代码输写规范定义</li>
      </ul>
    </div>
    <div class="btns">
      <a-button type="primary" @click="goHome">去首页</a-button>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class Home extends Vue {
  private goHome(): void {
    this.$router.push({path: '/home'});
  }
}
</script>
<style scoped lang="scss">
.about {
  height: 100vh;
  padding-top: 5%;
  text-align: center;
  background-color: #fff;
  h2{
    font-weight: bold;
    padding-bottom: 20px;
  }
  ul{
    li{
      line-height: 2em;
      ul{
        background-color: #dcdcdc;
      }
    }
  }
  .wrapper{
    width: 1000px;
    margin: 0 auto;
    text-align: left;
    padding-bottom: 50px;
  }
  .btns{
    padding-top: 50px;
  }
}
</style>
