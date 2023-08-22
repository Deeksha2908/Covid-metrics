<template>
  <div class="box">
      <form @submit.prevent="userRegistration">
          <h1>Sign Up</h1>
         
             
              <input type="text"  v-model="user.name" placeholder="Name" />
          
        
              <input type="email" placeholder="Email" v-model="user.email" />
          
        
              <input type="password" placeholder="Password" v-model="user.password" />
        
          <button type="submit" class="btn" @click="userRegistration">
             Sign Up
          </button>
              
      </form>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
data() {
  return {
    user: {
      name: '',
      email: '',
      password: ''
    }
  };
},
methods: {
  userRegistration() {
    firebase
    .auth()
    .createUserWithEmailAndPassword(this.user.email, this.user.password)
    .then((res) => {
      res.user
        .updateProfile({
          displayName: this.user.name
        })
        .then(() => {
          this.$router.push('/signin')
        });
    })
    .catch((error) => {
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
    width: 500px;
    margin: 0 auto;
    border : 2px solid grey;
    margin-top: 100px;
    padding: 20px;
    height: 350px;
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