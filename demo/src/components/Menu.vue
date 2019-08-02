<template>
    <div class="menu-box" :style="{textAlign:'right'}">
        <van-dropdown-menu :style="{background:'#dbdbdb'}" active-color="#0ca055">
            <van-dropdown-item @change="menuChange" v-model="activeMenu" :options="this.menuList" />
        </van-dropdown-menu>
    </div>
    
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ArrayPropsDefinition } from 'vue/types/options';

interface creatObj {
    value?: string,
    text?: string,
    link?: string
}


@Component
export default class Menu extends Vue {
    private drawer: Boolean;
    private activeMenu: string;
    private menuList: object[];

    
    constructor() {
        super();
        this.drawer = false;
        this.activeMenu = '001';

        let obj: creatObj = Object.create(null);
        obj.value = "001";
        obj.text = "首页";
        obj.link = "/";
        let obj2: creatObj = Object.create(null);
        obj2.value = "002";
        obj2.text = "关于";
        obj2.link = "/about";
        this.menuList = [obj,obj2];
        

    }

    private closeMenu(): void {
        this.drawer = !this.drawer;
    }

    private menuChange(value:string): void{
        let link:string = ''
        this.menuList.forEach((element:any) => {
            if(element.value === value){
                link = element.link
            }
        });
        this.$router.push(link)
    }
}
</script>

