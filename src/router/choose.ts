import { RouteConfig } from 'vue-router';


const choose: RouteConfig[] = [
    {
        path: 'choose/case/:id/:envId',
        name: 'chooseCase',
        meta: {title:'选择用例',levels: 3,isShow: false},
        component: ()=> import('@/views/CaseGroup/choose/ChooseCase.vue')
    },
    {
        path: 'choose/config',
        name: 'chooseConfig',
        meta: {title:'选择配置',levels:3,isShow: false},
        component: ()=> import('@/views/CaseGroup/choose/ChooseConfig.vue')
    }
];

export default choose;
