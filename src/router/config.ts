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
            meta:{title:'配置'},
            component: ()=> import('@/views/Config/Index.vue'),
        },
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
