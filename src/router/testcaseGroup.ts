import layout from '@/layout/Index.vue';
import { RouteConfig } from 'vue-router';
import choose from "@/router/choose";


const testcaseGroup: RouteConfig[] = [{
    path: '/',
    name:'根项目',
    component: layout,
    children: [
        {
            path: 'group',
            name: 'group',
            meta:{title:'用例组',isShow: true},
            component: ()=> import('@/views/CaseGroup/Index.vue'),
        },
        {
            path: 'group/add',
            name: 'groupAdd',
            meta:{title:'添加用例组',isShow: false},
            component: ()=> import('@/views/CaseGroup/AddGroup.vue'),
            children: [
                ...choose
            ]
        },
        {
            path: 'group/edit/:id',
            name: 'groupEdit',
            meta:{title:'添加配置',isShow: false},
            component: ()=> import('@/views/CaseGroup/EditGroup.vue'),
            children: [
                ...choose
            ]
        }
    ]
}];

export default testcaseGroup;
