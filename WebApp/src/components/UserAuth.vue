<template>

<div class="card">
  <div class="card-header">
    <h2>Autenticarse</h2>
  </div>
<div class="card-body">
    <form v-on:submit.prevent="processAuthUser">
        <label for="inputUsername" class="col-sm-2 col-form-label">User Name</label>
        <input v-model="user_in.username" placeholder="Username"
            type="text"
            class="form-control"
        />
        <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">
        <input v-model="user_in.password"
            placeholder="Password" type="password" class="form-control"/>
        </div>    
             <button type="submit" class="btn btn-success">Iniciar Sesion</button>

    </form>
</div>
</div>

</template>

<script>
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";

export default {
  name: "UserAuth",

  data: function () {
    return {
      user_in: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    processAuthUser: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($authenticateCredentials: CredentialsInput!) {
              authenticate(credentials: $authenticateCredentials) {
                refresh
                access
              }
            }
          `,
          variables: {
            authenticateCredentials: this.user_in,
          },
        })
        .then((result) => {
          let data = result.data.authenticate;
          data.user_id = jwt_decode(data.access)
            .user_id.toString()
            .padStart(3, "0");

          this.$emit("log-in", data, this.user_in.username);
        })
        .catch((error) => {
          alert("El usuario y/o contraseña son incorrectos");
        });
    },
  },
};
</script>

<!--
<style>
    .auth_user{
        margin: 0;
        padding: 0%;
        height: 100%;
        width: 100%;
    
        display: flex;
        justify-content: center;
        align-items: center;

    }

    .container_auth_user {
        border: 3px solid  #283747;
        border-radius: 10px;
        width: 25%;
        height: 60%;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .auth_user h2{
        color: #283747;

    }

    .auth_user form{
        width: 50%;
        
    }

    .auth_user input{
        height: 40px;
        width: 100%;

        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 0;

        border: 1px solid #283747;
        
    }

    .auth_user button{
        width: 100%;
        height: 40px;

        color: #E5E7E9;
        background: #283747;
        border: 1px solid #E5E7E9;

        border-radius: 5px;
        padding: 10px 25px;
        margin: 5px 0;
    }

    .auth_user button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }
</style-->

