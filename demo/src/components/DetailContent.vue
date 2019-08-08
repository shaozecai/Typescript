<template>
  <div :style="{padding:'0 5px'}">
    <van-sticky>
        <van-nav-bar title="文章详情" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </van-sticky>
    <van-skeleton title :row="10" :loading="loading">
        <van-row :style="{padding:'0 0 50px 0'}">
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
            <van-col ref="commentsBox" id="commentsBox" span="24" :style="{marginTop:'30px',color:'#999',fontSize:'13px',lineHeight:'2',textAlign:'left'}">
                <span>评论区</span>
                <van-row v-for="(item,index) in comments" :key="index" :style="{padding:'15px 0 15px 0',borderTop:'1px solid #e4e4e4'}">
                    <van-col span="4">
                        <span :style="{width:'30px',height:'30px',display:'block',borderRadius:'50%',overflow:'hidden',margin:'0px auto 15px'}">
                            <img src="../assets/person_head_icon.png" alt="" width="100%">
                        </span>
                        <!-- {{item.cname}} -->
                    </van-col>
                    <van-col span="20">
                        {{item.content}}
                    </van-col>
                </van-row>

            </van-col>
        </van-row>
    </van-skeleton>
    <van-tabbar v-model="active" active-color="#fff" inactive-color="#fff" :style="{background:'#07b3b1'}">
        <van-row :style="{width:'100%',padding:'0 10px'}">
            <van-col span="18">
                <van-tabbar-item name="comment" class="comment-box" :style="{width:'100%',padding:'8px 10px',boxSizing:'border-box'}">
                    <input type="text" @focus="commentFocus" :style="{boxSizing:'border-box', width:'100%',color:'#fff',background:'rgba(221,221,221,0.65)',borderRadius:'24px',height:'24px',border:'none',padding:'0 10px'}">
                    <van-icon v-show="!commentOnFocus" name="edit" :style="{position:'absolute',left:'5px',fontSize:'16px',color:'#fff',top:'3px'}"/>
                </van-tabbar-item>
            </van-col>
            <van-col span="3">
                <van-tabbar-item  @click="toggleChat" name="chat" class="chat-box" :icon="chatIcon" :style="{paddingTop:'11px'}"></van-tabbar-item>
            </van-col>
            <van-col span="3">
                 <van-tabbar-item @click="toggleLike" name="like" class="like-box" :icon="likeIcon" :style="{paddingTop:'11px'}"></van-tabbar-item>
            </van-col>
        </van-row>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import interfaces from '../public/javascript/api'


@Component
export default class HomeContent extends Vue {
    //data    
    private article:any;
    private active:string;
    private likeIcon:string;
    private chatIcon:string;
    private commentOnFocus:boolean;
    private comments:any;
    constructor() {
        super();
        this.article = {};
        this.active = 'home';
        this.likeIcon = 'like-o';
        this.chatIcon = 'chat-o';
        this.commentOnFocus = false;
        this.comments = [];
    }
    loading:boolean = true;
   
    // method
    private commentFocus(): void{
        this.commentOnFocus = true;
    }
    private toggleLike(): void{
        if(this.likeIcon === 'like-o'){
            this.likeIcon = 'like';
        }else{
            this.likeIcon = 'like-o';
        }        
    }
    private toggleChat(): void{
        window.scrollTo(0,(document.getElementById('commentsBox')!.offsetTop - 50));//不需要加单位  
    }
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
        //请求评论信息
        interfaces.comments({id:'0001'},function(json:any){
           _this.comments = json.data.data
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

<style lang="scss">
    .comment-box .van-tabbar-item__text{
        width: 100%;
        position: relative;
    }

    .chat-box{
        .van-icon.van-icon-chat{
            font-size: 26px;
            color:#fff51e
        }
        .van-icon.van-icon-chat-o{
            font-size: 26px;
        }
    }
    .like-box{
        .van-icon.van-icon-like{
            font-size: 26px;
            color:#fff51e
        }
        .van-icon.van-icon-like-o{
            font-size: 26px;
        }
    }
</style>
