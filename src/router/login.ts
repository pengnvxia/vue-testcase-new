import { RouteConfig } from 'vue-router';


const login: RouteConfig[] = [
    {
        path: '/login',
        name: 'login',
        meta: {title:'登录',isShow: false},
        component: ()=> import('@/views/User/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        meta: {title:'注册',isShow: false},
        component: ()=> import('@/views/User/Register.vue')
    }

];

export default login;
