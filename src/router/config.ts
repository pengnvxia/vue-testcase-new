import layout from '@/layout/Index.vue';
import { RouteConfig } from 'vue-router';


const config: RouteConfig[] = [{
    path: '/',
    name:'根项目',
    component: layout,
    children: [
        {
            path: 'config',
            name: 'config',
            meta:{title:'配置',isShow: true},
            component: ()=> import('@/views/Config/Index.vue'),
        },
        {
            path: 'config/add',
            name: 'configAdd',
            meta:{title:'添加配置',isShow: false},
            component: ()=> import('@/views/Config/AddConfig.vue'),
        },
        {
            path: 'config/edit/:id',
            name: 'configEdit',
            meta:{title:'添加配置',isShow: false},
            component: ()=> import('@/views/Config/EditConfig.vue'),
        }
        // {
        //     path: 'add',
        //     meta:{title:'新增项目'},
        //     component: ()=> import('@/views/Project/Add.vue')
        // },
        // {
        //     path: 'detail/:id',
        //     meta:{title:'项目详情'},
        //     component: ()=> import('@/views/Project/Detail.vue')
        // },
        // {
        //     path: 'edit/:id',
        //     meta:{title:'编辑项目'},
        //     component: ()=> import('@/views/Project/Edit.vue')
        // },
        // {
        //     path: 'addcase/:id',
        //     meta: {title:'添加用例'},
        //     component: ()=> import('@/views/Case/AddCase.vue')
        // },
        // {
        //     path: 'editcase/:id',
        //     meta: {title:'编辑用例'},
        //     component: ()=> import('@/views/Case/EditCase.vue')
        // }
        ]
}];

export default config;
