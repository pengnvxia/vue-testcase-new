<template>
    <div style="width: 256px">

        <a-menu
                :default-selected-keys="['1']"
                :default-open-keys="['2']"
                mode="inline"
                theme="dark"

        >
            <template v-for="item in menuData">
                <a-menu-item v-if="!item.children" :key="item.key" @click="()=>$router.push({path:item.path,query:$route.query})">
                    <a-icon type="pie-chart" />
                    <span>{{ item.meta.title }}</span>
                </a-menu-item>
                <SubMenu v-else :key="item.key" :menu-info="item" />
            </template>
        </a-menu>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import SubMenu from '@/components/Menu/SubMenu.vue';


    interface Menu {
        key:string,
        title:string,
        path:string,
        meta:{},
        children?:ItemMenu[]
    }
    interface ItemMenu {
        key:string,
        title:string,
        path:string,
        meta:{},
        children?:ItemMenu[]
    }

    @Component({
        components: {
            SubMenu
        }
    })
    export default class SiderMenu extends Vue {
        private menuData: any = this.getMenuData(this.$router.options.routes);

        private getMenuData(route:any): any{
            const newMenuData:any[]=[];
            route.forEach((item: any)=>{
                if (item.children) {
                    item.children.forEach((itemChildren:any)=>{
                        // if(itemChildren.name && !itemChildren.hideInMenu){
                        //     const newItem = {...itemChildren};;
                        //     delete newItem.children;
                        //     if(itemChildren.children && !itemChildren.hideChildrenInMenu) {
                        //         newItem.children=this.getMenuData(itemChildren.children);
                        //     }else {
                        //         this.getMenuData(itemChildren);
                        //     }
                        //     newMenuData.push(newItem)
                        // }else{
                        //     newMenuData.push(...this.getMenuData(itemChildren.children))
                        // }
                        if(itemChildren.name){
                            const newItem = {...itemChildren};
                            delete newItem.children;
                            if(itemChildren.children){
                                newItem.children = this.getMenuData(itemChildren.children)
                            }
                            newMenuData.push(newItem)
                        }


                    })

                }
            });
            return newMenuData;

        //         if(item.name && !item.hideInMenu){
        //             const newItem = {...item};
        //             delete newItem.children;
        //             // if (item.children && !item.hideChildrenInMenu) {
        //             //     newItem.children = this.getMenuData(item.children, [...parentKeys,item.path]);
        //             // } else {
        //             //     this.getMenuData(item.children, selectedKeys ? parentKeys :[...parentKeys,item.path],selectedKeys || item.path);
        //             // }
        //             newMenuData.push(newItem);
        //         }else if (
        //             !item.hideInMenu && !item.hideChildrenInMenu && item.children
        //         ){
        //             // this.menuData.push(...this.getMenuData(item.children, [...parentKeys,item.path]));
        //         }
        //     })
        //     return newMenuData;
        }

        // private list: Menu[] = [{key: '1', title: 'aaa',children:[{key:'1.1',title:'子菜单'}]},{key: '2', title: 'Navigation 2'}];
        // private list: any[] =[{key: '1', title: 'Option 1',}, {key: '2', title: 'Navigation 2', children: [{key: '2.1', title: 'Navigation 3', children: [{ key: '2.1.1', title: 'Option 2.1.1' }],},],},];
        // data() {
        //     return {
        //         collapsed: false,
        //         list: [
        //             {
        //                 key: '1',
        //                 title: 'Option 1',
        //             },
        //             {
        //                 key: '2',
        //                 title: 'Navigation 2',
        //                 children: [
        //                     {
        //                         key: '2.1',
        //                         title: 'Navigation 3',
        //                         children: [{ key: '2.1.1', title: 'Option 2.1.1' }],
        //                     },
        //                 ],
        //             },
        //         ],
        //     };
        // },
        // methods: {
        //     toggleCollapsed() {
        //         this.collapsed = !this.collapsed;
        //     },
        // },

    };
</script>
