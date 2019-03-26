<template>
  <div id="addarticle">
    <template>
        <Button @click="issue()" to="/home/articlelst/addarticle" icon="md-document" type="dashed">发布</Button>
    </template>
    <template>
      <br>
      <br>
      <b>文章标题：</b>
      <Input v-model="articleTitle" placeholder="Enter Article Title" style="width: 300px" />
      <b>文章类型：</b>
        <Select v-model="articleTypeModel" style="width:200px" placement="top">
          <Option v-for="item in articleTypeLst" :value="item.articleTypeId" :key="item.articleTypeId">{{ item.articleTypeName }}</Option>
        </Select>
      <b>可见状态：</b>
      <i-switch size="large" v-model="status" @on-change = "statusChange">
        <span slot="open">ON</span>
        <span slot="close">OFF</span>
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
    console.log("渲染前")
    this.articleTypeAjax()
  },
  data () {
    return {
      //文章类型
      articleTypeLst: [],
      //文章类型
      articleTypeModel: '',
      //文章标题
      articleTitle: '',
      //文章内容
      articleContent: '',
      //可见状态
      status: false,
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
      this.$ajax.get
      (
         'http://localhost:9000/articleType/findAll',
         {
           params: {
             offset: 0,
             limit: 10
           }
         },
         {headers: {'Content-type': 'application/json;charset=UTF-8'}}
      )
      .then(function(res){
          this.articleTypeLst = res.data.data
      }.bind(this))
      .catch(function(res){
          console.log(res)
      })
    },
    
    //发布文章
    issue () {
      console.log(this.articleContent)
      console.log(this.status)
      console.log(this.tmpStatus)
      if(this.articleTitle==""){
        this.$Message.info('主题不能为空');
        return;
      }
      this.ajax()
    },

    //发布请求
    ajax () {
      this.$ajax.post
      (
         'http://localhost:9000/article/addArticle',
         JSON.stringify({
            articleName: this.articleTitle,
            articleTypeId: this.articleTypeModel,
            articleStatus: this.tmpStatus,
            articleContent: this.articleContent
         }),
         {headers: {'Content-type': 'application/json;charset=UTF-8'}}
      )
      .then(function(res){
          console.log(res)
          if(res.data.data == true){
            this.$Message.info("发布成功")
          }
          if(res.data.data == false){
            this.$Message.info("发布失败")
          }
      }.bind(this))
      .catch(function(res){
          console.log(res)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
