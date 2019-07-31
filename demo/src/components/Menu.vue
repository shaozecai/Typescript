<template>
    <div class="menu-box" :style="{padding:'10px 15px',background:'#7b7b7b',textAlign:'right'}">
        <el-drawer
        title="菜单"
        size="80%"
        :visible.sync="drawer"
        direction="ltr"
        >
            <div class="menu-content">
                <ul style="list-style: none;">
                    <li v-for="item in menuList" :key="item.id">                       
                        <span @click="closeMenu">
                            <router-link :to="item.link"> {{item.name}}</router-link>
                        </span>
                    </li>
                </ul>
            </div>

        </el-drawer>
        <el-button @click="drawer = true" type="" style="">
            菜单
        </el-button>
    </div>
    
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ArrayPropsDefinition } from 'vue/types/options';

@Component
export default class Menu extends Vue {
    private drawer: Boolean;
    private menuList: Array<Object>;
    constructor() {
        super();
        this.drawer = false;
        this.menuList = [
            {id:'001',name:'Home',link:'/'},
            {id:'002',name:'About',link:'/about'},
            {id:'003',name:'菜单3',link:'/home'},
            {id:'004',name:'菜单4',link:'/home'}
        ]
    }

    closeMenu(){
        this.drawer = !this.drawer
    }
}
</script>

