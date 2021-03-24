// import layout from '@/layout/Index.vue';
import { RouteConfig } from 'vue-router';


const testcase: RouteConfig[] = [
        {
            path: 'addcase/:projectId/:envId/:interid',
            name: 'addCase',
            meta: {title:'添加用例',levels:3,isShow: false},
            component: ()=> import('@/views/Case/AddCase.vue')
        },
        {
            path: 'editcase/:projectId/:envId/:interid',
            name: 'editCase',
            meta: {title:'编辑用例',levels:3,isShow: false},
            component: ()=> import('@/views/Case/EditCase.vue')
        }
];

export default testcase;
