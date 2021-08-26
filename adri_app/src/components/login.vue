<template>
    <div class="login-box">
      <h1>
          <div>Iniciar sesión</div>
          <div>. . .</div>
          <div>Ir a Adri</div>
      </h1>
      <form method="POST" v-on:submit.prevent @submit="submit">
        <!-- USERNAME INPUT -->
        <label for="username">Nombre de Usario</label>
        <input v-model="username" type="text" placeholder="Ingrese nombre de usuario" >
        <!-- PASSWORD INPUT -->
        <label for="password">Contraseña</label>
        <input v-model="password" type="password" placeholder="Ingrese contraseña">
        <input v-on:click="submit" type="submit" value="Inciar Sesion">
        <a href="#">Olvidó su contraseña?</a><br>
        <a href="#">Aún no tiene cuenta?</a>
      </form>
    </div>
</template>

<script>
  export default {
    name: "Login",
    data:
      function(){

      return{
        username: '',
        password: '',
      }
    },

    methods: {
      submit: function(){
        var datajson = {
          "username": this.username,
          "password": this.password
        };
         axios.post('http://127.0.0.1:8000/user/auth/',datajson)
       .then((result) => {
                    alert("Autenticación Exitosa");
                   localStorage.setItem('autenticado', result.data.autenticado);
                   localStorage.setItem('username',result.data.username);
                   localStorage.setItem('email',result.data.email);
                   console.log(result);
                  this.$router.push({name: "profile"});
                  forceRerender();
        })
        .catch(error => {
            if (error.response.status == "404")
                alert("ERROR 404: Usuario no encontrado.");

            if (error.response.status == "403")
                alert("ERROR 403: Contraseña Erronea.");
        });
      }
    }
  }
</script>

<style scoped>
    .login-box {
    width: 320px;
    height: 420px;
    background: #fff;
    color: rgb(8, 8, 8);
    top: 55%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    padding: 55px 30px;
    box-shadow: 2px 2px 6px 6px #000;
  }

  .login-box .avatar {
    width: 30%;
    height: 30%;
    border-radius: 0%;
    position: absolute;
    top: -80px;
    left: calc(50% - 50px);
  }

  .login-box h1 {
    margin: 0;
    padding: 0 0 20px;
    text-align: center;
    font-size: 22px;
  }

  .login-box label {
    margin: 0;
    padding: 0;
    font-weight: bold;
    display: block;
  }

  .login-box input {
    width: 100%;
    margin-bottom: 20px;
  }

  .login-box input[type="text"], .login-box input[type="password"] {
    border: none;
    border-bottom: 1px solid rgb(15, 15, 15);
    background: transparent;
    outline: none;
    height: 40px;
    color: rgb(14, 12, 12);
    font-size: 16px;
  }

  .login-box input[type="submit"] {
    border: none;
    outline: none;
    height: 40px;
    background: #398558;
    color: rgb(15, 15, 15);
    font-size: 18px;
    border-radius: 20px;
  }

  .login-box input[type="submit"]:hover {
    cursor: pointer;
    background: #5abe82;
    color: #000;
  }

  .login-box a {
    text-decoration: none;
    font-size: 12px;
    line-height: 20px;
    color: rgb(15, 15, 15);
  }

  .login-box a:hover {
    color: #033831;
  }
</style>
