<template>
  <div class="login-page" :style="{background:'#07b3b1',minHeight:'100vh'}">
    <van-cell-group class="login-input" label-align="left" :style="{position:'absolute',top:'50%',left:'0',width:'100%',transform:'translate(0,-50%)',border:'none',background:'#07b3b1'}">
      <div :style="{margin:'0 auto 20px',borderRadius:'50%',background:'#fff',overflow:'hidden',padding:'5px',width:'50px',height:'50px'}">
          <img src="../assets/logo.png" alt="" width="100%">
      </div>
      <van-field v-model="username" label="" label-width="0" placeholder="用户名" :error-message="usernameErrMsg" :style="{background:'#07b3b1',color:'#fff',border:'none'}"/>
      <van-field v-model="phone" readonly clickable @touchstart.native.stop="keyboardShow = true" label="" label-width="0" placeholder="手机" :error-message="phoneErrMsg" :style="{background:'#07b3b1',color:'#fff',border:'none'}"/>
      <van-field v-model="password" type="password" label-width="0" label="" placeholder="密码" :error-message="passwordErrMsg" :style="{background:'#07b3b1',color:'#fff',border:'none'}"/>
      <span :style="{padding:'0 15px',boxSizing:'border-box',display:'block'}">
        <van-button plain round @click="loginFun" type="primary" :loading="loading" :style="{width:'100%',height:'36px',lineHeight:'36px',marginTop:'10px',color:'#333',background:'#fff51e'}">登陆</van-button>
      </span>
      </van-cell-group>

    <div class="copright" :style="{position:'absolute',bottom:'0',left:'0',width:'100%',fontSize:'12px',color:'#717171',padding:'5px 0'}">
      由shaozecai.com提供技术支持
    </div>
    <van-number-keyboard
      v-model="phone"
      :show="keyboardShow"
      theme="custom"
      extra-key="."
      :maxlength="11"
      close-button-text="完成"
      @blur="keyboardShow = false"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Loading } from 'vant';
import interfaces from '../public/javascript/api'; 
import { Toast } from 'vant';

@Component
export default class FooterBar extends Vue {
    username:string = ""
    usernameErrMsg:string = ""
    phone:string = ""
    phoneErrMsg:string = ""
    password:string = ""
    passwordErrMsg:string = ""
    keyboardShow:boolean = false;
    showKeyboard:boolean = false;
    loading:boolean = false;
    

    private loginFun(): void{
      const that = this;
      this.loading = true
      let validataFlag:boolean = true;
      if(this.username == ''){
          this.usernameErrMsg = '请输入用户名'
          validataFlag = false
      }else{
        if(this.username.length > 5 || this.username.length < 2){
          this.usernameErrMsg = '用户名长度2-5个字符!'
          validataFlag = false
        }else{
          this.usernameErrMsg = ''
        }
      }
      if(this.phone == ''){
          this.phoneErrMsg = '请输入手机号'
          validataFlag = false
      }else{
          if(!this.checkPhone(this.phone)){
            this.phoneErrMsg = '手机号格式不正确！'
            validataFlag = false
          }else{
            this.phoneErrMsg = ''
          }
      }
      if(this.password == ''){
          this.passwordErrMsg = '请输入密码'
          validataFlag = false
      }else{
        if(this.password.length < 6 || this.password.length > 10){
          this.passwordErrMsg = '密码长度6-10个字符!'
          validataFlag = false
        }else{
          this.passwordErrMsg = ''
        }
      }
      // 验证通过
      if(validataFlag){
        interfaces.login({id:'0001'},function(json:any){
          debugger
            Toast.success('登录成功!');
            localStorage.setItem('userInfo',JSON.stringify(json.data.data))   
            that.$store.state.userInfo = json.data.data;
            that.loading = false    
            console.log('登录成功跳转首页页。。。');
            that.$router.push({name: 'home'})    
        })
      }else{
        this.loading = false
      }
    }
    public checkPhone(phone:string): boolean{ 
        if(!(/^1[34578]\d{9}$/.test(phone))){ 
            return false; 
        }else{
          return true
        }
    }
}
</script>

<style lang="scss">
.login-page {
  input.van-field__control{
    color:#07b3b1;
    background: #fff;
    border-radius: 4px;
    padding: 5px 8px;
    box-sizing: border-box;
    font-size: 13px;
  }
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
