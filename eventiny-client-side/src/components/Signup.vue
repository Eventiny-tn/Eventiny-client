<template>
  <div>
    <div
      class="carousel fade-carousel slide"
      data-ride="carousel"
      data-interval="4000"
      id="bs-carousel"
    >
      <!-- Overlay -->
      <div>
        <div class="container-signup">
          <div class="overlay">
            <div class="container">
              <div class="row">
                <div class="col-md-5 col-md-offset-3" style="margin-top: 10%">
                  <form class="form">
                    <h3 class="col_g">Sign up</h3>
                    <br />
                    <div class="form-group">
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          v-model="signup.username"
                          placeholder="Username..."
                        />
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        v-model="signup.firstname"
                        placeholder="First name..."
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        v-model="signup.lastname"
                        placeholder="Last name..."
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="email"
                        class="form-control"
                        v-model="signup.email"
                        placeholder="Email..."
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        class="form-control"
                        v-model="signup.password"
                        placeholder="Password... "
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        class="form-control"
                        v-model="signup.confirmPassword"
                        placeholder="Confirm pasword..."
                      />
                    </div>

                    <div class="form-group">
                      <button
                        @click.prevent="onSubmitSignup(signup)"
                        class="btn col-xs-4 submit_h"
                      >
                        Sign up
                      </button>
                    </div>
                    <br /><br />
                    <br /><br />

                    <a class="noaccount" @click="signin()"
                      >Have an Account ? Go login!</a
                    >
                    <br /><br />
                    <a class="col_g" id="home-signup">
                      Go back to
                      <strong @click="gohome()" id="cursor">Home</strong></a
                    >
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Wrapper for slides -->
      <div class="carousel-inner">
        <div class="item slides active">
          <div class="slide-1"></div>
        </div>
        <div class="item slides">
          <div class="slide-3"></div>
          <div class="hero">
            <hgroup>
              <h1>You Decide Who We Are</h1>
              <h3>Join Our Community</h3>
            </hgroup>
            <button class="btn btn-hero btn-lg" role="button">
              See all features
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
import axios from "axios";

export default {
  data() {
    return {
      signup: {
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  name: "Signup",
  methods: {
    signin() {
      this.$router.push("/Login");
    },
    gohome() {
      this.$router.push("/");
    },
    onSubmitSignup(signup) {
      let valarr = Object.values(signup);

      for (let i = 0; i < valarr.length; i++) {
        if (valarr[i] === "") {
          swal(
            "Please fill up all the informations",
            "Missing informations",
            "error"
          );
          return;
        }
      }
      if (
        signup.password === signup.confirmPassword &&
        signup.password !== "" &&
        signup.confirmPassword !== ""
      ) {
        axios
          .post("http://localhost:3000/signup", signup)
          .then(({ data }) => {
            if (data.message === "NOT FOUND") {
              swal("Username or email exist", "Please check again", "error");
              return;
            }
            localStorage.setItem("token", data.token);
            this.$router.push("/GeneralPage");
          })
          .catch((err) => {
            swal("Username or email exist", "Please check again", "error");
            console.log(err);
          });
      } else if (signup.password !== signup.confirmPassword) {
        swal("Password not match", "Put again your password  please!", "error");
      }
    },
  },
};
</script>

<style scoped>
a {
  color: #1985e2;
}
#home-signup {
  color: #887c7c !important;
  float: right !important;
  float: left !important;
}
#cursor {
  cursor: pointer;
}

.noaccount {
  color: #1985e2 !important;
  cursor: pointer;
}
.birthday {
  background-color: white;
  opacity: 0.8;
}
#dob {
  color: #887c7c !important;
}

.col_g {
  color: #887c7c;
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
  color: white;
}
.submit_h {
  color: #fff;
  background-color: #0067b8;
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

/**                 */
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
  opacity: 0.8;
  float: right !important;
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
  background-image: url("https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
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
