<template>
 <div>
    
    <van-button type="primary" @click="getData">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

 </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import interfaces from '../public/javascript/api'

@Component
export default class HomeContent extends Vue {
    //data
    message: string = 'Hellow';
    // 计算属性
	  private get reversedMessage(): string {      
      return this.message.split('').reverse().join('');
    }

    // method
    public changeMessage(): void {
      this.message = 'Good bye'
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
