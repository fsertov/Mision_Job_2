<!-- Representa el html (Estructura) -->
<template >
  <div id="app">
    <div class="header">
      <h1><img src="./img/logoWhite.png" class="logo" alt="Logo Image"></h1>
        <nav>
          <button v-on:click="init"> Ingresar </button>
          <button v-on:click="profile" v-if="is_auth"> Ingresos </button>
          <button v-if="is_auth" > Egresos </button>
          <button v-if="is_auth" > Ahorros </button>
          <button v-if="is_auth" > Inversiones </button>
          <button v-if="is_auth" v-on:click="cerrarSesion" > Cerrar Sesion </button>
        </nav>
      </div>

    <div class="main-component">
      <router-view> </router-view>
    </div>

    <div class="footer">
      <h2>Powered by SoftSolutions</h2>
    </div>
  </div>

</template>

<!-- Representa el js (Comportamiento) -->
<script>
  export default {
    name: 'App',
    components: {},
    data: function(){
      return {
        is_auth: localStorage.getItem('autenticado') || false
      }
    },

    methods: {
      cerrarSesion: function(){
        if(this.$route.name != "login"){
          this.$router.push({name: "login"})
          localStorage.removeItem('autenticado');
          forceRerender();
        }
      },
      init: function(){
        if(this.$route.name != "login"){
          this.$router.push({name: "login"})
        }
      },

      profile: function(){
        if(this.$route.name != "profile"){
          this.$router.push({name:"profile"})
        }
      }

    },
  //   beforeCreate(){
  //   this.$router.push({name: "login"})
  // }
}

</script>

// Representa el css (estilo) -->
<style>
  body{
    margin: 0 0 0 0;
    font-family: omegle;
  }

  .header{
    margin: 0%;
    padding: 0;
    width: 100%;
    height: 10vh;
    min-height: 100px; background-color: #398558 ; color:#E5E7E9 ;
    display: flex;
    justify-content: space-between; align-items: center;
  }

  .header h1{
    width: 20%;
    text-align: center;
  }

  .header h1 .logo {
    width: 20%;
    height: 20%;
  }

  .header nav {
    height: 100%;
    width: 45%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 20px;
  }

  .header nav button{
    color: #398558;
    background: #FFFFFF;
    border: 3px solid #398558;
    border-radius: 5px;
    padding: 10px 10px;
    font-family: omegle;
  }

  .header nav button:hover{
    color: #FFFFFF;
    background: #398558;
    border: 3px solid #E5E7E9;
  }

  .main-component{
    height: 75vh;
    margin: 0%;
    padding: 0%;
    background: #FDFEFE ;
  }
  .footer{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 10vh;
    min-height: 100px;
    background-color:#398558;
    color: #E5E7E9;
  }

  .footer h2{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
