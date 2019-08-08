<template>
  <div>
    <div id="nav">
      <Menu v-if="$store.state.userInfo.cname"></Menu>      
    </div>
    <HomeContent/> 
    <div id="footer">
      <FooterBar v-if="$store.state.userInfo.cname"></FooterBar> 
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomeContent from '@/components/HomeContent.vue'; // @ is an alias to /src
import Menu from '@/components/Menu.vue'; // @ is an alias to /src
import FooterBar from '@/components/FooterBar.vue'; // @ is an alias to /src

@Component({
  components: {
    HomeContent,Menu,FooterBar
  },
})
export default class Home extends Vue {}
</script>
