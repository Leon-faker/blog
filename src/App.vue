<template>
  <div id="app">
      <!--页面刷新-->
      <router-view v-if="alive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.checkLoginAxios()
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      alive: true
    }
  },
  methods: {
    reload() {
      this.alive= false
      this.$nextTick(() => {
        this.alive = true
      })
    },
    checkLoginAxios(){
      this.$ajax.post
      (
         'http://localhost:9000/federik/checkLogin',
         null,
         {headers: {'Content-type': 'application/json;charset=UTF-8'}}
      )
      .then(function(res){
          if(res.data.resultCode == -100){
            this.$router.push({path: '/'})
            this.$Message.info("请登陆你的账号")
          }
      }.bind(this))
      .catch(function(res){
          this.$Message.info(res.data.strDescribe)
      })
    }
  }
}
</script>

<style>
html,body,#app{
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
}
</style>
