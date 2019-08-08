<template>
  <div class="footer">
    <van-tabbar route v-model="active" active-color="#fff" inactive-color="#fff" :style="{background:'#07b3b1'}">
        <van-tabbar-item name="home" icon="friends" replace to="/" class="home-page"></van-tabbar-item>
        <van-tabbar-item name="add" icon="plus" replace to="/add" class="article-add"></van-tabbar-item>
        <van-tabbar-item name="person" icon="manager" :dot="personDot" class="person-page" replace to="/person" @click="clearHot"></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class FooterBar extends Vue {
    active:string = "home";
    personDot:boolean = false;

    public created(){
        if(this.$store.state.userInfo.msg){
            this.personDot = true
        }else{
            this.personDot = false
        }
    }
    public clearHot(): void{
        this.personDot = false
    }
}
</script>

<style lang="scss">
    .home-page {
        .van-tabbar-item__icon{
            font-size: 28px;
            margin-bottom: 0;
        }
    }
    .person-page {
        .van-tabbar-item__icon{
            font-size: 24px
        }
    }
    .article-add{
        .van-tabbar-item__icon{
            position: absolute;
            top: -15px;
            background: #fff51e;
            padding: 20px;
            border-radius: 50%;
            color: #07b3b1;
            z-index: 99;
        }
    }
</style>
