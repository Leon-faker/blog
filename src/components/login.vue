<template>
  <div id="login">
    <div class="login">
        <label><h2>FederikBlog</h2></label>
        <p><Input v-model="username" type="text" name="username" value="username" prefix="ios-contact" placeholder="Enter Username" style="width: auto" /></p>
        <p><Input v-model="password" type="password" name="username" value="password" prefix="ios-lock" placeholder="Enter Password" style="width: auto" /></p>
        <p><Button @click="loginRequest()" style="width:49%" type="success">Login</Button></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    jump () {
      this.$router.push({path: '/home'})
    },
    loginRequest () {
      if(this.username == "" || this.password == ""){
        this.$Message.info('用户名和密码不能为空');
      }else{
        this.ajax()
      }
    },
    ajax () {
      this.$ajax.post
      (
         'http://localhost:9000/federik/loginuser',
         JSON.stringify({
            netUserName: this.username,
            netUserPassword: this.password
         }),
         {headers: {'Content-type': 'application/json;charset=UTF-8'}}
      )
      .then(function(res){
          console.log(res.data.resultCode);
          if(res.data.resultCode == 93){
            this.$router.push({path: '/home'})
          }
          if(res.data.resultCode == 92){
            this.$Message.info('用户名或密码错误');
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
  #login{
    padding: 0px;
    width: 100%;
    height: 100%;
    background-image: url(../assets/net_bk_ioc2.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center 0;
    background-attachment: fixed;
    object-fit: cover;
    zoom: 1;
  }
  .login{
    position: relative;
    padding-top: 70px;
    width: 380px;
    height: 350px;
    left: 60%;
    top: 20%;
    opacity: 0.7;
    background-color: #f6f6f6;
    box-shadow:1px 0px 30px #888888;
  }
  @media screen and (max-width: 1200px){
    .login{
      left: 40%;
    }
  }
  @media screen and (max-width:700px){
    .login{
      left: 6%;
    }
  }
  .login input{
    display: none;
  }
  .login h2{
    text-align: center;
    font-size: 2em;
  }
  .login input{
    position: relative;
    width: 300px;
  }

 .login p{
   margin-top: 20px;
   text-align: center;
 }

</style>
