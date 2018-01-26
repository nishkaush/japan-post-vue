<template>
  <v-app dark>
    <v-container class="mt-4">
      <keep-alive>
        <my-form 
        v-if="!showPricing" 
        @showPricingPage="showRates($event)"
        :loadingIcon="loadingIcon"
        ></my-form>
      </keep-alive>
      <my-pricing 
      v-if="showPricing===true" 
      @backToFormPage="showPricing=false"
      :user="userQueries"
      :rates="ratesArr"
      ></my-pricing>
    </v-container>
  </v-app>
</template>

<script>
import gql from "graphql-tag";
import Form from "./components/Form.vue";
import Pricing from "./components/Pricing.vue";

export default {
  data() {
    return {
      loadingIcon: false,
      showPricing: false,
      userQueries: "",
      ratesArr: ""
    };
  },
  methods: {
    showRates(userInfo) {
      this.loadingIcon = userInfo.loading;
      const myQuery = gql`
        query($country: String, $weight: Int) {
          rates(country: $country, weight: $weight) {
            method
            rate
          }
        }
      `;
      this.$apollo
        .query({
          query: myQuery,
          variables: {
            country: userInfo.userInput.country,
            weight: userInfo.userInput.weight
          }
        })
        .then(res => {
          this.userQueries = userInfo.userInput;
          this.ratesArr = res.data.rates;
          this.loadingIcon = false;
          this.showPricing = true;
        })
        .catch(err => console.log("ooopsss", err));
    }
  },
  name: "App",
  components: {
    "my-form": Form,
    "my-pricing": Pricing
  }
};
</script>
