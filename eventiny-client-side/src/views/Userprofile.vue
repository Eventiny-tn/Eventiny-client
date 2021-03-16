<template>
  <div class="home">
    <Userprofile />
  </div>
</template>

<script>
// @ is an alias to /src
import Userprofile from '../components/Userprofile.vue';
export default {
  name: "Profile",
  components: {
   
    Userprofile,
  },
};
</script>
