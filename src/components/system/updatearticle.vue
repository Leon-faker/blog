<template>
  <div id="updatearticle">
    <template>
        <Button @click="update()" icon="md-document" type="dashed">保存</Button>
    </template>
    <template>
      <br>
      <br>
      <b>文章标题：</b>
      <Input v-model="articleTitle" placeholder="Enter Article Title" style="width: 300px" />
      <b>文章类型：</b>
        <Select v-model="articleTypeModel.articleTypeId" placeholder = "choose article type" style="width:200px" placement="top">
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
  name: 'updateArticle',
  components: {
    mavonEditor
  },
  mounted () {
    //存储数据到vuex
    this.articleTypeAjax()
  },
  data () {
    return {
      // 0： 新增，1: 修改
      model: parseInt(sessionStorage.getItem("model")),
      //文章id
      articleId: parseInt(sessionStorage.getItem("articleId")),
      //文章类型
      articleTypeLst: [],
      //文章类型 默认值
      articleTypeModel: {
          articleTypeId: parseInt(sessionStorage.getItem("articleTypeId"))
        },
      //文章标题
      articleTitle: sessionStorage.getItem("articleName"),
      //文章内容
      articleContent: sessionStorage.getItem("articleContent"),
      //可见状态
      status: eval(sessionStorage.getItem("articleStatus").toLowerCase()),
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
      this.$ajax.post
      (
         this.$global.serverPath+'/articleType/findAll',
         JSON.stringify({
            offset: 0,
             limit: 10
         }),
         // 一下是get请求参数格式
        //  {
        //    params: {
        //      offset: 0,
        //      limit: 10
        //    }
        //  },
         {headers: {'Content-type': 'application/json;charset=UTF-8'}}
      )
      .then(function(res){
          this.articleTypeLst = res.data.data
      }.bind(this))
      .catch(function(res){
          console.log(res)
      })
    },
    
    //文章修改请求
    update(){
      this.$ajax.post
      (
         this.$global.serverPath+'/article/updateArticle',
         JSON.stringify({
            articleId: this.articleId,
            articleName: this.articleTitle,
            articleTypeId: this.articleTypeModel.articleTypeId,
            articleStatus: this.status,
            articleContent: this.articleContent
         }),
         {headers: {'Content-type': 'application/json;charset=UTF-8'}}
      )
      .then(function(res){
          // console.log(res)
          if(res.data.resultCode == 200){
            this.$router.push({path: '/home/articlelst'})
            this.$Message.info(res.data.strDescribe)
          }
          if(res.data.resultCode == -100){
            this.$Message.info(res.data.strDescribe)
          }
      }.bind(this))
      .catch(function(res){
          this.$Message.info(res.data.strDescribe)
      })
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
