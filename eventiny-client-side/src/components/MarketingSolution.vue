<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark">
      <div class="containernav">
        <a class="navbar-brand" @click="langingPage()">
          <h3 class="my-heading">Eventiny<span class="bg-main">TN</span></h3>
        </a>

        <button
          type="button"
          class="navbar-toggler collapsed"
          data-toggle="collapse"
          data-target="#main-nav"
        >
          <span class="menu-icon-bar"></span>
          <span class="menu-icon-bar"></span>
          <span class="menu-icon-bar"></span>
        </button>

        <div id="main-nav" class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <li>
              <a class="nav-item nav-link active" href="/GeneralPage">Home</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <br />
    <br />
    <br />
    <div class="testbox">
      <form action="/">
        <div class="banner">
          <h1>Sponsorise facebook page</h1>
        </div>
        <br />
        <fieldset>
          <div class="item">
            <label for="fname"> Facebook Page Name<span>*</span></label>
            <input id="fname" type="text" name="fname" required />
          </div>
          <div class="item">
            <label for="lname"> Facebook Page Link<span>*</span></label>
            <input id="lname" type="text" name="lname" required />
          </div>

          <select class="ui dropdown">
            <option value="">Price</option>
            <option value="1">50 Dt (2Days) </option>
            <option value="0">90 Dt (4Days) </option>
            <option value="0">120 Dt (1 Week) </option>
          </select>
          <img
            class="fbimg"
            src="https://s3-symbol-logo.tradingview.com/facebook--600.png"
          />
        </fieldset>
        <br />
        <div class="btn-block">
          <button @click="submit()" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: [],
    };
  },
  methods: {
    getUserInfo() {
      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      if (token == null) {
        this.$router.push("/");
        return;
      }
      axios
        .get("http://192.168.22.75:3000/verify", headers)
        .then(({ data }) => {
          console.log("==>", data);
          if (data.username !== undefined) {
            this.$data.data = data;
            // if (data.plannerDemand == true) {
            //   this.$router.push("/GeneralPage");
            // }
            return;
          } else {
            localStorage.removeItem("token");
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
        });
    },
    submit() {
      swal("Purshase has been done!", "success");
      this.$router.push("/GeneralPage");
    },
    onSubmitPlannerForm() {
      axios
        .patch("http://192.168.22.75:3000/plannerDemand/" + this.data.id, {})
        .then(({ data }) => {
          swal("Purshase has been done!", "success");
          this.$router.push("/GeneralPage");
        });
    },
  },
  created() {
    this.getUserInfo();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,700,800");
@import url("https://fonts.googleapis.com/css?family=Lobster");
html {
  font-size: 62.5%;
}
.fa-sign-out-alt {
  cursor: pointer;
}
body {
  font-family: "Kaushan Script", cursive;
  font-size: 1.6rem;
  font-weight: 400;
}
h1 {
  margin-bottom: 0.5em;
  font-size: 3.6rem;
}
p {
  margin-bottom: 0.5em;
  font-size: 1.6rem;
  line-height: 1.6;
}
.button {
  display: inline-block;
  margin-top: 20px;
  padding: 8px 25px;
  border-radius: 4px;
}
.button-primary {
  position: relative;
  background-color: #008ba3;
  color: #fff;
  font-size: 1.8rem;
  font-weight: 700;
  transition: color 0.3s ease-in;
  z-index: 1;
  cursor: pointer;
}
.button-primary:hover {
  color: #008ba3;
  background-color: #fff;
  text-decoration: none;
}
.button-primary::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background-color: #008ba3;
  border-radius: 4px;
  opacity: 0;
  -webkit-transform: scaleX(0.8);
  -ms-transform: scaleX(0.8);
  transform: scaleX(0.8);
  transition: all 0.3s ease-in;
  z-index: -1;
}
.button-primary:hover::after {
  opacity: 1;
  -webkit-transform: scaleX(1);
  -ms-transform: scaleX(1);
  transform: scaleX(1);
}
.overlay::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
.header-area {
  position: relative;
  height: 100vh;
  background: #5bc0de;
  background-attachment: fixed;
  background-position: center center;
  background-repeat: no-repear;
  background-size: cover;
}
.banner {
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
  color: #fff;
  text-align: center;
  z-index: 1;
  background-color: #1877f2;
  font-family: "Kaushan Script", cursive;
}
.banner h1 {
  font-weight: 800;
}
.banner p {
  font-weight: 700;
}
.navbar {
  position: absolute;
  background: rgba(77, 73, 73, 0.85);
  left: 0;
  top: 0;
  padding: 0;
  width: 100%;
  transition: background 0.6s ease-in;
  z-index: 99999;
}
.navbar .navbar-brand {
  font-family: "Kaushan Script", cursive;
  font-size: 2.5rem;
  cursor: pointer;
}
.navbar .navbar-toggler {
  position: relative;
  height: 50px;
  width: 50px;
  border: none;
  cursor: pointer;
  outline: none;
}
.navbar .navbar-toggler .menu-icon-bar {
  position: absolute;
  left: 15px;
  right: 15px;
  height: 2px;
  background-color: #fff;
  opacity: 0;
  -webkit-transform: translateY(-1px);
  -ms-transform: translateY(-1px);
  transform: translateY(-1px);
  transition: all 0.3s ease-in;
}
.navbar .navbar-toggler .menu-icon-bar:first-child {
  opacity: 1;
  -webkit-transform: translateY(-1px) rotate(45deg);
  -ms-sform: translateY(-1px) rotate(45deg);
  transform: translateY(-1px) rotate(45deg);
}
.navbar .navbar-toggler .menu-icon-bar:last-child {
  opacity: 1;
  -webkit-transform: translateY(-1px) rotate(135deg);
  -ms-sform: translateY(-1px) rotate(135deg);
  transform: translateY(-1px) rotate(135deg);
}
.navbar .navbar-toggler.collapsed .menu-icon-bar {
  opacity: 1;
}
.navbar .navbar-toggler.collapsed .menu-icon-bar:first-child {
  -webkit-transform: translateY(-7px) rotate(0);
  -ms-sform: translateY(-7px) rotate(0);
  transform: translateY(-7px) rotate(0);
}
.navbar .navbar-toggler.collapsed .menu-icon-bar:last-child {
  -webkit-transform: translateY(5px) rotate(0);
  -ms-sform: translateY(5px) rotate(0);
  transform: translateY(5px) rotate(0);
}

.navbar-dark .navbar-nav .nav-link {
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
}
.navbar-dark .navbar-nav .nav-link:focus,
.navbar-dark .navbar-nav .nav-link:hover {
  color: #fff;
  cursor: pointer;
}
.navbar .dropdown-menu {
  padding: 0;
  background-color: rgba(0, 0, 0, 0.9);
  cursor: pointer;
}
.navbar .dropdown-menu .dropdown-item {
  position: relative;
  padding: 10px 20px;
  font-family: "Kaushan Script", cursive;
  color: #fff;
  font-size: 1.4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: color 0.2s ease-in;
}
.navbar .dropdown-menu .dropdown-item:last-child {
  border-bottom: none;
}
.navbar .dropdown-menu .dropdown-item:hover {
  background: transparent;
  color: #008ba3;
}
.navbar .dropdown-menu .dropdown-item::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  top: 0;
  width: 5px;
  background-color: #008ba3;
  opacity: 0;
  transition: opacity 0.2s ease-in;
}
.navbar .dropdown-menu .dropdown-item:hover::before {
  opacity: 1;
}
.navbar.fixed-top {
  position: fixed;
  -webkit-animation: navbar-animation 0.6s;
  animation: navbar-animation 0.6s;
  background-color: rgba(77, 73, 73, 0.85);
}
.navbar.fixed-top.navbar-dark .navbar-nav .nav-link.active {
  color: #008ba3;
}
.navbar.fixed-top.navbar-dark .navbar-nav .nav-link::after {
  background-color: #008ba3;
}
.content {
  padding: 120px 0;
}
@media screen and (max-width: 768px) {
  .navbar-brand {
    margin-left: 20px;
  }
  .navbar-nav {
    padding: 0 20px;
    background-color: rgba(0, 0, 0, 0.9);
  }
  .navbar.fixed-top .navbar-nav {
    background: transparent;
  }
}
@media screen and (min-width: 767px) {
  .banner {
    padding: 0 150px;
  }
  .banner h1 {
    font-size: 5rem;
  }
  .banner p {
    font-size: 2rem;
  }
  .navbar-dark .navbar-nav .nav-link {
    padding: 23px 15px;
  }
  .navbar-dark .navbar-nav .nav-link::after {
    content: "";
    position: absolute;
    bottom: 15px;
    left: 30%;
    right: 30%;
    height: 1px;
    background-color: #fff;
    -webkit-transform: scaleX(0);
    -ms-transform: scaleX(0);
    transform: scaleX(0);
    transition: transform 0.1s ease-in;
  }
  .navbar-dark .navbar-nav .nav-link:hover::after {
    -webkit-transform: scaleX(1);
    -ms-transform: scaleX(1);
    transform: scaleX(1);
  }
  .dropdown-menu {
    min-width: 200px;
    -webkit-animation: dropdown-animation 0.3s;
    animation: dropdown-animation 0.3s;
    -webkit-transform-origin: top;
    -ms-transform-origin: top;
    transform-origin: top;
  }
}
@-webkit-keyframes navbar-animation {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-100%);
    -ms-transform: translateY(-100%);
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
}
@keyframes navbar-animation {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-100%);
    -ms-transform: translateY(-100%);
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
}
@-webkit-keyframes dropdown-animation {
  0% {
    -webkit-transform: scaleY(0);
    -ms-transform: scaleY(0);
    transform: scaleY(0);
  }
  75% {
    -webkit-transform: scaleY(1.1);
    -ms-transform: scaleY(1.1);
    transform: scaleY(1.1);
  }
  100% {
    -webkit-transform: scaleY(1);
    -ms-transform: scaleY(1);
    transform: scaleY(1);
  }
}
@keyframes dropdown-animation {
  0% {
    -webkit-transform: scaleY(0);
    -ms-transform: scaleY(0);
    transform: scaleY(0);
  }
  75% {
    -webkit-transform: scaleY(1.1);
    -ms-transform: scaleY(1.1);
    transform: scaleY(1.1);
  }
  100% {
    -webkit-transform: scaleY(1);
    -ms-transform: scaleY(1);
    transform: scaleY(1);
  }
}
h3.my-heading {
  font-family: "Kaushan Script", cursive;
  color: #fff;
  font-weight: bold;
  font-size: 30px;
  margin-top: 10px;
}
span.bg-main {
  color: #008ba3;
  margin-top: 10px;
}
/* Galery*/
.box21 {
  text-align: center;
  position: relative;
}
.box21:after,
.box21:before {
  content: "";
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.35);
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: scale(0);
  -moz-transform: scale(0);
  -ms-transform: scale(0);
  -o-transform: scale(0);
  transform: scale(0);
}
.box21:hover:after,
.box21:hover:before {
  -webkit-transform: scale(225);
  -moz-transform: scale(225);
  -ms-transform: scale(225);
  -o-transform: scale(225);
  transform: scale(225);
}
.box21:before {
  -o-transition: all 0.5s linear 0.3s;
  -moz-transition: all 0.5s linear 0.3s;
  -ms-transition: all 0.5s linear 0.3s;
  -webkit-transition: all 0.5s linear 0.3s;
  transition: all 0.5s linear 0.3s;
}
.box21:hover:before {
  -moz-transition-delay: 0s;
  -webkit-transition-delay: 0s;
  -o-transition-delay: 0s;
  -ms-transition-delay: 0s;
  transition-delay: 0s;
}
.box21:after {
  -o-transition: all 0.5s linear 0.6s;
  -moz-transition: all 0.5s linear 0.6s;
  -ms-transition: all 0.5s linear 0.6s;
  -webkit-transition: all 0.5s linear 0.6s;
  transition: all 0.5s linear 0.6s;
}
.box21:hover:after {
  -moz-transition-delay: 0.2s;
  -webkit-transition-delay: 0.2s;
  -o-transition-delay: 0.2s;
  -ms-transition-delay: 0.2s;
  transition-delay: 0.2s;
}

/**** deeeeeeeeeeeleetee */
html {
  font-size: 62.5%;
}

body {
  box-sizing: border-box;
  background: #222;
}

.row {
  max-width: 114rem;
  margin: 0 auto;
}
.row::after {
  content: "";
  clear: both;
  display: table;
}
.fbimg {
  width: 3.79%;
  height: 10%;
  margin-bottom: 3.5px;
  position: relative;
}
.row [class^="col-"] {
  float: left;
}
.row [class^="col-"]:not(:last-child) {
  margin-right: 6rem;
}
.row:not(:last-child) {
  margin-bottom: 6rem;
}
.row .col-1-of-2 {
  width: calc((100% - 6rem) / 2);
}
.row .col-1-of-3 {
  width: calc((100% - 2 * 6rem) / 3);
}
.row .col-1-of-4 {
  width: calc((100% - 3 * 6rem) / 4);
}
.row .col-2-of-4 {
  width: calc(2 * ((100% - 3 * 6rem) / 4) + 6rem);
}
.row .col-3-of-4 {
  width: calc(3 * ((100% - 3 * 6rem) / 4) + 2 * 6rem);
}

.section-tours {
  background-color: #f7f7f7;
}

.card {
  perspective: 150rem;
  -moz-perspective: 150rem;
  position: relative;
  height: 52rem;
}
.card__side {
  height: 52rem;
  transition: all 0.8s ease;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  backface-visibility: hidden;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.15);
}
.card__side--front {
  background-color: #fff;
}
.card__side--back {
  transform: rotateY(180deg);
}
.card__side--back-1 {
  background-image: linear-gradient(to right bottom, #ffb900, #ff7730);
}
.card__side--back-2 {
  background-image: linear-gradient(to right bottom, #000428, #004e92);
}
.card__side--back-3 {
  background-image: linear-gradient(to right bottom, #2998ff, #5643fa);
}
.card:hover .card__side--front {
  transform: rotateY(-180deg);
}
.card:hover .card__side--back {
  transform: rotateY(0);
}
.card__picture {
  background-size: cover;
  height: 23rem;
  background-blend-mode: screen;
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
}
.card__picture--1 {
  background-image: linear-gradient(to right bottom, #ffb900, #ff7730),
    url(https://picsum.photos/300/250?random=5);
}
.card__picture--2 {
  background-image: linear-gradient(to right bottom, #000428, #004e92),
    url(https://picsum.photos/300/250?random=6);
}
.card__picture--3 {
  background-image: linear-gradient(to right bottom, #2998ff, #5643fa),
    url(https://picsum.photos/300/250?random=7);
}
.card__heading {
  font-size: 2.8rem;
  text-transform: uppercase;
  color: #fff;
  font-weight: 300;
  position: absolute;
  top: 12rem;
  right: 2rem;
  text-align: right;
  width: 74%;
}
.card__heading-span {
  padding: 0.5rem 1.5rem;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}
.card__heading-span--1 {
  background-image: linear-gradient(
    to right bottom,
    rgba(255, 185, 0, 0.85),
    rgba(255, 119, 48, 0.85)
  );
}
.card__heading-span--2 {
  background-image: linear-gradient(
    to right bottom,
    rgba(0, 4, 40, 0.85),
    rgba(0, 78, 146, 0.85)
  );
}
.card__heading-span--3 {
  background-image: linear-gradient(
    to right bottom,
    rgba(41, 152, 255, 0.85),
    rgba(86, 67, 250, 0.85)
  );
}
.card__details {
  padding: 3rem;
}
.card__details ul {
  list-style: none;
  width: 80%;
  margin: 0 auto;
}
.card__details ul li {
  text-align: center;
  font-size: 1.5rem;
  padding: 1rem;
}
.card__details ul li:not(:last-child) {
  border-bottom: 1px solid #eee;
}
.card__cta {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.card__price-box {
  color: #fff;
  text-align: center;
  margin-bottom: 8rem;
}
.card__price-only {
  font-size: 1.4rem;
  text-transform: uppercase;
}
.card__price-value {
  font-size: 6rem;
  font-weight: 100;
}

.btn--animated {
  animation: fadeInUp 0.5s ease-out;
  animation-fill-mode: backwards;
}

.btn:link,
.btn:visited {
  text-transform: uppercase;
  padding: 1.5rem 4rem;
  display: inline-block;
  transition: all 0.2s;
  color: initial;
  position: relative;
  font-size: 1.6rem;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
}

.btn:active {
  transform: translateY(-1px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
}

.btn::after {
  content: "";
  display: inline-block;
  height: 100%;
  width: 100%;
  border-radius: 10rem;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  transition: all 0.2s;
}

.btn::after {
  background: #fff;
}

.btn:hover::after {
  transform: scaleX(1.4) scaleY(1.6);
  opacity: 0;
}

.btn--white {
  background-color: #fff;
  border-radius: 10rem;
}

.btn--blue {
  background-color: #004e92;
  border-radius: 10rem;
  color: #fff !important;
}

.text-center {
  text-align: center;
}

html,
body {
  height: 100%;
}
body,
input,
select {
  padding: 0;
  margin: 0;
  outline: none;
  font-family: Roboto, Arial, sans-serif;
  font-size: 16px;
  color: #eee;
}
h1,
h3 {
  font-weight: 400;
}
h1 {
  font-size: 32px;
}
h3 {
  color: #1c87c9;
}
.main-block,
.info {
  display: flex;
  flex-direction: column;
}
.main-block {
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  background: url("/uploads/media/default/0001/01/e7a97bd9b2d25886cc7b9115de83b6b28b73b90b.jpeg")
    no-repeat center;
  background-size: cover;
  margin-top: 200px;
}
form {
  width: 80%;
  padding: 25px;
  margin-bottom: 20px;
  background: rgba(0, 0, 0, 0.9);
}
input,
select {
  padding: 5px;
  margin-bottom: 20px;
  background: transparent;
  border: none;
  border-bottom: 1px solid #eee;
}
input::placeholder {
  color: #eee;
}
option {
  background: black;
  border: none;
}
.metod {
  display: flex;
}
input[type="radio"] {
  display: none;
}
label.radio {
  position: relative;
  display: inline-block;
  margin-right: 20px;
  text-indent: 32px;
  cursor: pointer;
}
label.radio:before {
  content: "";
  position: absolute;
  top: -1px;
  left: 0;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  border: 2px solid #1c87c9;
}
label.radio:after {
  content: "";
  position: absolute;
  width: 8px;
  height: 4px;
  top: 5px;
  left: 5px;
  border-bottom: 3px solid #1c87c9;
  border-left: 3px solid #1c87c9;
  transform: rotate(-45deg);
  opacity: 0;
}
input[type="radio"]:checked + label:after {
  opacity: 1;
}
button {
  display: block;
  width: 200px;
  padding: 10px;
  margin: 20px auto 0;
  border: none;
  border-radius: 5px;
  background: #1c87c9;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}
button:hover {
  background: #095484;
}
@media (min-width: 568px) {
  .info {
    flex-flow: row wrap;
    justify-content: space-between;
  }
  input {
    width: 46%;
  }
  input.fname {
    width: 100%;
  }
  select {
    width: 48%;
  }
}
html,
body {
  min-height: 100%;
}
body,
div,
form,
input,
select,
textarea,
label,
p {
  padding: 0;
  margin: 0;
  outline: none;
  font-family: Roboto, Arial, sans-serif;
  font-size: 14px;
  color: #666;
  line-height: 22px;
}
h1 {
  position: absolute;
  margin: 0;
  font-size: 38px;
  color: #fff;
  z-index: 2;
  line-height: 83px;
}
textarea {
  width: calc(100% - 12px);
  padding: 5px;
}
.testbox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
  padding: 20px;
  width: 50%;
  margin-left: 25%;
  margin-top: 5%;
}
form {
  width: 100%;
  padding: 20px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 0 8px #669999;
}
.banner {
  position: relative;
  height: 300px;
  background-image: url("/uploads/media/default/0001/02/174b2e72df50743dfaa0a3bf9d2e59d8b42c91e1.jpeg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.banner::after {
  content: "";
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  width: 100%;
  height: 100%;
}
input,
select,
textarea {
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
input {
  width: calc(100% - 10px);
  padding: 5px;
}
input[type="date"] {
  padding: 4px 5px;
}
textarea {
  width: calc(100% - 12px);
  padding: 5px;
}
.item:hover p,
.item:hover i,
.question:hover p,
.question label:hover,
input:hover::placeholder {
  color: #669999;
}
.item input:hover,
.item select:hover,
.item textarea:hover {
  border: 1px solid transparent;
  box-shadow: 0 0 3px 0 #669999;
  color: #669999;
}
.item {
  position: relative;
  margin: 10px 0;
}
.item span {
  color: red;
}
input[type="date"]::-webkit-inner-spin-button {
  display: none;
}
.item i,
input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  font-size: 20px;
  color: #a3c2c2;
}
.item i {
  right: 1%;
  top: 30px;
  z-index: 1;
}
[type="date"]::-webkit-calendar-picker-indicator {
  right: 1%;
  z-index: 2;
  opacity: 0;
  cursor: pointer;
}
input[type="radio"],
input[type="checkbox"] {
  display: none;
}
label.radio {
  position: relative;
  display: inline-block;
  margin: 5px 20px 15px 0;
  cursor: pointer;
}
.question span {
  margin-left: 30px;
}
.question-answer label {
  display: block;
}
label.radio:before {
  content: "";
  position: absolute;
  left: 0;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  border: 2px solid #ccc;
}
input[type="radio"]:checked + label:before,
label.radio:hover:before {
  border: 2px solid #669999;
}
label.radio:after {
  content: "";
  position: absolute;
  top: 6px;
  left: 5px;
  width: 8px;
  height: 4px;
  border: 3px solid #669999;
  border-top: none;
  border-right: none;
  transform: rotate(-45deg);
  opacity: 0;
}
input[type="radio"]:checked + label:after {
  opacity: 1;
}
.flax {
  display: flex;
  justify-content: space-around;
}
.btn-block {
  margin-top: 10px;
  text-align: center;
}
button {
  width: 150px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #1877f2;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}
button:hover {
  background: #1877f2;
}
@media (min-width: 568px) {
  .name-item,
  .city-item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .name-item input,
  .name-item div {
    width: calc(50% - 20px);
  }
  .name-item div input {
    width: 97%;
  }
  .name-item div label {
    display: block;
    padding-bottom: 5px;
  }
}
</style>
