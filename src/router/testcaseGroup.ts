import layout from '@/layout/Index.vue';
import { RouteConfig } from 'vue-router';


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
        // {
        //     path: 'config/add',
        //     name: 'configAdd',
        //     meta:{title:'添加配置',isShow: false},
        //     component: ()=> import('@/views/Config/AddConfig.vue'),
        // },
        // {
        //     path: 'config/edit/:id',
        //     name: 'configEdit',
        //     meta:{title:'添加配置',isShow: false},
        //     component: ()=> import('@/views/Config/EditConfig.vue'),
        // }
    ]
}];

export default testcaseGroup;
