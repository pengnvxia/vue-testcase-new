import { RouteConfig } from 'vue-router';


const editChoose: RouteConfig[] = [
    {
        path: 'choose/case/:id/:envId',
        name: 'editChooseCase',
        meta: {title:'选择用例',levels: 3,isShow: false},
        component: ()=> import('@/views/CaseGroup/choose/ChooseCase.vue')
    },
    {
        path: 'choose/config',
        name: 'editChooseConfig',
        meta: {title:'选择配置',levels:3,isShow: false},
        component: ()=> import('@/views/CaseGroup/choose/ChooseConfig.vue')
    }
];

export default editChoose;
