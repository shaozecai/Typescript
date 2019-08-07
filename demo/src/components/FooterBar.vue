<template>
  <div class="footer">
    <van-tabbar route v-model="active" active-color="#F44336" inactive-color="#fff" :style="{background:'#07b3b1',fontSize:'20px'}">
        <van-tabbar-item name="home" icon="friends" replace to="/"></van-tabbar-item>
        <van-tabbar-item name="add" icon="plus" replace to="/add" class="article-add"></van-tabbar-item>
        <van-tabbar-item name="person" icon="manager" :dot="presonDot" replace to="/person" @click="clearHot"></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class FooterBar extends Vue {
    active:string = "home";
    presonDot:boolean = false;

    public created(){
        if(this.$store.state.userInfo.msg){
            this.presonDot = true
        }else{
            this.presonDot = false
        }
    }
    public clearHot(): void{
        this.presonDot = false
    }
}
</script>

<style lang="scss">
    .article-add{
        .van-tabbar-item__icon{
            position: absolute;
            top: -15px;
            background: #F44336;
            padding: 20px;
            border-radius: 50%;
            color: #fff;
            z-index: 99;
        }
    }
</style>
