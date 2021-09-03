<template>
  <div id="Account">
    <div class="container">

     <h1> DATOS ASPIRANTE</h1>
      <h2>
        Nombre: <span>{{ username }}</span>
      </h2>
       <h2>
        Ocupación: <span>{{ accountByUserId.occupation }}</span>
      </h2>
      <h2>
        Aspiración Salarial: <span>${{ accountByUserId.aspiration }} COP</span>
      </h2>
      <h2>
        Puntos: <span>{{ accountByUserId.balance }} Coins</span>
      </h2>
      <h2>
        Fecha última actividad:
        <span>{{ accountByUserId.lastChange.substring(0, 10) }}</span>
      </h2>
      <h2>
        Hora última actividad:
        <span>{{ accountByUserId.lastChange.substring(11, 19) }}</span>
      </h2>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Account",

  data: function () {
    return {
      username: "none",
      accountByUserId: {
        occupation: "null",
        aspiration: "null",
        balance: "null",
        lastChange: "null",
      }
    };
  },

  created: function () {
    this.username = this.$route.params.username;
  },

  apollo: {
    accountByUserId: {
      query: gql`
        query ($accountByUserIdUserId: String!) {
          accountByUserId(userId: $accountByUserIdUserId) {
            name
            lastName
            occupation
            aspiration
            balance
            lastChange
            userId
          }
        }
      `,
      variables() {
        return {
          accountByUserIdUserId: localStorage.getItem("user_id"),
        };
      },
    },
  },
};
</script>


<style>
#Account {
  width: 100%;
  height: 120%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.container {
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  max-width: 50%;
  padding: 70px;
  border: 5px solid rgba(0, 0, 0, 0.3);
  border-radius: 30px;
}

#Account h2 {
  font-size: 30px;
  color: #283747;
}

#Account h1 {
  position: relative;
  text-align: center;
  font-size: 35px;
  color: #283747;

}

#Account span {
  color: rgb(20, 163, 220);
  font-weight: bold;
}
</style>