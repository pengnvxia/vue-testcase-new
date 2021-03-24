import layout from '@/layout/Index.vue';
import { RouteConfig } from 'vue-router';


const database: RouteConfig[] = [{
    path: '/',
    name:'根项目',
    component: layout,
    children: [
        {
            path: 'database',
            name: 'database',
            meta:{title:'数据库',isShow: true},
            component: ()=> import('@/views/Database/Index.vue'),
        },
        {
            path: 'database/add',
            name: 'databaseAdd',
            meta:{title:'添加数据库信息',isShow: false},
            component: ()=> import('@/views/Database/AddDatabase.vue'),
        },
        {
            path: 'database/edit/:id',
            name: 'databaseEdit',
            meta:{title:'添加数据库信息',isShow: false},
            component: ()=> import('@/views/Database/EditDatabase.vue'),
        }
    ]
}];

export default database;
