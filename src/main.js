import Vue from "vue";
import App from "./App";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import VueApollo from "vue-apollo";
import apolloClient from "./Apollo/apollo";

Vue.use(Vuetify);

Vue.config.productionTip = false;

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});
/* eslint-disable no-new */
new Vue({
  el: "#app",
  apolloProvider,
  render: h => h(App)
});
