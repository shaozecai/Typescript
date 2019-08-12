<template>
    <div class="add-page" :style="{textAlign:'left'}">
        <van-cell-group>
            <van-field v-model="title" :error-message="titleError" placeholder="文章标题"/>
            <van-field v-model="message" :error-message="msgError" type="textarea"  placeholder="文章内容" rows="3"  autosize/>
            <van-uploader v-model="fileList" :before-read="beforeRead" multiple :style="{padding:'10px 15px 0'}"/>
        </van-cell-group>
        <van-row :style="{padding:'0 15px',textAlign:'center'}">
            <van-button @click="submitArticle" :style="{background:'#07b3b1',color:'#fff',height:'32px',lineHeight:'32px',borderRadius:'4px',padding:'0 20px',marginTop:'20px'}">发布</van-button>
        </van-row>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ArrayPropsDefinition } from 'vue/types/options';
import interfaces from '../public/javascript/api'
import { Toast,Notify } from 'vant';
import Router from 'vue-router';

interface creatObj {
    value?: string,
    text?: string,
    link?: string,
    name?: string,
    id?: string
}

@Component
export default class AddContent extends Vue{
    private title:string;
    private message:string;
    private fileList:object[];
    private titleError:string;
    private msgError:string;

    constructor(){
        super();
        this.title = '';
        this.message = '';
        this.fileList =  [];
        this.titleError = '';
        this.msgError = '';
    }

    private afterRead(file:any): void {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    }

    private submitArticle():void {
        const that = this;
        let validatorFlag:boolean = true;
        if(this.title === ''){
            this.titleError = '请录入文章标题';
            validatorFlag = false
        }else{
            this.titleError = '';
        }
        if(this.message === ''){
            this.msgError = '请录入文章内容';
            validatorFlag = false
        }else{
            this.msgError = '';
        }
        if(validatorFlag){
            if(this.fileList.length === 0){
                Toast('请上传图片!');
            }else{
                Notify({
                    message: '文章发布成功!',
                    duration: 2000,
                    background: '#1989fa',
                    onClose:function(){
                        that.$router.push({name: 'home'})
                    }
                });
            }
        }        
    }
    private beforeRead(file:any):boolean{
        if (file.type !== 'image/jpeg') {
            Toast('请上传 jpg 格式图片');
            return false;
        }        
        return true;
    }
}
</script>

<style lang="scss">
    .add-page .van-field__control{
        color: #000;
        border: 1px solid #ececec;
        padding:5px 10px;
        box-sizing: border-box;
        font-size: 13px;
    }
</style>
