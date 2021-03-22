<template>
  <div class="home">
    <PlannerRequest :test="test" />
  </div>
</template>

<script>
// @ is an alias to /src
import PlannerRequest from "../components/PlannerRequest";
export default {
  name: "PlannerRequest",
  components: {
    PlannerRequest,
  },
  methods: {
    test() {
      console.log("test");
    },
  },
};
</script>
