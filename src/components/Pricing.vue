<template>
  <v-layout>
    <v-flex xs12 md6 offset-md3>
      <v-btn dark class="green" @click="backToForm">Back</v-btn>

      <v-data-table
      hide-headers
      hide-actions
      :items="userInputTable"
      class="mb-5 mt-3"
      >
        <template slot="items" slot-scope="props">
          <td>{{props.item.label}}</td>
          <td>{{props.item.text}}</td>
        </template>
      </v-data-table>

      <v-data-table
      :headers="headers"
      :items="rates"
      hide-actions
      class="text-xs-center"
      >
        <template slot="items" slot-scope="props">
        <td class="text-xs-left">${{ props.item.rate | toUSD}}</td>
        <td class="text-xs-center">{{ props.item.method }}</td>
        </template>
      </v-data-table>


    </v-flex>
  </v-layout>
</template>


<script>
export default {
  props: ["user", "rates"],
  data() {
    return {
      headers: [
        { text: "Rate (USD)", align: "left", sortable: false, value: "rate" },
        {
          text: "Shipping Method",
          align: "center",
          sortable: false,
          value: "method"
        }
      ],
      userInputTable: [
        { label: "Shipping To", text: this.user.country },
        { label: "Weight", text: this.user.weight },
        {
          label: "Dimensions (L x W x H)",
          text: `${this.user.length} x ${this.user.width} x ${this.user.height}`
        }
      ],
      items: [
        { rate: 10, method: "EMS" },
        { rate: 20, method: "International ePacket" },
        { rate: 30, method: "Parcel Post Airmail" },
        { rate: 40, method: "Parcel Post SAL" },
        { rate: 50, method: "Parcel Post Seamail" },
        { rate: 60, method: "Printed Matter Airmail" },
        { rate: 70, method: "Printed Matter Registered Airmail" },
        { rate: 80, method: "Printed Matter Registered SAL" },
        { rate: 90, method: "Printed Matter SAL" },
        { rate: 100, method: "Small Packet Airmail" },
        { rate: 110, method: "Small Packet Registered SAL" },
        { rate: 120, method: "Small Packet SAL" }
      ]
    };
  },
  methods: {
    backToForm() {
      this.$emit("backToFormPage");
    }
  },
  filters: {
    toUSD(value) {
      return (value * 0.0092).toFixed(2);
    }
  }
};
</script>
