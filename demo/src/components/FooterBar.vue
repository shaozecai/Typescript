<template>
  <div class="footer">
    <van-tabbar route v-model="active" active-color="#ffffff" inactive-color="#333" :style="{background:'#cccccc'}">
        <van-tabbar-item name="home" icon="home-o" replace to="/"></van-tabbar-item>
        <van-tabbar-item name="add" icon="plus" replace to="/detail" class="article-add"></van-tabbar-item>
        <van-tabbar-item name="person" icon="manager" :dot="true" replace to="/login"></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class FooterBar extends Vue {
    active:string = "home"
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
