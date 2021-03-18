<template>
  <div class="home">
    <Userprofile :test="test" />
  </div>
</template>

<script>
// @ is an alias to /src
import Userprofile from "../components/Userprofile.vue";
export default {
  name: "Profile",
  components: {
    Userprofile,
  },
  methods: {
    test() {
      console.log("test");
    },
  },
};
</script>
