<template>
  <div>
    <div id="nav">
      <Menu v-if="$store.state.userInfo.cname"></Menu>      
    </div>
    <div class="person-page" :style="{paddingBottom:'50px',boxSizing:'border-box'}">
      <van-cell-group>
          <span :style="{width:'60px',height:'60px',display:'block',borderRadius:'50%',overflow:'hidden',margin:'30px auto 15px'}">
            <img src="../assets/person_head_icon.png" alt="" width="100%">
          </span>
          <van-field  :value="$store.state.userInfo.cname"  label="用户名" left-icon="contact" disabled />
          <van-field  :value="$store.state.userInfo.ename"  label="英文名" left-icon="comment-o" disabled />
          <van-field  :value="$store.state.userInfo.id"  label="用户编号" left-icon="coupon-o" disabled />
          <van-field  :value="$store.state.userInfo.sex == '1' ? '男' : '女'"  label="性别" left-icon="smile-o" disabled />
          <van-field  :value="$store.state.userInfo.age"  label="年龄" left-icon="user-o" disabled />
          <van-field  :value="$store.state.userInfo.county"  label="地址" left-icon="location-o" disabled />
          <van-button @click="escLogin" :style="{height:'32px',lineHeight:'30px',fontSize:'14px',marginTop:'10px',background:'#07b3b1',color:'#fff',}">退出登录</van-button>
      </van-cell-group>
      <van-dialog v-model="escShow" show-cancel-button :before-close="loginConfirm">
        <span :style="{padding:'20px 10px 10px',display:'block'}">确认退出登录？</span>
      </van-dialog>
    </div>
    <div id="footer">
      <FooterBar v-if="$store.state.userInfo.cname"></FooterBar> 
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Loading } from 'vant';
import interfaces from '../public/javascript/api'; 
import { Toast } from 'vant';
import Menu from '@/components/Menu.vue'; // @ is an alias to /src
import FooterBar from '@/components/FooterBar.vue'; // @ is an alias to /src

@Component({
  components: {
    Menu,FooterBar
  }
})
export default class Person extends Vue {
    
    username:string = ""
    usernameErrMsg:string = ""
    phone:string = ""
    phoneErrMsg:string = ""
    password:string = ""
    passwordErrMsg:string = ""
    escShow:boolean = false
    
    loading:boolean = false;

    //退出登录
    private escLogin(): void{
        this.escShow = !this.escShow
    }
    private loginConfirm(action:any,done:any): void{
        const that = this
        if(action && action === 'cancel'){
            done() 
        }else{
            Toast('会员登出!');
            localStorage.removeItem('userInfo')
            this.$store.state.userInfo = {};
            done() 
            console.log('退出登陆，跳转登录页。。。');
            this.$router.push({name: 'login'})           
        }
    }
 
    public created(){
        this.$store.state.userInfo.msg = false
    }
}
</script>

<style lang="scss">
.van-field__control{
  color:#fff;
  
}
.login-page ::-webkit-input-placeholder {
  color: #888;
}
.login-page :-moz-placeholder {/* Firefox 18- */
  color: #888;
}
.login-page ::-moz-placeholder{/* Firefox 19+ */
 color: #888;
}
.login-page :-ms-input-placeholder {
  color: #888;
}
.van-field__label--left{
  text-align: left;
  border: none;
}
.van-hairline--top-bottom::after,.van-cell:not(:last-child)::after{
  border: none;
}
</style>
