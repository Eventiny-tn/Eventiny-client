<template>
  <div class="home">
    <MarketingSolution :test="test" />
  </div>
</template>

<script>
// @ is an alias to /src
import MarketingSolution from "../components/MarketingSolution";
export default {
  name: "MarketingSolution",
  components: {
    MarketingSolution,
  },
  methods: {
    test() {
      console.log("test");
    },
  },
};
</script>