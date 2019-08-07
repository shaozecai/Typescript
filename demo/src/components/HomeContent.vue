<template>
  <div :style="{padding:'15px 5px'}">
    <van-tabs v-model="active" color="#07b3b1" sticky swipeable>
      <!-- 推荐 -->
      <van-tab title="推荐">
        <van-pull-refresh v-model="isLoading" @refresh="hotOnRefresh">
          <van-list v-model="hotActicle.loading" :finished="hotActicle.finished" finished-text="没有更多了" @load="hotOnLoad">
            <van-cell v-for="item in hotActicle.list" :key="item.id">
              <van-skeleton title avatar :row="3" :loading="item.loading" animate>
                  <van-row>
                    <van-col span="24">
                      <!-- <img :src="item.image" alt="" width="100%"> -->
                      <img @click="gotoDetail(item.id)" src="../assets/img.jpg" alt="" width="100%">
                    </van-col>
                    <van-col span="4">
                      标题：
                    </van-col>
                    <van-col span="20">
                      <h3 :style="{fontSize:'14px',margin:'0'}">{{item.title}}</h3>
                    </van-col>
                    <van-col span="6">
                      推荐指数:
                    </van-col>
                    <van-col span="18">
                      {{item.star}}
                    </van-col>
                    <van-col span="4">
                      作者：
                    </van-col>
                    <van-col span="8" :style="{color:'#999',fontSize:'12px'}">
                      {{item.author}}
                    </van-col>
                    <van-col span="4">
                      时间：
                    </van-col>
                    <van-col span="8" :style="{color:'#999',fontSize:'12px'}">
                      {{item.datetime}}
                    </van-col>
                    <van-col span="4">
                      描述:
                    </van-col>
                    <van-col span="20" :style="{color:'#999',fontSize:'12px'}">
                      {{item.desc}}
                    </van-col>
                  </van-row>
                  
                </van-skeleton>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <!-- 最新 -->
      <van-tab title="最新">
        <!-- 实现下拉刷新 下拉加载 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="newActicle.loading" :finished="newActicle.finished" finished-text="没有更多了" @load="newOnLoad">
            <van-cell v-for="item in newActicle.list" :key="item.id">
              <van-skeleton title avatar :row="3" :loading="item.loading" animate>
                <van-row>
                  <van-col span="24">
                    <!-- <img @click="gotoDetail(item.id)" :src="item.image" alt="" width="100%"> -->
                    <img @click="gotoDetail(item.id)" src="../assets/img.jpg" alt="" width="100%">
                  </van-col>
                  <van-col span="4">
                    标题：
                  </van-col>
                  <van-col span="20">
                    <h3 @click="gotoDetail(item.id)" :style="{fontSize:'14px',margin:'0'}">{{item.title}}</h3>
                  </van-col>
                  <van-col span="6">
                    推荐指数:
                  </van-col>
                  <van-col span="18">
                    {{item.star}}
                  </van-col>
                  <van-col span="4">
                    作者：
                  </van-col>
                  <van-col span="8" :style="{color:'#999',fontSize:'12px'}">
                    {{item.author}}
                  </van-col>
                  <van-col span="4">
                    时间：
                  </van-col>
                  <van-col span="8" :style="{color:'#999',fontSize:'12px'}">
                    {{item.datetime}}
                  </van-col>
                  <van-col span="4">
                    描述:
                  </van-col>
                  <van-col span="20" :style="{color:'#999',fontSize:'12px'}">
                    {{item.desc}}
                  </van-col>
                </van-row>
                
              </van-skeleton>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <!-- 热门 -->
      <van-tab title="热门">
        <van-pull-refresh v-model="isLoading" @refresh="hotOnRefresh">
          <van-list v-model="hotActicle.loading" :finished="hotActicle.finished" finished-text="没有更多了" @load="hotOnLoad">
            <van-cell v-for="item in hotActicle.list" :key="item.id">
              <van-skeleton title avatar :row="3" :loading="item.loading" animate>
                  <van-row>
                    <van-col span="24">
                      <img @click="gotoDetail(item.id)" src="../assets/img.jpg" alt="" width="100%">
                    </van-col>
                    <van-col span="4">
                      标题：
                    </van-col>
                    <van-col span="20">
                      <h3 :style="{fontSize:'14px',margin:'0'}">{{item.title}}</h3>
                    </van-col>
                    <van-col span="6">
                      推荐指数:
                    </van-col>
                    <van-col span="18">
                      {{item.star}}
                    </van-col>
                    <van-col span="4">
                      作者：
                    </van-col>
                    <van-col span="8" :style="{color:'#999',fontSize:'12px'}">
                      {{item.author}}
                    </van-col>
                    <van-col span="4">
                      时间：
                    </van-col>
                    <van-col span="8" :style="{color:'#999',fontSize:'12px'}">
                      {{item.datetime}}
                    </van-col>
                    <van-col span="4">
                      描述:
                    </van-col>
                    <van-col span="20" :style="{color:'#999',fontSize:'12px'}">
                      {{item.desc}}
                    </van-col>
                  </van-row>
                  
                </van-skeleton>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>

    </van-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import interfaces from '../public/javascript/api'

interface creatObj {
  loading?: boolean,
  finished?: boolean,
  list?:any,  
}

@Component
export default class HomeContent extends Vue {
    //data    
    private newActicle:creatObj;
    private hotActicle:creatObj;
    constructor() {
        super();
        this.newActicle = Object.create(null);
        this.newActicle.loading = false
        this.newActicle.finished = false;
        this.newActicle.list = []

        this.hotActicle = Object.create(null);
        this.hotActicle.loading = false
        this.hotActicle.finished = false;
        this.hotActicle.list = []
    }

    
    
    active:number = 0;
    isLoading:boolean = false;
    count:number = 0;
    // 计算属性
	  // private get reversedMessage(): string {      
      
    // }

    // method
    public newOnLoad():void {     
      let activesList = this.newActicle
      interfaces.getList({id:'0001'},function(json:any){
        if(activesList.list.length === 0){
          activesList.list = [...json.data.data.projects]
        }else{
          activesList.list = activesList.list.concat(json.data.data.projects);
        }
        activesList.loading = false;        
        if(json.data.data.projects.length === 0){
          activesList.finished = true;
        }
      })
    }
    public hotOnLoad():void {
      let activesList = this.hotActicle
      interfaces.getList({id:'0001'},function(json:any){
        if(activesList.list.length === 0){
          activesList.list = [...json.data.data.projects]
        }else{
          activesList.list = activesList.list.concat(json.data.data.projects);
        }
        activesList.loading = false;        
        if(json.data.data.projects.length === 0){
          activesList.finished = true;
        }
      })
    }
    public onRefresh() {
      const _this = this;
      let activesList = this.newActicle
      interfaces.getList({id:'0001'},function(json:any){
        activesList.list = [...json.data.data.projects]
        activesList.loading = false;  
        _this.$toast('刷新成功');
        _this.isLoading = false; 
      })
    }
    public hotOnRefresh(): void{
      const _this = this;
      let activesList = this.hotActicle
      interfaces.getList({id:'0001'},function(json:any){
        activesList.list = [...json.data.data.projects]
        activesList.loading = false;  
        _this.$toast('刷新成功');
        _this.isLoading = false; 
      })
    }
    public changeMessage(): void {
     
    }
    public getName(name:string): string {
      let storeName = name
      return storeName
    }
    public getData(): void{
      interfaces.getUserInfo({id:'00001'},function(json:object){
        console.log(json,'json')
      })
    }

    //跳转详情页
    public gotoDetail(id:string): void{
      this.$router.push({name: 'detail', params: {id: id}})
    }

    //生命周期钩子
    public created():void {
      console.log(this.$store,'created');
    }
    private mounted(): void{
      console.log(this.$store,'mounted');
    }   
    private updated(): void {
      console.log(this.$store,'updated');
    }
    private destroyed(): void {
      console.log(this.$store,'destroyed');
    }

}
</script>

<style scoped lang="scss">

</style>
