<template>
  <div>
    <div
      class="carousel fade-carousel slide"
      data-ride="carousel"
      data-interval="4000"
      id="bs-carousel"
    >
      <!-- Overlay -->
      <div class="overlay">
        <div class="container">
          <div class="row">
            <div class="col-md-5 col-md-offset-3" style="margin-top: 10%;">
              <form class="form">
                <h3 class="col_g">Sign in</h3>
                <br />
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    v-model="login.email"
                    placeholder="Email..."
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    v-model="login.password"
                    placeholder="Enter Password Here"
                  />
                </div>

                <div class="form-group" @click.prevent="onSubmitLogin(login)">
                  <button class="btn col-xs-4 submit_h">
                    Login
                  </button>
                </div>
                <br /><br />
                <div @click="googleLogin()">
                  <button class="ui google plus button">
                    <i class="google icon"></i>
                    Google Plus
                  </button>
                </div>
                <br /><br />

                <a class="noaccount" @click="signup()"
                  >No Account ? Create One!</a
                >
                <br /><br />
                <a class="col_g" id="home-login">
                  Go back to
                  <strong @click="gohome()" id="cursor">Home</strong></a
                >
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Wrapper for slides -->
      <div class="carousel-inner">
        <div class="item slides active">
          <div class="slide-1"></div>
          <div class="hero"></div>
        </div>
        <div class="item slides">
          <div class="slide-2"></div>
          <div class="hero"></div>
        </div>
        <div class="item slides">
          <div class="slide-3"></div>
          <div class="hero"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import swal from "sweetalert";

export default {
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    googleLogin() {
      // let route = this.$router.resolve(
      //   { path: "/googleAuth" },
      //   window.open(route, "http://localhost:3000")
      // );
      // window.open(routeData.href, "http://localhost:3000");
      window.open("http://localhost:3000");
    },
    onSubmitLogin(login) {
      if (login.email == "" || login.password == "") {
        swal(
          "Please fill up all the informations",
          "Missing informations",
          "error"
        );
      } else {
        axios
          .post("http://localhost:3000/login", login)
          .then(({ data }) => {
            console.log("==>", data);
            if (data.token === undefined) {
              localStorage.removeItem("token");
              swal(
                "sorry no user with these informations",
                "wrong informations",
                "error"
              );
              return;
            } else if (data.token !== undefined) {
              localStorage.setItem("token", data.token);
              this.$router.push("/GeneralPage");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    signup() {
      this.$router.push("/Signup");
    },
    gohome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
a {
  color: #1985e2;
}
#home-login {
  color: #887c7c !important;
  float: right !important;
  float: left !important;
}
#cursor {
  cursor: pointer;
  color: #008ba3;
}
.row {
  background-color: white;
  margin-top: 80px;
  width: 70%;
  margin-left: 620px;
  border-radius: 5px;
  margin-top: 200px;
}

.col-md-5 {
  background-color: white;
  margin-bottom: 50px;
  text-align: center;
  margin-left: 160px;
  color: black;
}
.noaccount {
  color: #008ba3 !important;
  cursor: pointer;
}
.container {
  position: relative;
  float: left;
  width: 800px;
}
.col_g {
  color: #008ba3;
}
.form-control {
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 1px;
  box-shadow: none;
  background: none;
}
.form-control:focus {
  color: black;
}
.submit_h {
  color: #fff;
  background-color: #008ba3;
}
.login_footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #353434d1;
  color: white;
  text-align: center;
  padding: 10px;
}
.login_footer li {
  float: right;
}
.login_footer ul {
  list-style: none;
}
.login_footer li a {
  padding: 0px 10px;
  color: white;
}
/********************************/
/*       Fade Bs-carousel       */
/********************************/
.fade-carousel {
  position: relative;
  height: 100vh;
}
.fade-carousel .carousel-inner .item {
  height: 100vh;
}
.fade-carousel .carousel-indicators > li {
  margin: 0 2px;
  background-color: #f39c12;
  border-color: #f39c12;
  opacity: 0.7;
}
.fade-carousel .carousel-indicators > li.active {
  width: 10px;
  height: 10px;
  opacity: 1;
}
/********************************/
/*          Hero Headers        */
/********************************/
.hero {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 3;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.75);
  -webkit-transform: translate3d(-50%, -50%, 0);
  -moz-transform: translate3d(-50%, -50%, 0);
  -ms-transform: translate3d(-50%, -50%, 0);
  -o-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
}
.hero h1 {
  font-size: 6em;
  font-weight: bold;
  margin: 0;
  padding: 0;
}
.fade-carousel .carousel-inner .item .hero {
  opacity: 0;
  -webkit-transition: 2s all ease-in-out 0.1s;
  -moz-transition: 2s all ease-in-out 0.1s;
  -ms-transition: 2s all ease-in-out 0.1s;
  -o-transition: 2s all ease-in-out 0.1s;
  transition: 2s all ease-in-out 0.1s;
}
.fade-carousel .carousel-inner .item.active .hero {
  opacity: 1;
  -webkit-transition: 2s all ease-in-out 0.1s;
  -moz-transition: 2s all ease-in-out 0.1s;
  -ms-transition: 2s all ease-in-out 0.1s;
  -o-transition: 2s all ease-in-out 0.1s;
  transition: 2s all ease-in-out 0.1s;
}
/********************************/
/*            Overlay           */
/********************************/
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: #080d15;
  opacity: 0.88;
}
/********************************/
/*          Custom Buttons      */
/********************************/
.btn.btn-lg {
  padding: 10px 40px;
}
.btn.btn-hero,
.btn.btn-hero:hover,
.btn.btn-hero:focus {
  color: #f5f5f5;
  background-color: #1abc9c;
  border-color: #1abc9c;
  outline: none;
  margin: 20px auto;
}
/********************************/
/*       Slides backgrounds     */
/********************************/
.fade-carousel .slides .slide-1,
.fade-carousel .slides .slide-2,
.fade-carousel .slides .slide-3 {
  height: 100vh;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.fade-carousel .slides .slide-1 {
  background-image: url("https://media-exp1.licdn.com/dms/image/C4D1BAQGRCL25mnKg7g/company-background_10000/0/1519798430700?e=2159024400&v=beta&t=yhScNxZXfaHO-eXQqzpIGWNRVeVJA77np3n587d7z4o");
}
.fade-carousel .slides .slide-2 {
  background-image: url("https://images.pexels.com/photos/2240763/pexels-photo-2240763.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
}
.fade-carousel .slides .slide-3 {
  background-image: url("https://images.pexels.com/photos/1549196/pexels-photo-1549196.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
}
/********************************/
/*          Media Queries       */
/********************************/
@media screen and (min-width: 980px) {
  .hero {
    width: 980px;
  }
}
@media screen and (max-width: 640px) {
  .hero h1 {
    font-size: 4em;
  }
}
</style>
