<template>
  <div :style="{padding:'15px 5px'}">
    <van-nav-bar title="文章详情" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <van-skeleton title :row="10" :loading="loading">
        <van-row>
            <van-col span="24">
                <h3>{{article.title}}</h3>
            </van-col>
            <van-col span="12" :style="{color:'#999',fontSize:'12px'}">
                作者：{{article.author}}
            </van-col>
            <van-col span="12" :style="{color:'#999',fontSize:'12px'}">
                时间：{{article.datetime}}
            </van-col>
            <van-col span="24" :style="{padding:'25px'}">
                <img :src="article.image" alt="" width="100%">
            </van-col>
            <van-col span="24" :style="{color:'#999',fontSize:'13px',lineHeight:'2',textAlign:'left'}">
                {{article.desc}}
            </van-col>
        </van-row>
    </van-skeleton>
    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import interfaces from '../public/javascript/api'


@Component
export default class HomeContent extends Vue {
    //data    
    private article:any;
    constructor() {
        super();
        this.article = {}
    }
    loading:boolean = true;
   
    // method
    private onClickLeft():void{
        this.$router.push({name: 'home'})
    }
    //生命周期钩子
    public created():void {
        // 请求文章详情
        const _this = this
        interfaces.getDetail({id:'0001'},function(json:any){
           _this.article = json.data.data
           _this.loading = false
        })
    }
    private mounted(): void{
    //   console.log(this.$store,'mounted');
    }   
    // private updated(): void {
    //   console.log(this.$store,'updated');
    // }
    // private destroyed(): void {
    //   console.log(this.$store,'destroyed');
    // }

}
</script>

<style scoped lang="scss">

</style>
