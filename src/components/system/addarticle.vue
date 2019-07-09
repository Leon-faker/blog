<template>
  <div id="addarticle">
    <template>
        <Button @click="issue()"  icon="md-document" type="dashed">发布</Button>
    </template>
    <template>
      <br>
      <br>
      <b>文章标题：</b>
      <Input v-model="articleTitle" placeholder="Enter Article Title" style="width: 300px" />
      <b>文章类型：</b>
        <Select v-model="articleTypeModel.articleTypeId" :transfer="true" placeholder = "choose article type" style="width:200px" placement="top-end" >
          <Option v-for="item in articleTypeLst" :value="item.articleTypeId" v-bind:key="item.articleTypeId">{{ item.articleTypeName }}</Option>
        </Select>
      <b>可见状态：</b>
      <i-switch size="large" v-model="status" @on-change = "statusChange" style="background-color:rgb(129,216,208);border-color:rgb(129,216,208)">
        <span slot="open">开启</span>
        <span slot="close">关闭</span>
      </i-switch>
    </template>
    <br>
    <br>
    <template>
      <mavon-editor v-model="articleContent"></mavon-editor>
    </template>
  </div>
</template>
<script>
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'addArticle',
  components: {
    mavonEditor
  },
  mounted () {
    //存储数据到vuex
    this.articleTypeAjax()
  },
  data () {
    return {
      //文章id
      articleId: 0,
      //文章类型
      articleTypeLst: [],
      //文章类型 默认值
      articleTypeModel: {
          articleTypeId: 0,
        },
      //文章标题
      articleTitle: '',
      //文章内容
      articleContent: '',
      //可见状态
      status: true,
      tmpStatus: 0
    }
  },
  methods: {
    //可见状态改变事件
    statusChange () {
      if(this.status == true) {
        this.tmpStatus = 1
      }
      if(this.status == false) {
        this.tmpStatus = 0
      }
    },
    //文章类型请求
    articleTypeAjax () {
      try {
        let res = this.$api.unsplash.findArticleType({
            offset: 0,
            limit: 10
        })
        .then(res => {
          this.articleTypeLst = res.data
        })
      } catch (res) {
          this.$Message.info(res.strDescribe);
      }
    },
    
    //发布文章
    issue () {
      if(this.articleTitle=="" || this.articleTitle == undefined){
        this.$Message.info('主题不能为空');
        return;
      }
      this.ajax()
    },

    //文章发布请求
    ajax () {
      try{
        let params = {
          articleName: this.articleTitle,
          articleTypeId: this.articleTypeModel.articleTypeId,
          articleStatus: this.tmpStatus,
          articleContent: this.articleContent
        }
        let res = this.$api.unsplash.addArticle(params)
        .then(res => {
          if(res.resultCode == 200){
            this.$router.push({path: '/home/articlelst'})
            this.$Message.info(res.strDescribe)
          }
          if(res.resultCode == -100){
            this.$Message.info(res.strDescribe)
          }
        })
      }catch (res){
        this.$Message.info(res.strDescribe);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
