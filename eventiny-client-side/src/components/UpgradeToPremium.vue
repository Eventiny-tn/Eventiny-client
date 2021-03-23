<template>
  <div>
    <div id="app">
      <form class="vue-form" @submit.prevent="submit">
        <fieldset>
          <legend class="reservation-form-title">Upgrade To Premium</legend>
          <div>
            <h4 class="label" for="name">
              How many events have you organized before?
            </h4>
            <p class="select">
              <select name="cars" id="cars" v-model="firstQ" required>
                <option value="1-5">1-5</option>
                <option value="5-10">5-10</option>
                <option value="10-50">10-50</option>
                <option value="more than 50">more than 50</option>
              </select>
            </p>
          </div>
          <div>
            <h4 class="label" for="phone">
              How did you first hear about Eventiny?
            </h4>
            <p class="select">
              <select
                class="budget"
                name="cars"
                id="cars"
                v-model="secondQ"
                required
              >
                <option value="friends">friends</option>
                <option value="social media">social media</option>
                <option value="events">events</option>
                <option value="Others">Others</option>
              </select>
            </p>
          </div>
          <div>
            <h4 class="label" for="email">
              How many people help plan your events online?
            </h4>
          </div>
          <div>
            <h4>How often do you plan to host events?</h4>
            <p class="select">
              <select
                class="budget"
                name="cars"
                id="cars"
                v-model="thirdQ"
                required
              >
                <option value="weekly">weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="From time to time">From time to time</option>
                <option value="Year">Year</option>
              </select>
            </p>
          </div>

          <div>
            <h4>How Would You Describe Yourself As An Event Planner</h4>
          </div>
          <div>
            <textarea
              class="message"
              name="textarea"
              id="textarea"
              required
              v-model="messages"
              :maxlength="message.maxlength"
            ></textarea>
          </div>
          <div>
            <input type="submit" value="Next" @click="submitForm()" />
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      data: [],
      firstQ: "",
      secondQ: "",
      thirdQ: "",
      messages: "",

      guests: [
        { value: 0, text: "Select One Of them please" },
        { value: 1, text: "Game or Competition" },
        { value: 2, text: "Tradeshow, Consumer Show, or Expo" },
        { value: 3, text: "Conference" },
        { value: 4, text: "Online" },
        { value: 5, text: "Seminar or Talk" },
      ],
      message: {
        maxlength: 255,
      },
      submitted: false,
    };
  },
  methods: {
    eventPlannerFormForCheking() {
      const token = localStorage.getItem("token");
      const header = {
        Authorisation: `Bearer ${token}`,
      };
    },
    getinfos() {
      const token = localStorage.getItem("token");
      const header = {
        Authorisation: `Bearer ${token}`,
      };
      if (token == null) {
        this.$router.push("/");
        return;
      }
      console.log("header generalpage ===>", header);
      axios
        .get("http://localhost:3000/profile", { headers: header })
        .then(({ data }) => {
          if (data) {
            this.$data.data = data;
            return;
          } else {
            localStorage.removeItem("token");
            this.$router.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("token");
          this.$router.push("/");
        });
    },
    submitForm() {
      if (
        this.firstQ &&
        this.secondQ &&
        this.thirdQ &&
        this.messages &&
        this.$data.data.id
      ) {
        console.log("haalim", this.$data.data.id);
        axios
          .post("http://localhost:3000/plannerRequest", {
            firstQ: this.firstQ,
            secondQ: this.secondQ,
            thirdQ: this.thirdQ,
            message: this.messages,
            userId: this.$data.data.id,
          })
          .then(({ data }) => {
            console.log(data);
          })
          .catch((res) => console.log(err));
      } else {
        swal({
          title: "Please fill all the fields!",
          icon: "warning",
          button: "ok!",
        });
        return;
      }
    },
  },
  created() {
    this.getinfos();
  },
};
</script>

<style scoped>
/* @import url("https://fonts.googleapis.com/css?family=Source+Code+Pro:300,400"); */
span.bg-main {
  color: #008ba3;
}
#carroussel {
  max-height: 20px;
  min-height: 20px;
}
h3.my-heading {
  font-family: "Kaushan Script", cursive;
  color: #fff;
  font-weight: bold;
  font-size: 30px;
  margin: 0;
}
body,
html {
  height: 100vh;
  width: 100%;
  padding: 0;
  margin: 0;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  overflow-x: hidden;
}

/*home*/
.carousel {
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
.carousel .carousel-inner {
  height: 100%;
}
.carousel .carousel-inner img {
  display: block;
  object-fit: cover;
}
*,
*::after,
*::before {
  box-sizing: border-box;
}

body {
  color: #fff;
  background: #949c4e;
  background: linear-gradient(to right, #e66465, #9198e5);
  font-family: Arial;
  /*   -webkit-font-smoothing: antialiased; */
  /*   -moz-osx-font-smoothing: grayscale; */
}

html,
body,
.container {
  min-height: 100vh;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

a {
  color: #2c3e50;
  text-decoration: none;
}

header {
  position: relative;
  height: 150px;
  padding-top: 100px;
}

header h1 {
  text-align: center;
  font-size: 2.4rem;
  font-weight: 300;
}

#app {
  display: flex;
  background-color: #008ba3;
}
.label {
  font-size: 20px;
}
.vue-form {
  font-size: 16px;
  width: 900px;
  padding: 15px 30px;
  border-radius: 4px;
  margin: 50px auto;
  background-color: #fff;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);
}
.vue-form fieldset {
  margin: 24px 0 0 0;
}
.vue-form legend {
  padding-bottom: 10px;
  border-bottom: 1px solid #ecf0f1;
}
.vue-form div {
  position: relative;
  margin: 20px 0;
}
.vue-form h4,
.vue-form .label {
  color: #94aab0;
  margin-bottom: 10px;
}
.vue-form .label {
  display: block;
}
.vue-form input,
.vue-form textarea,
.vue-form select,
.vue-form label {
  color: #2b3e51;
}
.vue-form input[type="text"],
.vue-form input[type="email"],
.vue-form textarea,
.vue-form select,
.vue-form legend {
  display: block;
  width: 100%;
  appearance: none;
}
.vue-form input[type="text"],
.vue-form input[type="email"],
.vue-form textarea,
.vue-form select {
  padding: 12px;
  border: 1px solid #cfd9db;
  background-color: #ffffff;
  border-radius: 0.25em;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.08);
}
.vue-form input[type="text"]:focus,
.vue-form input[type="email"]:focus,
.vue-form textarea:focus,
.vue-form select:focus {
  outline: none;
  border-color: #2c3e50;
  box-shadow: 0 0 5px rgba(44, 151, 222, 0.2);
}
.vue-form .select {
  position: relative;
}
.vue-form .select::after {
  content: "";
  position: absolute;
  z-index: 1;
  right: 16px;
  top: 50%;
  margin-top: -8px;
  display: block;
  width: 16px;
  height: 16px;
  background: url("data:image/svg+xml;charset=utf-8,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0D%0A%3C%21DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%0D%0A%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0D%0A%09%20width%3D%2216px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2016%2016%22%20enable-background%3D%22new%200%200%2016%2016%22%20xml%3Aspace%3D%22preserve%22%3E%0D%0A%3Cg%3E%0D%0A%09%3Cpolygon%20fill%3D%22%232c3e50%22%20points%3D%220.9%2C5.5%203.1%2C3.4%208%2C8.3%2012.9%2C3.4%2015.1%2C5.5%208%2C12.6%20%09%22%2F%3E%0D%0A%3C%2Fg%3E%0D%0A%3C%2Fsvg%3E")
    no-repeat center center;
  pointer-events: none;
}
.vue-form select {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  cursor: pointer;
}
.vue-form select::-ms-expand {
  display: none;
}
.vue-form .vue-form-list {
  margin-top: 16px;
}
.vue-form .vue-form-list::after {
  clear: both;
  content: "";
  display: table;
}
.vue-form .vue-form-list li {
  display: inline-block;
  position: relative;
  user-select: none;
  margin: 0 26px 16px 0;
}
.vue-form input[type="radio"],
.vue-form input[type="checkbox"] {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  margin: 0;
  padding: 0;
  opacity: 0;
  z-index: 2;
}
.vue-form input[type="radio"] + label,
.vue-form input[type="checkbox"] + label {
  padding-left: 24px;
}
.vue-form input[type="radio"] + label::before,
.vue-form input[type="radio"] + label::after,
.vue-form input[type="checkbox"] + label::before,
.vue-form input[type="checkbox"] + label::after {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -8px;
  width: 16px;
  height: 16px;
}
.vue-form input[type="radio"] + label::before,
.vue-form input[type="checkbox"] + label::before {
  border: 1px solid #cfd9db;
  background: #ffffff;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.08);
}
.vue-form input[type="radio"] + label::before,
.vue-form input[type="radio"] + label::after {
  border-radius: 50%;
}
.vue-form input[type="checkbox"] + label::before,
.vue-form input[type="checkbox"] + label::after {
  border-radius: 0.25em;
}
.vue-form input[type="radio"] + label::after,
.vue-form input[type="checkbox"] + label::after {
  background-color: #2c3e50;
  background-position: center center;
  background-repeat: no-repeat;
  box-shadow: 0 0 5px rgba(44, 151, 222, 0.4);
  display: none;
}
.vue-form input[type="radio"] + label::after {
  background-image: url("data:image/svg+xml;charset=utf-8,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0D%0A%3C%21DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%0D%0A%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0D%0A%09%20width%3D%2216px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2016%2016%22%20enable-background%3D%22new%200%200%2016%2016%22%20xml%3Aspace%3D%22preserve%22%3E%0D%0A%3Ccircle%20fill%3D%22%23FFFFFF%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%223%22%2F%3E%0D%0A%3C%2Fsvg%3E");
}
.vue-form input[type="checkbox"] + label::after {
  background-image: url("data:image/svg+xml;charset=utf-8,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0D%0A%3C%21--%20Generator%3A%20Adobe%20Illustrator%2018.1.1%2C%20SVG%20Export%20Plug-In%20.%20SVG%20Version%3A%206.00%20Build%200%29%20%20--%3E%0D%0A%3C%21DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%0D%0A%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0D%0A%09%20width%3D%2216px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2016%2016%22%20enable-background%3D%22new%200%200%2016%2016%22%20xml%3Aspace%3D%22preserve%22%3E%0D%0A%3Cpolyline%20fill%3D%22none%22%20stroke%3D%22%23FFFFFF%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22square%22%20stroke-miterlimit%3D%2210%22%20points%3D%225%2C8%207%2C10%2011%2C6%20%22%2F%3E%0D%0A%3C%2Fsvg%3E");
}
.vue-form input[type="radio"]:focus + label::before,
.vue-form input[type="checkbox"]:focus + label::before {
  box-shadow: 0 0 5px rgba(44, 151, 222, 0.6);
}
.vue-form input[type="radio"]:checked + label::after,
.vue-form input[type="checkbox"]:checked + label::after {
  display: block;
}
.vue-form input[type="radio"]:checked + label::before,
.vue-form input[type="radio"]:checked + label::after,
.vue-form input[type="checkbox"]:checked + label::before,
.vue-form input[type="checkbox"]:checked + label::after {
  animation: cd-bounce 0.3s;
}
.vue-form textarea {
  min-height: 120px;
  resize: vertical;
  overflow: auto;
}
.vue-form input[type="submit"] {
  border: none;
  background: #2c3e50;
  border-radius: 0.25em;
  padding: 12px 20px;
  color: #ffffff;
  font-weight: bold;
  float: right;
  cursor: pointer;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  appearance: none;
}
.no-touch .vue-form input[type="submit"]:hover {
  background: #42a2e1;
}
.vue-form input[type="submit"]:focus {
  outline: none;
  background: #2b3e51;
}
.vue-form input[type="submit"]:active {
  transform: scale(0.9);
}
.vue-form .error-message {
  height: 20px;
  margin: 0px;
}
.vue-form .error-message p {
  background: #ff8888;
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  border-radius: 0.25em;
  padding: 5px;
}
.vue-form .error {
  border-color: #e94b35 !important;
}
.vue-form .counter {
  border-radius: 0.25em;
  background-color: #ecf0f1;
  position: absolute;
  right: 0px;
  top: 0px;
  font-size: 10px;
  padding: 4px;
  color: #787878;
}
.logo {
  margin-left: 30%;
}
.debug {
  display: block;
  justify-content: center;
  align-content: center;
  border-radius: 4px;
  margin: 50px auto;
  width: 500px;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 30px;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);
  white-space: nowrap;
}

.debug pre p {
  color: #ff8888;
  font-size: 24px;
  line-height: 30px;
  font-family: "Source Code Pro", monospace;

  text-align: center;
}
.debug pre code {
  font-size: 18px;
  white-space: nowrap;
  font-family: monospace;
  white-space: pre-wrap;
}

@-webkit-keyframes cd-bounce {
  0%,
  100% {
    -webkit-transform: scale(1);
  }
  50% {
    -webkit-transform: scale(0.8);
  }
}
@-moz-keyframes cd-bounce {
  0%,
  100% {
    -moz-transform: scale(1);
  }
  50% {
    -moz-transform: scale(0.8);
  }
}
@keyframes cd-bounce {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
}

.reservation-form-title {
  color: black;
  size: 24x;
  text-align: center;
  font-weight: bold;
}
.form-option {
  font-size: 14px;
  padding: 8px 12px;
  height: 20px;
}
</style>
