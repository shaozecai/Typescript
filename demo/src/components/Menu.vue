<template>
    <div class="menu-box" :style="{textAlign:'center',background:'#767676',padding:'10px'}">
        <van-row>
            <van-col span="6" :style="{textAlign:'left'}">
                <van-button type="default" size="small" @click="menuShow = !menuShow">
                    菜单
                </van-button>
            </van-col>
            <van-col span="6" offset="12" :style="{textAlign:'right',fontSize:'14px',lineHeight:'30px',color:'#fff',display:'flex',justifyContent:'flex-end'}">
                <span @click="loginShowFun" v-if="$store.state.userInfo.cname" :style="{width:'30px',height:'30px',borderRadius:'50%',background:'#fff',overflow:'hidden',border:'2px solid #fff',boxSize:'border-box'}">
                    <img src="../assets/person_head_icon.png" alt="" width="100%">
                </span>
                <span @click="loginShowFun" v-if="!$store.state.userInfo.cname">
                    登陆
                </span>
            </van-col>
        </van-row>
        
        <!-- login -->
        <van-dialog v-model="loginShow" title="会员登录"  show-cancel-button confirm-button-text="登录" :beforeClose="loginConfirm" :style="{textAlign:'left'}">
            <van-cell-group>
                <van-field
                    v-model="user.name"
                    required
                    clearable
                    label="用户名"
                    label-width="60px"
                    placeholder="请输入用户名"
                />
                <van-field
                    v-model="password"
                    type="password"
                    label="密码"
                    label-width="60px"
                    placeholder="请输入密码"
                    required
                />
                </van-cell-group>
        </van-dialog>
        <van-dialog v-model="userInfoShow" title="会员信息" show-cancel-button confirm-button-text="退出" :beforeClose="escLogin" :style="{textAlign:'left'}">
            <van-cell-group>
                <van-field  :value="$store.state.userInfo.cname"  label="用户名" left-icon="contact" disabled />
                <van-field  :value="$store.state.userInfo.first"  label="first" left-icon="contact" disabled />
                <van-field  :value="$store.state.userInfo.last"  label="last" left-icon="contact" disabled />
                <van-field  :value="$store.state.userInfo.name"  label="name" left-icon="contact" disabled />
            </van-cell-group>
        </van-dialog>
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
    private menuList:object[];
    private password: string;
    private user:creatObj;
    constructor() {
        super();
        this.menuShow = false;
        this.loginShow = false;
        this.userInfoShow = false; 
        this.menuList = []       
        this.password = ''
        this.user = Object.create(null);
        this.user.name = ''

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
    //退出登录
    private escLogin(action:any,done:any): void{
            if(action === 'confirm'){
                Toast('会员登出!');
                localStorage.removeItem('userInfo')
                this.$store.state.userInfo = {};
            }
            done();
    }
    //切换路由
    private linkChange(): void{
        this.menuShow = !this.menuShow
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
        mObj3.text = "登陆";
        mObj3.link = "/login";
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
