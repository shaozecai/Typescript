<template>
  <div id="app">
    <div id="nav">
      <Menu></Menu>      
    </div>
    <router-view/>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Menu from '@/components/Menu.vue'; // @ is an alias to /src

@Component({
  components: {
    Menu,
  },
})

export default class APP extends Vue {
  


  public created():void {
    // 判断登录
    if(localStorage.getItem('userInfo') == null){
      console.log(this.$store,'未登录跳转登录页。。。');
      // this.$router.push({name: 'login', params: {id: '001'}})
    }else{
      const userInfo = localStorage.getItem('userInfo');
      if(typeof userInfo === 'string'){
        this.$store.state.userInfo = JSON.parse(userInfo);
      }
    }
    
  }

}
</script>

<style lang="scss">
body{
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 0;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
