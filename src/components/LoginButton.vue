<template>
  <div class="vue-tempalte">
      <form @submit.prevent="userLogin">
          <h3>Sign In</h3>
          <div class="mb-3">
              <label>Email address</label>
              <input type="email" class="form-control form-control-lg" v-model="user.email" />
          </div>
          <div class="mb-3">
              <label>Password</label>
              <input type="password" class="form-control form-control-lg" v-model="user.password" />
          </div>
          <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
          <p class="forgot-password text-right mt-2 mb-4">
              <router-link to="/forgot-password">Forgot password ?</router-link>
          </p>
      </form>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
data() {
  return {
    user: {   
      email: '',
      password: ''
    }
  };
},
methods: {
  userLogin() {
      firebase
      .auth()
      .signInWithEmailAndPassword(this.user.email, this.user.password)
      .then(() => {
          this.$router.push(`/about/${this.user.email}`)
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}
};
</script>