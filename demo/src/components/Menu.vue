<template>
    <div class="menu-box" :style="{textAlign:'right',background:'#767676',padding:'10px'}">
        <van-button type="primary" @click="show = !show">
            {{userName}}
        </van-button>
        <van-dialog 
            v-model="show" 
            title="会员登录" 
            show-cancel-button
            confirm-button-text="登录"
            :beforeClose="loginConfirm"
            :style="{textAlign:'left'}"
        >
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
    </div>
    
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ArrayPropsDefinition } from 'vue/types/options';
import interfaces from '../public/javascript/api'
import { Toast } from 'vant';

interface creatObj {
    value?: string,
    text?: string,
    link?: string,
    name?: string,
    id?: string
}


@Component
export default class Menu extends Vue {
    private userName:string;
    private show:Boolean;
    private password: string;
    private user:creatObj;
    constructor() {
        super();
        this.userName = '登录'
        this.show = false;
        this.password = ''
        this.user = Object.create(null);
        this.user.name = ''

    }

   private loginConfirm(action:any,done:any): void{
       const that = this
       if(action && action === 'cancel'){
           done() 
       }else{
           interfaces.getUserInfo({id:'00001'},function(json:any){
                Toast.success('登录成功!');
                that.userName = json.data.name.cname           
                done()
            })           
       }
   }
}
</script>

