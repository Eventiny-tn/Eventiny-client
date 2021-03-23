<template>
  <div class="home">
    <PlannerDashboard :test="test" />
  </div>
</template>

<script>
// @ is an alias to /src
import PlannerDashboard from "../components/PlannerDashboard";
export default {
  name: "PlannerDashboard",
  components: {
    PlannerDashboard,
  },
  methods: {
    test() {
      console.log("test");
    },
  },
};
</script>
