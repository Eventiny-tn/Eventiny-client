<template>
  <div>
    <GeneralPage />
    <Userprofile :data="data" />
  </div>
</template>
<script>
import GeneralPage from "../components/GeneralPage";
import Userprofile from "../components/Useprofile.vue";
export default {
  name: "GeneralPage",
  components: {
    GeneralPage,
    Userprofile,
  },
  data() {
    return {
      data: [],
    };
  },

  methods: {
    getinfos() {
      const token = localStorage.getItem("token");
      const header = {
        Authorisation: `Bearer ${token}`,
      };
      console.log("header generalpage ===>", header);
      axios
        .get("http://localhost:3000/users/profile", { headers: header })
        .then(({ data }) => {
          this.$data.data = data;
          console.log("data from general", data);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("okokkok");
    },
  },
  mounted() {
    this.getinfos();
  },
};
</script>
