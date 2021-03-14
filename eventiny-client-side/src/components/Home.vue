<template>
  <div class="navigate">
    <a @click="signup()">signup</a>
    /
    <a @click="signin()">login</a>
  </div>
</template>
<script>
export default {
  methods: {
    signin() {
      this.$router.push("/Login");
    },
    signup() {
      this.$router.push("/Signup");
    },
  },
  components: {},
};
</script>
<style scoped>
.navigate {
  float: right;
  margin-right: 10px;
}
</style>
