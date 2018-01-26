<template>
  <v-layout>
    <v-flex xs12 md6 offset-md3>

      <div>
        <h1>Shipping Calculator</h1>
        <h4>Estimate Shipping rates to your country</h4>
      </div>

      <v-form class="mt-3">
        <v-select
        label="Country"
        :items="countries"
        autocomplete
        color="green"
        required
        :rules="[(value)=>!!value || 'Country is required']"
        v-model="userInput.country"
        item-text="countryName"
        item-value="countryName"
        ></v-select>
        <v-text-field
        v-for="item in inputArr"
        :key="item.label"
        :label="item.label"
        :hint="item.hint"
        color="green"
        type="number"
        required
        :rules="item.myRules || [(value)=>!!value || 'This field is required']"
        v-model="userInput[item.modelProp]"
        ></v-text-field>
        <v-btn dark block class="green" @click="submitForm" :disabled="!showSubmitBtn" :loading="loadingIcon">Get Rates</v-btn>
      </v-form>

    </v-flex>
  </v-layout>
</template>


<script>
import gql from "graphql-tag";

export default {
  props: ["loadingIcon"],
  data() {
    return {
      userInput: {
        country: "",
        weight: "",
        length: "",
        width: "",
        height: ""
      },
      inputArr: [
        { label: "Weight (gms)", hint: "", modelProp: "weight" },
        {
          label: "Length (cm)",
          hint: "Max Length Allowed - 150cm",
          modelProp: "length",
          myRules: [
            value => !!value || "This field is required",
            value => value <= 150 || "Length can't be more than 150"
          ]
        },
        { label: "Width (cm)", hint: "", modelProp: "width" },
        { label: "Height (cm)", hint: "", modelProp: "height" }
      ],
      // countries: ["Britain", "Chile", "Bangladesh", "China"]
      countries: []
    };
  },
  methods: {
    submitForm() {
      // this.loadingIcon = true;
      this.userInput.country = this.userInput.country.toUpperCase();
      this.$emit("showPricingPage", {
        userInput: this.userInput,
        loading: true
      });
    }
  },
  computed: {
    showSubmitBtn() {
      let flag = true;
      for (let i in this.userInput) {
        if (!this.userInput[i]) {
          return (flag = false);
        } else if (i === "length" && this.userInput[i] > 150) {
          return (flag = false);
        }
      }
      return flag;
    }
  },
  apollo: {
    countries: {
      query: gql`
        query {
          countries {
            countryName
          }
        }
      `
    }
  }
};
</script>


<style scoped>

</style>
