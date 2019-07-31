<template>
 <div>
   homepage
   {{reversedMessage}}
 </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HomeContent extends Vue {
    //data
    message:string = 'Hellow'

    // 计算属性
	  private get reversedMessage(): string {      
      return this.message.split('').reverse().join('')
    }

    // method
    public changeMessage(): void {
      this.message = 'Good bye'
    }
    public getName(name:string): string {
      let storeName = name
      return storeName
    }

    //生命周期钩子
    public created():void {
      console.log(this.$store,'created')
    }
    private mounted(): void{
      console.log(this.$store,'mounted')
    }   
    private updated(): void {
      console.log(this.$store,'updated')
    }
    private destroyed(): void {
      console.log(this.$store,'destroyed')
    }

}
</script>

<style scoped lang="scss">

</style>
