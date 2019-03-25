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
          <Option v-for="item in articleTypeLst" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      <b>可见状态：</b>
      <i-switch size="large">
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
      articleTypeLst: [
          {
              value: 'Java',
              label: 'Java'
          },
          {
              value: 'Spring',
              label: 'Spring'
          },
          {
              value: 'Mysql',
              label: 'Mysql'
          }
      ],
      //文章类型
      articleTypeModel: '',
      //文章标题
      articleTitle: '',
      //文章内容
      articleContent: ''
    }
  },
  methods: {
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
          console.log(res);
      }.bind(this))
      .catch(function(res){
          console.log(res)
      })
    },
    issue () {
      console.log(this.articleContent)
      if(this.articleTitle==""){
        this.$Message.info('主题不能为空');
        return;
      }
      this.ajax()
    },
    ajax () {
      this.$ajax.post
      (
         'http://localhost:9000/article/addArticle',
         JSON.stringify({
            articleName: this.articleTitle,
            articleTypeId: 1,
            articleStatus: 0,
            articleContent: this.articleContent
         }),
         {headers: {'Content-type': 'application/json;charset=UTF-8'}}
      )
      .then(function(res){
          console.log(res);
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
