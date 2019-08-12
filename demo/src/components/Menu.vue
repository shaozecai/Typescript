<template>
    <div class="menu-box" :style="{textAlign:'center',background:'#07b3b1',padding:'10px'}">
        <van-row>
            <van-col span="12" :style="{textAlign:'left'}">
                <van-col span="6">
                    <span @click="menuShow = !menuShow" :style="{display:'block',width:'32px',height:'32px',borderRadius:'50%',background:'#fff',overflow:'hidden',padding:'5px'}"><img src="../assets/logo.png" alt="" width="100%"></span>
                </van-col>
                <van-col span="18" :style="{lineHeight:'2.4',color:'#ffffff',padding:'0 12px'}">
                    <h1 :style="{fontSize:'18px',color:'#ffffff',margin:'0',letterSpacing:'3px'}">爱宠笔记</h1>
                </van-col>
            </van-col>
            <van-col span="12" :style="{textAlign:'right',fontSize:'14px',lineHeight:'30px',color:'#fff',display:'flex',justifyContent:'flex-end'}">
               <van-icon @click="openSearch" name="search" :style="{fontSize:'26px',lineHeight:'1.6',color:'#ffffff',paddingLeft:'10px'}"/>
               <van-icon @click="openMore" name="more-o" :style="{fontSize:'24px',lineHeight:'1.7',color:'#ffffff',paddingLeft:'10px'}"/>
               <!-- 搜索弹出 -->
               <van-popup v-model="searchShow" position="top" :style="{padding:'20px 10px',boxSizing:'border-box'}">
                    <van-search v-model="searchValue" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch">
                        <div slot="action" @click="onSearch">搜索</div>
                    </van-search>
               </van-popup>
               <!-- 更多弹出 -->
               <van-popup v-model="moreShow" position="top" :style="{padding:'20px 10px',boxSizing:'border-box'}">
                   <van-grid :border="false" :column-num="4">
                        <van-grid-item>
                            <van-icon name="wechat" :style="{color:'#07b3b1',fontSize:'30px'}"/>
                        </van-grid-item>
                        <van-grid-item>
                            <van-icon name="alipay" :style="{color:'#07b3b1',fontSize:'30px'}"/>
                        </van-grid-item>
                        <van-grid-item>
                            <van-icon name="scan" :style="{color:'#07b3b1',fontSize:'30px'}"/>
                        </van-grid-item>
                        <van-grid-item>
                            <van-icon name="shopping-cart-o" :style="{color:'#07b3b1',fontSize:'30px'}"/>
                        </van-grid-item>
                    </van-grid>
               </van-popup>            
            </van-col>
        </van-row>

        <!-- menu -->
        <van-popup v-model="menuShow" position="left" :style="{ width: '80%',height:'100%',maxWidth:'400px' }">
            <van-row>
                <van-col span="8" offset="8" :style="{marginTop:'30px',marginBottom:'10px',borderRadius:'50%',background:'#d3d3d3',overflow:'hidden',padding:'5px'}">
                    <img src="../assets/logo.png" alt="" width="100%">
                </van-col>
                <van-col v-for="item in menuList" :key="item.value" span="24" :style="{textAlign:'center',padding:'5px 0'}">
                    <span @click="linkChange" :style="{fontWeight:'300'}">
                        <!-- <van-icon name="home-o" /> -->
                        <router-link :to="item.link">{{item.text}}</router-link>
                    </span>
                </van-col>
            </van-row>
        </van-popup>
    </div>
    
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ArrayPropsDefinition } from 'vue/types/options';
import interfaces from '../public/javascript/api'
import { Toast } from 'vant';
import Router from 'vue-router';

interface creatObj {
    value?: string,
    text?: string,
    link?: string,
    name?: string,
    id?: string
}


@Component
export default class Menu extends Vue {
    private menuShow:boolean;
    private loginShow:boolean;
    private userInfoShow:boolean;
    private moreShow:boolean;
    private searchShow:boolean;
    private menuList:object[];
    private password: string;
    private user:creatObj;
    private searchValue:string;
    constructor() {
        super();
        this.menuShow = false;
        this.loginShow = false;
        this.userInfoShow = false;
        this.moreShow = false;
        this.searchShow = false;
        this.menuList = []       
        this.password = ''
        this.user = Object.create(null);
        this.user.name = ''
        this.searchValue = '';

    }
    private loginShowFun(): void{      
        if(!this.$store.state.userInfo.cname){
            this.loginShow = !this.loginShow
        }else{
            this.userInfoShow = !this.userInfoShow
        }
    }
    private loginConfirm(action:any,done:any): void{
        const that = this
        if(action && action === 'cancel'){
            done() 
        }else{
            interfaces.getUserInfo({id:'00001'},function(json:any){
                    Toast.success('登录成功!');
                    localStorage.setItem('userInfo',JSON.stringify(json.data.name))   
                    that.$store.state.userInfo = json.data.name;
                    done()
                })           
        }
    }
    
    //切换路由
    private linkChange(): void{
        this.menuShow = !this.menuShow
    }
    //打开搜索
    private openSearch(): void{
        this.searchShow = true
    }
    //搜索
    private onSearch(): void{
        Toast('搜索：' + this.searchValue);
    }
    // 打开more
    private openMore(): void{
        this.moreShow = true
    }
    
    public created(): void{    
        // 初始化登陆信息
        //初始化菜单信息
        let mObj1:creatObj;
        mObj1 = Object.create(null);
        mObj1.text = "首页";
        mObj1.link = "/";
        mObj1.value = "001";
        let mObj2:creatObj;
        mObj2 = Object.create(null);
        mObj2.text = "关于";
        mObj2.link = "/about";
        mObj2.value = "002";
        let mObj3:creatObj;
        mObj3 = Object.create(null);
        mObj3.text = "我的";
        mObj3.link = "/person";
        mObj3.value = "003";
        this.menuList = [mObj1,mObj2,mObj3]

    }
}
</script>

<style lang="scss" scoped>
    #nav a{
        font-weight: 400;
    }
</style>
