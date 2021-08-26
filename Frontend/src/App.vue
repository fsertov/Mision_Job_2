<template>
  <div id="app" class="app">
    <div class="header">
      <h1>Banco UN</h1>

      <nav>
        <button v-on:click="init" v-if="is_auth" > Inicio </button>
        <button v-on:click="logOut" v-if="is_auth" > Cerrar Sesión </button>
      </nav>
    </div>
    
    <div class="main-component">
      <router-view  v-on:log-in="logIn"></router-view>
    </div>

    <div class="footer">
      <h2>Misión TIC 2022</h2>
    </div>
  </div>
</template>

<script>

import gql from 'graphql-tag'

export default {
  name: 'App',

  data: function(){
      return{ 
        is_auth: false
      }    
  },

  created: function(){
    this.updateAccessToken();
  },

  methods:{

    updateAccessToken: async function(){
      if(localStorage.getItem('refresh_token')==null){
        this.$router.push({name: "user_auth"})
        this.is_auth = false
        return;
      }

      await this.$apollo.mutate({
        mutation: gql`
          mutation ($refreshTokenRefresh: String!) {
            refreshToken(refresh: $refreshTokenRefresh) {
              access
            }
          }`
        , 
        variables: {
          refreshTokenRefresh: localStorage.getItem('refresh_token')
        }
      }).then((result) => {
        localStorage.setItem('access_token', result.data.refreshToken.access)
        this.is_auth = true
      }).catch((error) => {
        alert("Su sesión expiró, vuelva a iniciar sesión.")
        this.$router.push({name: "user_auth"})
        this.is_auth = false
      });
    },

    logIn: async function(data, username){
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
      localStorage.setItem('user_id', data.user_id)
      localStorage.setItem('current_username', username)

      await this.updateAccessToken();
      if(this.is_auth) this.init();
    },

    init: function(){
      this.$router.push({name: "user", params:{ username: localStorage.getItem("current_username") }})
    },

    logOut: async function(){
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user_id')
      localStorage.removeItem('current_username')

      await this.updateAccessToken();
    }   
  }
  
}

</script>

<style>
  body{
    margin: 0 0 0 0;
  }

  .header{
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100px;
    margin: 0%;
    padding: 0;

    background-color: #283747 ;
    color:#E5E7E9  ;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header h1{
    width: 20%;
    text-align: center;
  }

  .header nav {
    height: 100%;
    width: 40%;

    display: flex;
    justify-content: space-around;
    align-items: center;

    font-size: 20px;
  }

  .header nav button{
    color: #E5E7E9;
    background: #283747;
    border: 1px solid #E5E7E9;

    border-radius: 5px;
    padding: 10px 20px;
  }

  .header nav button:hover{
    color: #283747;
    background: #E5E7E9;
    border: 1px solid #E5E7E9;
  }

  .main-component{
    height: 75vh;
    margin: 0%;
    padding: 0%;

    background: #FDFEFE ;
  }
 
  .footer{
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 75px;

    background-color: #283747;
    color: #E5E7E9;
  }

  .footer h2{
    margin: 0px;
    width: 100%;
    height: 100%;
    
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
