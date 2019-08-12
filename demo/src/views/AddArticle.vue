<template>
  <div>
    <div id="nav">
      <Menu v-if="$store.state.userInfo.cname"></Menu>      
    </div>
    <AddContent/>
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
import AddContent from '@/components/AddContent.vue'; // @ is an alias to /src
@Component({
  components: {
    Menu,FooterBar,AddContent
  }
})
export default class AddArticle extends Vue {
   
   
}
</script>
