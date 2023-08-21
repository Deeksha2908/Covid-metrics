import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import firebase from 'firebase/app';
import '@/assets/css/main.css'

const firebaseConfig = {
  apiKey: "AIzaSyBQkfljPF8H4g_Dgwrz-jBWaFXKPo0xMMY",
  authDomain: "covid-dashboard-cd776.firebaseapp.com",
  projectId: "covid-dashboard-cd776",
  storageBucket: "covid-dashboard-cd776.appspot.com",
  messagingSenderId: "743687622046",
  appId: "1:743687622046:web:429d12c6dd3d4958305a8f"
};
firebase.initializeApp(firebaseConfig);





Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')