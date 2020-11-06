import layout from '@/layout/Index.vue';
import { RouteConfig } from 'vue-router';


const project: RouteConfig[] = [{
    path: '/',
    name:'根项目',
    component: layout,
    children: [
        {
            path: 'index',
            name: 'project',
            meta:{title:'项目',isShow: true},
            component: ()=> import('@/views/Project/Index.vue'),
        },
        {
            path: 'add',
            name: 'add',
            meta:{title:'新增项目',isShow: false},
            component: ()=> import('@/views/Project/Add.vue')
        },
        {
            path: 'detail/:id',
            name: 'detail',
            meta:{title:'项目详情',isShow: false},
            component: ()=> import('@/views/Project/Detail.vue')
        },
        {
            path: 'edit/:id',
            name: 'edit',
            meta:{title:'编辑项目',isShow: false},
            component: ()=> import('@/views/Project/Edit.vue')
        },
        {
            // path: 'addcase/:id',
            path: 'addcase/:projectId/:envId/:id',
            name: 'addcase',
            meta: {title:'添加用例',isShow: false},
            component: ()=> import('@/views/Case/AddCase.vue')
        },
        {
            // path: 'editcase/:id',
            path: 'editcase/:projectId/:envId/:id',
            meta: {title:'编辑用例',isShow: false},
            component: ()=> import('@/views/Case/EditCase.vue')
        },
        {
            path: 'report/:id',
            name: 'report',
            meta:{title:'报告',isShow: false},
            component: ()=> import('@/views/Report/Index.vue'),
        }

        // {
        //     path: 'index1',
        //     name: '项目1',
        //     component: ()=> import('../views/Project/Index.vue')
        // },
        // {
        //     path: 'index',
        //     name: '项目3',
        //     component: ()=> import('../views/Project/Index.vue')
        // }
    ]
    // meta: {
    //     isLogin: true
    // },
    // children: [
    //     {
    //         path: '',
    //         redirect: '/project/index' // 首页
    //     },
        // {
        //     path: 'index',
        //     name: 'homeList',
        //     meta: {
        //         isLogin: true,
        //         title: '项目列表'
        //     },
        //     component: () => import(/* webpackChunkName: "project" */ '../views/Project/List/Index.vue')
        // },
        // {
        //     path: 'save', // 添加项目
        //     name: 'homeSave',
        //     meta: {
        //         isLogin: true,
        //         title: '添加项目'
        //     },
        //     component: () => import(/* webpackChunkName: "project" */ '../views/Project/Save/Index.vue')
        // }
    // ]
}];

export default project;
