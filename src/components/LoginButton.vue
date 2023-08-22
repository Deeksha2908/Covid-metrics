<template>
  <div class="box">
    <form @submit.prevent="userLogin">
  
        <h1>Sign in</h1>

        <input
          type="email"
          v-model="user.email"
          placeholder="email"
        />

        <input
          type="password"
          v-model="user.password"
          placeholder="password"
        />


          <div class="btn" @click="userLogin">Sign In</div>

     
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    userLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
          this.$router.push(`/about/${this.user.email}`);
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }
};
</script>
<style scoped>
  body{
    font-family: sans-serif;
  }
  .box{
    width: 400px;
    margin: 0 auto;
    border : 2px solid grey;
    margin-top: 100px;
    padding: 20px;
    height: 300px;
  }
  h1{
    text-align: center;
    margin-bottom: 30px;
  }
  input{
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc
  }
  .btn{
    margin-top:20px;
    width: 100%;
    background-color: rgb(15, 15, 236);
    color: white;
    text-align: center;
    padding: 10px;
  }
  .btn :hover{
    cursor: pointer;
  }
</style>