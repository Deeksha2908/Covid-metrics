<template>
  <v-app>
       <div class="navbar">
        <div></div>
        <h1 class="title">Covid dashboard</h1>
        <ul class="stickright">
          <li>
        <v-btn text>
          <router-link to="/">Home</router-link>
        </v-btn>
        </li>
        <li>
        <v-btn v-if="user==null" text>
          <router-link to="/signin">Signin</router-link>
        </v-btn>
        </li>
        <li>
        <v-btn v-if="user==null" text>
          <router-link to="/signup">Sign up</router-link>
        </v-btn>
        </li>
        <li>
        <v-btn v-if="user!=null" text @click="logOut">
          Logout
        </v-btn>
        </li>
      </ul>
     </div>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase";
export default {
  name: "App",

  data(){
     return{
      user: null
     }
  },
  created(){
      firebase.auth().onAuthStateChanged(user=>{
        this.user= user;
        console.log(this.user)
      })
  },
  methods:{
    logOut() {
      firebase.auth().signOut().then(() => {
        firebase.auth().onAuthStateChanged(() => {
          this.$router.push('/')
        })
      })
    }
  }
};
</script>

<style scoped>

 .navbar{
  display: flex;
  justify-content: space-between;
  background-color: rgb(4, 4, 100);
  color:white;
  height: 70px;
  margin-bottom: 20px;
 }
 .stickright> li{
  float: right;
  list-style: none;
  color: white;
  margin-top:20px;
 }
 .title{
  text-align: center;
  margin-top:20px;
 }
</style>
