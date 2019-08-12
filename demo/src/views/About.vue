<template>
  <div>
    <div id="nav">
      <Menu v-if="$store.state.userInfo.cname"></Menu>      
    </div>
    <div class="about">
      <span :style="{padding:'15px',fontSize:'14px',display:'block',boxSizing:'border-box',color:'#07b3b1',textAlign:'left',lineHeight:'2'}">
        爱宠笔记，在这里可以通过好玩有趣的视频分享，结识众多的时尚养宠达人，记录爱宠的快乐点滴，与达人们交流养宠经验，学习养宠知识。 
      </span>
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
export default class About extends Vue {
   
   
}
</script>

