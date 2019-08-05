<template>
  <div :style="{padding:'15px 5px'}">
    <van-tabs v-model="active">
      <van-tab title="最新发布">
        <van-list v-model="newActicle.loading" :finished="newActicle.finished" finished-text="没有更多了" @load="newOnLoad">
          <van-cell v-for="item in newActicle.list" :key="item">
            <van-skeleton title avatar :row="3" :loading="true" animate>
              <div>实际内容</div>
            </van-skeleton>
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab title="热度最高">
        <van-list v-model="hotActicle.loading" :finished="hotActicle.finished" finished-text="没有更多了" @load="hotOnLoad">
          <van-cell v-for="item in hotActicle.list" :key="item">
            <van-skeleton title avatar :row="3" :loading="true" animate>
              <div>实际内容</div>
            </van-skeleton>
          </van-cell>
        </van-list>
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
    // 计算属性
	  // private get reversedMessage(): string {      
      
    // }

    // method
    public newOnLoad():void {     
      let activesList = this.newActicle
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          activesList.list.push(activesList.list.length + 1);
        }
        // 加载状态结束
        activesList.loading = false;

        // 数据全部加载完成
        if (activesList.list.length >= 40) {
          activesList.finished = true;
        }
      }, 500);
    }
    public hotOnLoad():void {     
      let activesList = this.hotActicle
      // 异步更新数据
      setTimeout(() => {
        // 获取一次数据
        for (let i = 0; i < 10; i++) {
          activesList.list.push(activesList.list.length + 1);
        }
        // 加载状态结束
        activesList.loading = false;

        // 数据全部加载完成
        if (activesList.list.length >= 40) {
          activesList.finished = true;
        }
      }, 500);
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
