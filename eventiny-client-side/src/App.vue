<template>
  <div>
    <div>
      <LogIn />
    </div>
    <div>
      <Signup />
    </div>
  </div>
</template>
<script>
import LogIn from "./components/LogIn";
import Signup from "./components/Signup.vue";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    LogIn,
    Signup,
  },
};
</script>

<style></style>
