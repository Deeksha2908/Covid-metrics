<template>
    <div>
    <p>Hello from auth bar</p>
    <LogoutButton v-if="$auth.isAuthenticated" />
    <LoginButton v-else />
  </div>
</template>

<script>
import LoginButton from './LoginButton.vue'
import LogoutButton from './LogoutButton.vue';
export default {
      name: 'AuthBar',
      components: { LogoutButton, LoginButton },
}
</script>
  
