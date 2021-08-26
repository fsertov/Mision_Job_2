<template>
    <div class="user">
        <div class="adriname">
            <h1>Administra tu Dinero</h1>
            <h1>Responsable e Inteligentemente</h1>
        </div>

        <div class="contenedor_p">
            <div class="contenido_a">
                <img src="./img/avatar.png" alt="Avatar Image">
                <img src="./img/pencil.png" alt="Pencil Image">
            </div>
            <div class="sub_contenedor">
                <div>
                    <img src="./img/user.png" alt="User Image">
                    <input v-model="this.username" type="text" size="30" maxlength="50"  name="nombre" disabled=true id="username">
                </div>
                <div>
                    <img src="./img/email.png" alt="Email Image">
                    <input v-model="this.email" type="text" size="30" maxlength="50"  name="nombre" disabled=true id="email">
                </div>
                <div>
                    <img src="./img/calendar.png" alt="Calendar Image">
                    <input type="text" size="30" maxlength="50" value="Fecha de nacimiento" name="nombre" disabled=true>
                </div>
                <div>
                    <img src="./img/lock.png" alt="Lock Image">
                    <input type="text" size="30" maxlength="50" value="Contraseña" name="nombre" disabled=true>
                </div>
                <div>
                    <img src="./img/trash.png" alt="Trash Image">
                </div>
            </div>
            <div class="sub_contenedor2">
                <div>
                    <img src="./img/notification.png" alt="Notification Image"> Activar notificaciones
                </div>
                <div>
                    <img src="./img/pie-chart.png" alt="Pie-chart Image"> Ver balance
                </div>
                <div>
                    <img src="./img/gear.png" alt="Gear Image"> Personalizar ingresos
                </div>
                <div>
                    <img src="./img/gear.png" alt="Gear Image"> Personalizar egresos
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default{
      name: "Profile",
      data:
      function(){

      return{
        username: this.usernamevalue,
        email: this.emailvalue,
        usernamevalue:null,
        emailvalue:null
      }
    },
      beforeCreate() {
        this.usernamevalue = localStorage.getItem('username');
        this.emailvalue = localStorage.getItem('email');
        this.username =this.usernamevalue;
        this.email=this.emailvalue;
       console.log("beforeCreate")
      },
      mounted(){
        document.getElementById('username').innerHTML=this.usernamevalue;
        document.getElementById('email').innerHTML=this.emailvalue;
      }
    }
</script>

<style scoped>
.user{
  height: 75vh;
  margin: 0%;
  padding: 0%;
  background: #FDFEFE ;
}

.user .adriname{
  text-align: right;
  height: 9rem;
  color: #398558;
}

.user .contenedor_p{
	width:100%;
	height:75%;
}

.user .contenido_a{
	height:80%;
	width:30%;
	float:left;
	margin: 10px;
}

.user .sub_contenedor{
	width:30%;
	float:left;
	margin: 10px;

	margin: 0 0 1rem;
	height: 18rem;
	display: flex;
	/* align-items por defecto tiene el valor `stretch` */
	align-items: start;
	flex-direction: column;
	/* Variaciones: space-between, space-around, space-evenly */
	justify-content: space-around;
}

.user .sub_contenedor2{
	width:30%;
	float:left;
	margin: 10px;

	margin: 0 0 1rem;
	height: 18rem;
	display: flex;
	/* align-items por defecto tiene el valor `stretch` */
	align-items: start;
	flex-direction: column;
	/* Variaciones: space-between, space-around, space-evenly */
	justify-content: space-around;
}
</style>
