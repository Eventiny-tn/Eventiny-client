<template>
  <form>
    <div class="form-group">
      <label for="exampleInputEmail1">Email</label>
      <input
        type="email"
        class="form-control"
        placeholder="Enter email"
        v-model="PayMeth.email"
      />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">First Name</label>
      <input
        type="name"
        class="form-control"
        placeholder=" Your first name"
        v-model="PayMeth.firstName"
      />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Last Name</label>
      <input
        type="name"
        class="form-control"
        placeholder=" Your Last name"
        v-model="PayMeth.lastName"
      />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Phone Number</label>
      <input
        type="tel"
        class="form-control"
        placeholder=" Your phone number"
        v-model="PayMeth.phoneNumber"
      />
    </div>
    <button class="btn submit-button" @click.prevent="submittedPay(PayMeth)">
      continue checkout with konnect
    </button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      PayMeth: { email: "", firstName: "", lastName: "", phoneNumber: "" },
    };
  },
  props: {
    submittedPay: {
      type: Function,
    },
  },
};
</script>
<style scoped>
.submit-button {
  margin-left: 40%;
  position: relative;
  transition-property: background-color;
  transition-duration: 0.5s;
  transition-timing-function: linear;
  transition-delay: 0.1s;
}
.submit-button:hover {
  background-color: rgb(255, 94, 0, 0.5);
}
</style>
