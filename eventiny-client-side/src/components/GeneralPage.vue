<template :v-if="dataCategories">
  <header class="header-area overlay">
    <nav class="navbar navbar-expand-md navbar-dark">
      <div class="container">
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

            <li class="dropdown">
              <a class="nav-item nav-link" data-toggle="dropdown"> Events</a>
              <div class="dropdown-menu">
                <a
                  @click="getEventByCategory(category.id, false)"
                  v-for="category in dataCategories"
                  v-bind:key="category.id"
                  class="dropdown-item"
                  >{{ category.name }}
                </a>
              </div>
            </li>
            <li class="dropdown">
              <a class="nav-item nav-link" data-toggle="dropdown">Profile</a>
              <div class="dropdown-menu">
                <a @click="goprofile()" class="dropdown-item">
                  <i class="far fa-user"></i>Profile: {{ data.username }}</a
                >
                <a class="dropdown-item" @click="logOut()">
                  <i class="fas fa-sign-out-alt"></i> Logout</a
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div
      class=" banner header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style=" background-image: url(https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260) ; background-position: center top; opacity:0.7;"
    >
      <div class="container">
        <h1 class="getReady">Get ready</h1>
        <p>
          Good times are coming, and you're invited to create your Event
        </p>
        <a class="button button-primary">Start</a>
        <div class="col-md-12 text-center mt-5">
          <div class="scroll-down">
            <a
              class="btn btn-default btn-scroll floating-arrow"
              href="#gobottom"
              id="bottom"
              ><i class="fa fa-angle-down"></i
            ></a>
          </div>
        </div>
      </div>
    </div>
    <div>
      <main>
        <div v-if="onDetails === false">
          <section id="gobottom" class="content">
            <div class="container mt-40 mb-30">
              <h3 class="text-center">Events</h3>
              <div class="row mt-30">
                <div
                  class="col-md-4 col-sm-6"
                  v-for="event in dataEvents"
                  v-bind:key="event.id"
                >
                  <div class="box21">
                    <img v-bind:src="event.cover" class="event-img" />
                    <div class="box-content">
                      <h4 class="title">{{ event.name }}</h4>
                      <h6 class="title Location-date">
                        <i class="fas event-icons fa-map-marker-alt"></i
                        >{{ event.location }}
                        <span
                          ><i class="fas event-icons fa-calendar "></i>
                          {{ event.dateStart }}</span
                        >
                      </h6>
                      <p class="description">
                        {{ event.caption }}
                      </p>
                      <a class="read-more" @click="changeView(event, true)"
                        >read more</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <div v-if="onDetails == true">
        <div>
          <h1 class="my-heading">type here</h1>
        </div>
        <EventDetails :eventDetails="eventDetails" />
      </div>
      <div>
        <UpgradeToPremium />
      </div>
    </div>
  </header>
</template>

<script>
import axios from "axios";
import EventDetails from "./EventDetails.vue";
import UpgradeToPremium from "./UpgradeToPremium.vue";
export default {
  data() {
    return {
      data: [],
      isLogged: false,
      userinfo: {},
      dataCategories: [],
      dataEvents: [],
      onDetails: false,
      eventDetails: [],
    };
  },
  components: {
    EventDetails,
    UpgradeToPremium,
  },

  methods: {
    changeView(details = {}, value) {
      this.$data.onDetails = value;
      this.$data.eventDetails = details;
      // console.log("heeeeeeeeeeeeeeeeeeeeeeeeeey", details);
    },
    logOut() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
    goprofile() {
      this.$router.push("/Profile");
    },
    langingPage() {
      this.$router.push("/");
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
    getevents() {
      axios
        .get("http://localhost:3000/event")
        .then(({ data }) => {
          console.log("events ============>", data);
          this.$data.dataEvents = data;
        })
        .catch((err) => console.log(err));
    },
    getCategories() {
      axios.get("http://localhost:3000/category").then(({ data }) => {
        this.$data.dataCategories = data;
      });
    },
    getEventByCategory(id, value) {
      axios
        .get("http://localhost:3000/event/category/" + id)
        .then(({ data }) => {
          console.log("ikdem====>", data);
          this.$data.dataEvents = data;
          this.$data.onDetails = value;
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {},
  beforeMount() {
    this.getinfos();
    this.getCategories();
    this.getevents();
  },
};

jQuery(function($) {
  $(window).on("scroll", function() {
    if ($(this).scrollTop() >= 200) {
      $(".navbar").addClass("fixed-top");
    } else if ($(this).scrollTop() == 0) {
      $(".navbar").removeClass("fixed-top");
    }
  });

  function adjustNav() {
    var winWidth = $(window).width(),
      dropdown = $(".dropdown"),
      dropdownMenu = $(".dropdown-menu");

    if (winWidth >= 768) {
      dropdown.on("mouseenter", function() {
        $(this)
          .addClass("show")
          .children(dropdownMenu)
          .addClass("show");
      });

      dropdown.on("mouseleave", function() {
        $(this)
          .removeClass("show")
          .children(dropdownMenu)
          .removeClass("show");
      });
    } else {
      dropdown.off("mouseenter mouseleave");
    }
  }

  $(window).on("resize", adjustNav);

  adjustNav();
});
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
  background-color: #999999;
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
  font-family: "Kaushan Script", cursive;
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
  margin: 0;
}
span.bg-main {
  color: #008ba3;
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
/* .box21 img {
  width: 100%;
  height: auto;
} */
.box21 .box-content {
  margin-top: 3%;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: 0 0;
  color: #fff;
  padding-top: 25px;
  -webkit-transform: scale(0);
  -moz-transform: scale(0);
  -ms-transform: scale(0);
  -o-transform: scale(0);
  transform: scale(0);
  -ms-transition: all 0.3s linear 0s;
  -o-transition: all 0.3s linear 0s;
  -webkit-transition: all 0.3s linear 0s;
  -moz-transition: all 0.3s linear 0s;
  transition: all 0.3s linear 0s;
  z-index: 1;
}
.box21:hover .box-content {
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  -o-transform: scale(1);
  transform: scale(1);
  -moz-transition-delay: 0.4s;
  -webkit-transition-delay: 0.4s;
  -o-transition-delay: 0.4s;
  -ms-transition-delay: 0.4s;
  transition-delay: 0.4s;
}
.box21 .title {
  font-size: 21px;
  font-weight: 700;
  text-transform: uppercase;
  border-bottom: 1px solid #fff;
  padding-bottom: 20px;
  margin-top: 20px;
}
.box21 .description {
  font-size: 14px;
  font-style: italic;
  padding: 0 10px;
  margin: 15px 0;
}
.box21 .read-more {
  display: block;
  width: 120px;
  background: #178993;
  border-radius: 5px;
  font-size: 14px;
  color: #fff;
  text-transform: capitalize;
  padding: 10px 0;
  margin: 0 auto;
}
.event-img {
  width: 100%;
  height: 20em;
  object-fit: cover;
}
.col-sm-6 {
  margin-top: 2%;
}
.Location-date {
  font-size: 1em !important ;
  font-weight: 700 !important;
  color: #fff;
}
.event-icons {
  color: #178993;
  font-size: 1.5em !important;
  margin-right: 3%;
  margin-left: 3%;
}

@media only screen and (max-width: 990px) {
  .box21 {
    margin-bottom: 30px;
  }
}
@media only screen and (max-width: 479px) {
  .box21 .box-content {
    padding-top: 0;
  }
}
@media only screen and (max-width: 359px) {
  .box21 .title {
    padding-bottom: 10px;
  }
}

/* last */
.scroll-down {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 45px;
}
.floating-arrow {
  -webkit-animation: floating-arrow 1.6s infinite ease-in-out 0s;
  -o-animation: floating-arrow 1.6s infinite ease-in-out 0s;
  animation: floating-arrow 1.6s infinite ease-in-out 0s;
}
a.btn.btn-default.btn-scroll {
  border: 2px solid #fff;
  color: #fff;
  border-radius: 100%;
}
.getReady {
  color: #008ba3;
}
</style>
