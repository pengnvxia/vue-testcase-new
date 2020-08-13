import Vue from 'vue';
import Router from 'vue-router';
import project from './project';


// //\ 屏蔽相同路由时报错
const originalPush: any = Router.prototype.push;
Router.prototype.push = function push(location: any): any {
  // @ts-ignore
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

export const router: Router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      ...project,
    {
      path: '/',
      redirect: '/home',
      meta: {
        title: '首页'
      }
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        title: '首页'
      },
      component: () => import(/* webpackChunkName: "notFound" */ '@/views/Home/Index.vue')
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: '关于我们'
      },
      component: () => import(/* webpackChunkName: "notFound" */ '@/views/About/Index.vue')
    },
    {
      path: '*',
      name: 'error',
      meta: {
        title:'错误'
      },
      component: () => import(/* webpackChunkName: "notFound" */ '@/views/Error/Index.vue')
    }
  ]
});
