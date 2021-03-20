<template>
  <div>
    <div class="home">
      <div><Home :getUserInfo="getUserInfo" /></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Home from "../components/Home.vue";
export default {
  name: "Home",
  components: {
    Home,
  },
  methods: {},
  // mounted() {
  //   this.getUserInfo();
  // },
};
</script>
