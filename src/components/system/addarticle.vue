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
      <mavon-editor></mavon-editor>
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
      articleTypeModel: '',
      //文章标题
      articleTitle: ''
    }
  },
  methods: {
    issue () {
      console.log(this.articleTitle)
      if(this.articleTitle==""){
        this.$Message.info('主题不能为空');
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
