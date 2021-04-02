<template>
  <div>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark">
      <div class="container">
        <a class="navbar-brand" href="/">
          <h3 class="my-heading ">Eventiny<span class="bg-main">TN</span></h3>
        </a>
        <p></p>
        <button
          class="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="fa fa-bars mfa-white"></span>
        </button>

        <div id="main">
          <a href="javascript:void(0)" class="openNav"
            ><span class="fa fa-bars" @click="openNav()"></span
          ></a>
        </div>

        <div id="mySidenav" class="sidenav">
          <a href="javascript:void(0)" class="closebtn" @click="closeNav()"
            >×</a
          >
          <ul class="mob-ul">
            <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="#">About</a></li>

            <li class="nav-item"><a class="nav-link" href="#">Events</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Groups</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Music</a></li>

            <li
              class="nav-item"
              @click.prevent="signin()"
              v-if="isLogged == false"
            >
              <a class="nav-link">Sign in</a>
            </li>
            <li
              class="nav-item"
              @click.prevent="signup()"
              v-if="isLogged == false"
            >
              <a class="nav-link">Sign up</a>
            </li>
            <li class="nav-item" @click.prevent="feed()" v-if="isLogged">
              <a class="nav-link">Feed</a>
            </li>
          </ul>
        </div>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-link " id="loginbtn" v-if="isLogged == false">
              <a @click.prevent="signin()">Sign in</a>
            </li>
            <li class="nav-link" id="loginbtn" v-if="isLogged == false">
              <a id="signupbtns" @click.prevent="signup()">Get started</a>
            </li>
            <li
              class="nav-item"
              id="loginbtn"
              @click.prevent="gosolution()"
              v-if="isLogged"
            >
              <a class="nav-link" id="signupbtn">Marketing solution</a>
            </li>
            <li
              class="nav-item"
              id="loginbtn"
              @click.prevent="feed()"
              v-if="isLogged"
            >
              <a class="nav-link" id="signupbtn">Feed</a>
            </li>
            <li
              class="nav-item"
              id="loginbtn"
              v-if="isLogged"
              @click="profile()"
            >
              <a class="nav-link" id="signupbtn">{{ userinfo.username }}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <header class="masthead text-white ">
      <div class="overlay">
        <section>
          <div class="overlay-wcs"></div>
          <video
            playsinline="playsinline"
            autoplay="autoplay"
            muted="muted"
            loop="loop"
          >
            <source src="../assets/backgroundtn.mp4" type="video/mp4" />
          </video>
          <!-- <div class="container h-100">
            <div class="d-flex h-100 text-center align-items-center"></div>
          </div> -->
        </section>
      </div>

      <div class="container slider-top-text">
        <div v-if="isLogged == false" class="row">
          <div class="col-md-12 text-center">
            <h3 class="my-heading">
              WELCOME TO Eventiny<span class="bg-main">TN</span>
            </h3>
            <p class="myp-slider text-center">
              Where people unite and become better together
            </p>
            <p class="myp text-center">
              FIND THE BEST EVENTS   |   CONNECT WITH OTHERS   |   HAVE FUN
              MEETING OTHERS
            </p>
            <a class="btn btn-primary btn-join" @click.prevent="signup()"
              >JOIN THE COMMUNITY</a
            >
          </div>
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
    </header>

    <section class="testimonials" id="gobottom" v-if="latestEvent">
      <div class="container">
        <div class="row">
          <div class="col-md-4 mb-3 wow bounceInUp" data-wow-duration="1.4s">
            <h1><span class="bg-main">Recent Event</span></h1>
            <div class="big-img" v-if="latestEvent.cover">
              <img :src="latestEvent.cover" class="img-fluid" />
            </div>
          </div>
          <div class="col-md-8">
            <div class="inner-section wow fadeInUp">
              <h3>
                {{ latestEvent.user?.firstname }}:
                <span class="bg-main"> {{ latestEvent.name }}</span>
              </h3>
              <br />
              <p class="text-justify">
                {{ latestEvent.caption }}
              </p>

              <div class="linear-grid">
                <div class="row">
                  <div
                    class=" col-sm-6 col-md-3 mb-2 wow bounceInUp"
                    data-wow-duration="1.4s"
                    v-for="(event, i) in latestEvent.images"
                    :key="i"
                  >
                    <img :src="event.image" class="img-thumbnail" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="testimonials mybg-events">
      <div class="container">
        <div class="row">
          <div class="col-md-12 wow fadeInUp">
            <h3 class="title-heading text-center">EventinyTN EVENTS</h3>
            <p class="myp text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
        <div class="row wow slideInLeft" data-wow-duration="3s">
          <div class="col-md-4 mb-3">
            <div class="big-img2">
              <img
                src="https://images.pexels.com/photos/167527/pexels-photo-167527.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                class="img-fluid"
              />
            </div>
          </div>
          <div class="col-md-8">
            <div class="inner-section">
              <div class="my-grid">
                <div class="row">
                  <div class="col-sm-6 col-md-4 mb-3">
                    <img
                      src="https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                      class="img-fluid"
                    />
                  </div>
                  <div class="col-sm-6 col-md-8 mb-3 ">
                    <img
                      src=" https://images.pexels.com/photos/164693/pexels-photo-164693.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                      class="img-fluid"
                    />
                  </div>

                  <div class="col-md-8 mb-3">
                    <div class="text-block">
                      <h5 class="events-heading">
                        Lorem ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </h5>
                      <p class="myp-font">
                        contrary to popular belief, Lorem Ipsum is simply dummy
                        text of the printing and typesetting industry. Lorem
                        Ipsum has been the industry's standard dummy text ever
                        since the 1500s, when an unknown printer took a galley
                        of type and scrambled it to make a type specimen book
                        and more recently with desktop publishing software like
                        Aldus PageMaker.
                      </p>
                    </div>
                  </div>
                  <div class=" col-md-4 ">
                    <img
                      src="https://images.pexels.com/photos/1150837/pexels-photo-1150837.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                      class="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="testimonials text-center">
      <div class="container">
        <div class="row">
          <div class="col-md-8 mx-auto wow fadeInUp">
            <h3 class="text-center font-weight-bold">
              JOIN EVENTINY<span class="bg-main">Tn</span> EVENT PLANNERS
            </h3>
            <p class=" text-center">
              At EVENTINY<span class="bg-main">Tn</span>, we have a wide variety
              of event planners from across the globe planning super special
              events from musical festival and private parties to surfing and
              camping events. Take a look at our event planners available this
              period, and check out the events they have been organizing!
            </p>
          </div>
        </div>
        <div class="row">
          <div
            class="col-sm-6 col-md-4 col-lg-3 mt-4 wow bounceInUp"
            data-wow-duration="1.4s"
            v-for="(planner, i) in eventPlanner"
            :key="i"
          >
            <div class="card">
              <img class="card-img-top" :src="planner.userimg" />
              <div class="card-block">
                <h4 class="card-title text-center">
                  <strong>
                    <span class="bg-main">{{ planner.firstname }}</span></strong
                  >
                </h4>

                <div class="card-text text-center">
                  <!-- <div class="social-icons">
                    <a href="#" class="btn btn-circle my-social-btn fb"
                      ><i class="fa fa-facebook"></i
                    ></a>
                    <a href="#" class="btn btn-circle my-social-btn twitter"
                      ><i class="fa fa-twitter"></i
                    ></a>
                    <a href="#" class="btn btn-circle my-social-btn google"
                      ><i class="fa fa-google"></i
                    ></a>
                  </div> -->
                </div>
              </div>
              <div class="card-footer text-center">
                <small
                  >Lorem Ipsum is simply dummy text of the printing and
                  typesetting</small
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="testimonials text-center mybg-music">
      <div class="container">
        <div class="row">
          <div class="col-md-12 wow fadeInUp">
            <h3 class="title-heading text-center font-weight-bold">
              EventinyTn LATEST Event
            </h3>
            <p class="myp text-center">
              Here is some of the latest event
            </p>
          </div>
        </div>
        <div class="row">
          <div
            class="col-sm-6 col-md-4 col-lg-2 mt-4 gal-item wow bounceInUp"
            data-wow-duration="1.4s"
          >
            <div class="music-gal item box">
              <a
                href="https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                class="fancybox"
                rel="ligthbox"
              >
                <img
                  class="img-fluid"
                  src="../assets/images/business-event/pexels-photo-1684149.jpeg"
                />
              </a>
            </div>
          </div>
          <div
            class="col-sm-6 col-md-4 col-lg-2 mt-4 gal-item wow bounceInUp"
            data-wow-duration="1.4s"
          >
            <div class="music-gal item box">
              <a
                href="https://pbs.twimg.com/profile_images/704747899750629376/anYFUGY3.jpg"
                class="fancybox"
                rel="ligthbox"
              >
                <img
                  class="img-fluid"
                  src="../assets/images/business-event/pexels-photo-3182759.jpeg"
                />
              </a>
            </div>
          </div>
          <div
            class="col-sm-6 col-md-4 col-lg-2 mt-4 gal-item wow bounceInUp"
            data-wow-duration="1.4s"
          >
            <div class="music-gal item box">
              <a
                href="https://pbs.twimg.com/profile_images/704747899750629376/anYFUGY3.jpg"
                class="fancybox"
                rel="ligthbox"
              >
                <img
                  class="img-fluid"
                  src="../assets/images/business-event/pexels-photo-3321795.jpeg"
                />
              </a>
            </div>
          </div>
          <div
            class="col-sm-6 col-md-4 col-lg-2 mt-4 gal-item wow bounceInUp"
            data-wow-duration="1.4s"
          >
            <div class="music-gal item box">
              <a
                href="https://images.pexels.com/photos/164693/pexels-photo-164693.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                class="fancybox"
                rel="ligthbox"
              >
                <img
                  class="img-fluid"
                  src="../assets/images/conference/pexels-photo-207691.jpeg"
                />
              </a>
            </div>
          </div>
          <div
            class="col-sm-6 col-md-4 col-lg-2 mt-4 gal-item wow bounceInUp"
            data-wow-duration="1.4s"
          >
            <div class="music-gal item box">
              <a
                href="https://images.pexels.com/photos/876713/pexels-photo-876713.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                class="fancybox"
                rel="ligthbox"
              >
                <img
                  class="img-fluid"
                  src="../assets/images/conference/pexels-photo-6476778.jpeg"
                />
              </a>
            </div>
          </div>
          <div
            class="col-sm-6 col-md-4 col-lg-2 mt-4 gal-item wow bounceInUp"
            data-wow-duration="1.4s"
          >
            <div class="music-gal item box">
              <a class="fancybox" rel="ligthbox">
                <img
                  class="img-fluid"
                  src="../assets/images/conference/pexels-photo-1708936.jpeg"
                />
              </a>
            </div>
          </div>
          <div
            class="col-sm-6 col-md-4 col-lg-2 mt-4 gal-item wow bounceInUp"
            data-wow-duration="1.4s"
          >
            <div class="music-gal item box">
              <a class="fancybox" rel="ligthbox">
                <img
                  class="img-fluid"
                  src="https://images.pexels.com/photos/5922322/pexels-photo-5922322.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                />
              </a>
            </div>
          </div>
          <div
            class="col-sm-6 col-md-4 col-lg-2 mt-4 gal-item wow bounceInUp"
            data-wow-duration="1.4s"
          >
            <div class="music-gal item box">
              <a class="fancybox" rel="ligthbox">
                <img
                  class="img-fluid"
                  src="https://images.pexels.com/photos/6804605/pexels-photo-6804605.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                />
              </a>
            </div>
          </div>
          <div
            class="col-sm-6 col-md-4 col-lg-2 mt-4 gal-item wow bounceInUp"
            data-wow-duration="1.4s"
          >
            <div class="music-gal item box">
              <a class="fancybox" rel="ligthbox">
                <img
                  class="img-fluid"
                  src="https://images.pexels.com/photos/6774141/pexels-photo-6774141.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                />
              </a>
            </div>
          </div>
          <div
            class="col-sm-6 col-md-4 col-lg-2 mt-4 gal-item wow bounceInUp"
            data-wow-duration="1.4s"
          >
            <div class="music-gal item box">
              <a class="fancybox" rel="ligthbox">
                <img
                  class="img-fluid"
                  src="https://images.pexels.com/photos/7234241/pexels-photo-7234241.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                />
              </a>
            </div>
          </div>
          <div
            class="col-sm-6 col-md-4 col-lg-2 mt-4 gal-item wow bounceInUp"
            data-wow-duration="1.4s"
          >
            <div class="music-gal item box">
              <a
                href="https://images.pexels.com/photos/167626/pexels-photo-167626.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                class="fancybox"
                rel="ligthbox"
              >
                <img
                  class="img-fluid"
                  src="https://images.pexels.com/photos/167626/pexels-photo-167626.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                />
              </a>
            </div>
          </div>
          <div
            class="col-sm-6 col-md-4 col-lg-2 mt-4 gal-item wow bounceInUp"
            data-wow-duration="1.4s"
          >
            <div class="music-gal item box">
              <a
                href="https://images.pexels.com/photos/167527/pexels-photo-167527.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                class="fancybox"
                rel="ligthbox"
              >
                <img
                  class="img-fluid"
                  src="https://images.pexels.com/photos/167527/pexels-photo-167527.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="testimonials bg-light" id="marketplace">
      <div class="container">
        <div class="row">
          <div class="col-md-8 mx-auto wow fadeInUp">
            <h3 class="text-center font-weight-bold">
              Eventiny<span class="bg-main">Tn</span> MARKET PLACE
            </h3>
            <p class=" text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
        </div>
        <div class="row">
          <div
            class="col-sm-6 col-md-4 col-lg-4 mt-4 wow bounceInUp"
            data-wow-duration="1.4s"
          >
            <div class="card">
              <img
                class="card-img-top h-262"
                src="https://images.pexels.com/photos/449627/pexels-photo-449627.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              />
              <div class="card-block">
                <h4 class="card-title">Lorem Ipsum Dolor Site Amet</h4>

                <div class="card-text">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's.
                  </p>
                </div>
              </div>
              <div class="card-footer">
                <small>$ 170</small>
                <a href="#" class="pull-right">More Info</a>
              </div>
            </div>
          </div>
          <div
            class="col-sm-6 col-md-4 col-lg-4 mt-4 wow bounceInUp"
            data-wow-duration="1.4s"
          >
            <div class="card">
              <img
                class="card-img-top h-262"
                src="https://images.pexels.com/photos/56005/fiji-beach-sand-palm-trees-56005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              />
              <div class="card-block">
                <h4 class="card-title">Lorem Ipsum Dolor Site Amet</h4>

                <div class="card-text">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's.
                  </p>
                </div>
              </div>
              <div class="card-footer">
                <small>$ 170</small>
                <a href="#" class="pull-right">More Info</a>
              </div>
            </div>
          </div>

          <div
            class="col-sm-6 col-md-4 col-lg-4 mt-4 wow bounceInUp"
            data-wow-duration="1.4s"
          >
            <div class="card">
              <img
                class="card-img-top h-262"
                src="https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              />
              <div class="card-block">
                <h4 class="card-title ">Lorem Ipsum Dolor Site Amet</h4>

                <div class="card-text ">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's.
                  </p>
                </div>
              </div>
              <div class="card-footer">
                <small>$ 170</small>
                <a href="#" class="pull-right">More Info</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="testimonials text-center ">
      <div class="container">
        <div class="row">
          <div class="col-md-8 mx-auto wow fadeInUp">
            <h3 class="text-center font-weight-bold">
              Eventiny<span class="bg-main">Tn</span> FEATURED
            </h3>
            <p class=" text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
        </div>
        <div class="row">
          <div
            class="col-sm-6 col-md-4 col-lg-6 mt-4 wow bounceInUp"
            data-wow-duration="1.4s"
          >
            <div class="big-img-3">
              <img
                src="https://images.pexels.com/photos/4514032/pexels-photo-4514032.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                class="img-fluid"
              />
            </div>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-6 mt-4">
            <div class="my-right-text wow fadeInUp">
              <p class="text-justify font-italic">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets.
                remaining essentially unchanged. It was popularised in the 1960s
                with the release of Letraset sheets containing Lorem Ipsum
                passages, Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown.
              </p>

              <a href="#" class="link-color">Eventiny</a>
              <p class="text-muted">name of the event</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <br /><br />

    <footer class="footer bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 text-center text-lg-left my-auto  wow zoomIn">
            <ul class="list-inline mb-2">
              <li class="list-inline-item">
                <a href="#">About</a>
              </li>
              <li class="list-inline-item">⋅</li>
              <li class="list-inline-item">
                <a href="#">Contact</a>
              </li>
              <li class="list-inline-item">⋅</li>
              <li class="list-inline-item">
                <a href="#">Terms of Use</a>
              </li>
              <li class="list-inline-item">⋅</li>
              <li class="list-inline-item">
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
            <p class="text-muted small mb-4 mb-lg-0">
              © EventinyTn 2021. All Rights Reserved.
            </p>
          </div>
          <div class="col-lg-6 text-center text-lg-right my-auto  wow zoomIn">
            <ul class="list-inline mb-0">
              <li class="list-inline-item mr-3">
                <a href="#">
                  <i class="fa fa-facebook fa-2x fa-fw"></i>
                </a>
              </li>
              <li class="list-inline-item mr-3">
                <a href="#">
                  <i class="fa fa-twitter fa-2x fa-fw"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#">
                  <i class="fa fa-instagram fa-2x fa-fw"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import $ from "jquery";
import axios from "axios";

export default {
  data() {
    return {
      latestEvent: {},
      eventPlanner: {},
      userinfo: "",
      isLogged: false,
    };
  },
  created() {
    this.getTheLastestEvent();
    this.getEventPlanner();
  },
  beforeMount() {
    this.getUserInfo();
  },
  mounted() {
    this.animations();
  },

  methods: {
    getEventPlanner() {
      axios.get("http://localhost:3000/eventPlanners").then(({ data }) => {
        this.eventPlanner = data.slice(0, 4);
      });
    },
    getTheLastestEvent() {
      axios
        .get("http://localhost:3000/event/latestEvent")
        .then(({ data }) => {
          this.latestEvent = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
        .get("http://localhost:3000/verify", headers)
        .then(({ data }) => {
          console.log("==>", data);
          if (data.username !== undefined) {
            this.$data.isLogged = true;
            this.$data.userinfo = data;
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
    gosolution() {
      this.$router.push("/MarketingSolution");
    },
    feed() {
      this.$router.push("/GeneralPage");
    },
    profile() {
      this.$router.push("/profile");
    },
    signin() {
      console.log("clicked");
      this.$router.push("/Login");
    },
    signup() {
      this.$router.push("/Signup");
    },
    openNav() {
      document.getElementById("mySidenav").style.width = "250px";
      document.getElementById("main").style.display = "0";
      document.body.style.backgroundColor = "white";
    },

    closeNav() {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginRight = "0";
      document.body.style.backgroundColor = "white";
    },
    load() {
      $(window).scroll(function() {
        var topWindow = $(window).scrollTop();
        var topWindow = topWindow * 1.5;
        var windowHeight = $(window).height();
        var position = topWindow / windowHeight;
        position = 1 - position;

        $("#bottom").css("opacity", position);
      });
    },
    animations() {
      $(function() {
        $("#bottom").click(function() {
          if (
            location.pathname.replace(/^\//, "") ==
              this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
          ) {
            var target = $(this.hash);
            target = target.length
              ? target
              : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
              $("html,body").animate(
                {
                  scrollTop: target.offset().top,
                },
                500
              );
              return false;
            }
          }
        });
      });
    },
  },
};
</script>
<style scoped>
.navbar-brand {
  margin-right: 5em !important;
  /* background-color: transparent; */
}
section {
  position: relative;
  height: 75vh;
  min-height: 25rem;
  width: 100%;
  overflow: hidden;
}

section video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: 0;
  -ms-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}

section .container {
  position: relative;
  z-index: 2;
}

section .overlay-wcs {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0.5;
  z-index: 1;
}

body {
  font-family: "Open Sans", sans-serif !important;
  background: #fff;
  color: #222;
}

#signupbtn {
  background-color: none !important;
  color: white !important;
  font-size: 17px;
}

#loginbtn {
  font-size: 15px;
  border-radius: 2%;
  color: white;
  cursor: pointer;
}
#loginbtn:hover {
  background-color: #008ba3;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.signupcss {
  border: 1px solid block;
}
.navbar-dark {
  opacity: 0.85;
  background-color: #343a40;
}

.navbar-shrink {
  padding-top: 0;

  padding-bottom: 0;
}
.mybg-dark {
  background: #000000 !important;
}
.fa-bars {
  cursor: pointer;
}

header.masthead {
  position: relative;
  height: 78vh;
  background-color: white;
  /* background: url("https://images.pexels.com/photos/1267350/pexels-photo-1267350.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
    no-repeat center center; */
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  /* padding-top: 8rem;
  padding-bottom: 8rem; */
}

header.masthead .overlay {
  position: absolute;
  background-color: white;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  opacity: 0.8;
  padding: 0;
}

@media (min-width: 768px) {
  header.masthead {
    padding-top: 0;
    padding-bottom: 0;
  }
  header.masthead h3 {
    font-size: 4rem;
  }
}

.testimonials {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

.myform-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

button.btn.btn-light {
  position: absolute;
  background: transparent;
  border: none;
  height: 38px;
  right: 23px;
}

a.btn.btn-default.btn-scroll {
  border: 2px solid #fff;
  color: #fff;
  border-radius: 100%;
}

.big-img img {
  height: 325px;
  width: 100%;
  object-fit: cover;
}

.inner-section {
  position: relative;
}
.container.slider-top-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.btn-login {
  width: 138px;
  color: white !important;
  background: transparent !important;
  border: 0px !important;
  height: 38px;
  padding: 5px;
  font-size: 20px;
}
.btn-login:hover {
  background: #3683a1 !important;
  border: 1px solid #1fc6d8 !important;
}
.mfa-white {
  color: #fff !important;
}

h3.my-heading {
  font-family: "Kaushan Script", cursive;
  color: #fff;
  font-weight: bold;
  font-size: 30px;
  margin: 0;
}

p.myp-slider.text-center {
  color: #fff;
}

.btn-register {
  width: 138px;
  background: #1fc6d8 !important;
  border: 1px solid #1fc6d8 !important;
}

.btn-register:hover {
  background: #3683a1 !important;
  border: 1px solid #1fc6d8 !important;
}

.btn-join {
  background: #1fc6d8 !important;
  border: 1px solid #1fc6d8 !important;
}

section#about {
  width: 100%;
  padding-top: 2.1rem;
  padding-bottom: 2.1rem;
}

.btn-circle {
  border-radius: 50%;
}

.my-social-btn {
  background: lightgrey;
}

.card:hover .my-social-btn.fb {
  background: #205b9f;
}
.card:hover .my-social-btn.twitter {
  background: #00ace3;
}
.card:hover .my-social-btn.google {
  background: #ff3921;
}
/*
a.btn.btn-circle.my-social-btn.fb:hover {
    background: #205b9f;
}

a.btn.btn-circle.my-social-btn.twitter:hover {
    background: #00ace3;
}

a.btn.btn-circle.my-social-btn.google:hover {
    background: #ff3921;
}
*/
a.btn.btn-circle.my-social-btn {
  color: #fff;
  height: 40px;
  width: 40px;
}

.inner-section h3 {
  text-transform: uppercase;
  font-weight: bold;
}

.inner-section h3:after {
  content: "";
  position: absolute;
  border-bottom: 4px solid #008ba3;
  width: 100%;
  max-width: 10%;
  top: 37px;
  left: 0;
}
span.bg-main {
  color: #008ba3;
}

hr.my-border {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 2px solid #008ba3;
  width: 117px;
}

.linear-grid img {
  width: 100%;
  height: 124px;
  object-fit: cover;
}
a:hover {
  text-decoration: none;
}
.section-padding {
  padding: 60px 0;
}
.bottom {
  background-color: #0a1c2e;
}
.bottom .copyright {
  color: #e5e5e5;
  font-weight: 600;
}
.copyright a {
  color: #f2ff49;
  margin-left: 3px;
  padding-right: 3px;
}
.bottom p {
  margin-bottom: 0;
  line-height: 50px;
  font-size: 16px;
  font-weight: 400;
}
.copyright p span {
  color: #d1caca;
}
.bottom .copyright p,
.bottom .copyright a:hover {
  color: #6c6d83;
}
.mybg-events {
  background: url("../assets/images/photo-1507608869274-d3177c8bb4c7.jpeg")
    no-repeat center center fixed;
  background-size: cover;
}

.h-262 {
  height: 262px !important;
}
.navbar {
  margin-bottom: 0 !important;
}

h3.title-heading.text-center {
  color: #fff;
  font-weight: bold;
}

p.myp.text-center {
  color: #fff;
  font-size: 14px;
  margin-bottom: 3rem;
}

.big-img2 img {
  height: 472px;
  width: 100%;
  object-fit: cover;
}

.my-grid img {
  height: 228px;
  width: 100%;
  object-fit: cover;
}

.text-block {
  min-height: 228px;
  height: auto;
  background: #fff;
  padding: 15px;
}

h5.events-heading {
  font-weight: bold;
  font-size: 17px;
}

p.myp-font {
  font-size: 15px;
}

section#group {
  background: #fff;
  height: 100%;
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.card {
  font-size: 1em;
  overflow: hidden;
  padding: 0;
  border: none !important;
  border-radius: 0.28571429rem;
}

.card:hover {
  color: #222 !important;
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
}

.card-block {
  font-size: 1em;
  position: relative;
  margin: 0;
  padding: 1em;
  border: none !important;
  border-top: 1px solid rgba(34, 36, 38, 0.1);
  box-shadow: none;
}

.card-img-top {
  display: block;
  width: 100%;
  height: 220px;
}

.card-title {
  font-size: 1.28571429em;
  font-weight: 700;
  line-height: 1.2857em;
}

.card-text {
  clear: both;
  margin-top: 0.5em;
  color: rgba(0, 0, 0, 0.68);
}

.card-footer {
  font-size: 1em;
  position: static;
  top: 0;
  left: 0;
  max-width: 100%;
  padding: 0.75em 1em;
  color: rgba(0, 0, 0, 0.4);
  border-top: 1px solid rgba(0, 0, 0, 0.05) !important;
  background: #fff;
}

.card-inverse .btn {
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.mybg-music {
  background: url("https://images.pexels.com/photos/6430743/pexels-photo-6430743.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
    no-repeat center center fixed;
  background-size: cover;
}

section#marketplace {
  background: #f7f7f7;
  height: 100%;
  width: 100%;
  padding-top: 5rem;
  padding-bottom: 5rem;
}

section#marketplace .card {
  font-size: 1em;
  overflow: hidden;
  padding: 0;
  border: none;
  border-radius: 0.28571429rem;
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
}

section#artist {
  background: #fff;
  height: 100%;
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

a.link-color {
  color: #008ba3;
  font-weight: bold;
}

.my-right-text {
  padding-top: 3rem;
}

/***music gallery***/

.gal-item {
  overflow: hidden;
}
.gal-item .box {
  overflow: hidden;
}
.box img {
  height: 160px;
  width: 100%;
  object-fit: cover;
  -o-object-fit: cover;
}
/****/
.item {
  position: relative;
}
.item img {
  max-width: 100%;
  -moz-transition: all 0.3s;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.item:hover img {
  -moz-transform: scale(1.4);
  -webkit-transform: scale(1.4);
  transform: scale(1.4);
}

/*sidebar navigation*/
.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 0px;
  font-size: 36px;
  margin-right: 15px;
}
#main {
  display: none;
}
#main {
  float: right;
  transition: margin-right 0.5s;
}
a.openNav {
  font-size: 26px;
  color: #ffffff;
  text-decoration: none;
}
.sidenav .nav-link {
  font-size: 13px;
  font-weight: bold;
}
.mob-ul {
  list-style-type: none;
  padding-left: 0;
}
.sidenav li {
  padding: 0 3px !important;
  position: relative;
}
.sidenav li a {
  padding: 10px 15px;
  text-transform: uppercase;
}
.sidenav ul li:hover .nav-link {
  color: #008ba3;
}

li.nav-item a:hover {
  background: #008ba3;
  color: #ffffff !important;
}

.floating-arrow {
  -webkit-animation: floating-arrow 1.6s infinite ease-in-out 0s;
  -o-animation: floating-arrow 1.6s infinite ease-in-out 0s;
  animation: floating-arrow 1.6s infinite ease-in-out 0s;
}

@keyframes floating-arrow {
  from {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  65% {
    -webkit-transform: translateY(11px);
    transform: translateY(11px);
  }
  to {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

footer.footer {
  padding-top: 4rem;
  padding-bottom: 4rem;
}

li.list-inline-item a {
  color: #fff;
  text-decoration: none;
}

/*-------------------responsive-----------------*/

@media screen and (max-width: 520px) {
  ::placeholder {
    font-size: 10px;
  }
  .scroll-down {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 45px;
  }

  .text-block {
    padding: 15px;
  }
  .linear-grid img {
    width: 100%;
    height: 181px;
  }
  .my-grid img {
    width: 100%;
  }
}
@media screen and (max-width: 767px) {
  .btn-login {
    width: 100%;
  }
  .btn-register {
    width: 100%;
  }
}

@media only screen and (min-width: 2560px) {
}
@media only screen and (min-width: 1600px) and (max-width: 1920px) {
  .navbar-toggler {
    display: none !important;
  }
}
@media only screen and (min-width: 1440px) {
  .navbar-toggler {
    display: none !important;
  }
}
@media only screen and (max-width: 1280px) {
  .navbar-toggler {
    display: none !important;
  }
}
@media only screen and (max-width: 1024px) {
  .navbar-toggler {
    display: none !important;
  }
  .mob-ul {
    list-style-type: none;
    padding-left: 0;
  }
  h5.events-heading {
    font-size: 15px;
  }
  p.myp-font {
    font-size: 13px;
  }
}
@media only screen and (min-width: 960px) and (max-width: 1023px) {
  .navbar-toggler {
    display: none !important;
  }
  .mob-ul {
    list-style-type: none;
    padding-left: 0;
  }
}

@media only screen and (min-width: 768px) and (max-width: 959px) {
  .navbar-toggler {
    display: none !important;
  }
  #main {
    display: block;
  }
  .header-wrap .navbar .nav-link {
    color: #fff;
  }
  .mob-ul {
    list-style-type: none;
    padding-left: 0;
  }
  .header-wrap .sub-menu {
    width: 250px;
  }
}

@media only screen and (max-width: 736px) and (orientation: landscape) {
  .navbar-toggler {
    display: none !important;
  }
  #main {
    display: block;
  }
  .header-wrap .navbar .nav-link {
    color: #fff;
  }
  .mob-ul {
    list-style-type: none;
    padding-left: 0;
  }
  .header-wrap .sub-menu {
    width: 250px;
  }
}
@media only screen and (max-width: 667px) and (orientation: landscape) {
  .navbar-toggler {
    display: none !important;
  }
  #main {
    display: block;
  }
  .header-wrap .navbar .nav-link {
    color: #fff;
  }
  .mob-ul {
    list-style-type: none;
    padding-left: 0;
  }
  .header-wrap .sub-menu {
    width: 250px;
  }
}
@media only screen and (max-width: 568px) and (orientation: landscape) {
  .navbar-toggler {
    display: none !important;
  }
  #main {
    display: block;
  }
  .header-wrap .navbar .nav-link {
    color: #fff;
  }
  .mob-ul {
    list-style-type: none;
    padding-left: 0;
  }
  .header-wrap .sub-menu {
    width: 250px;
  }
}
@media only screen and (min-width: 600px) and (max-width: 767px) {
  h5.events-heading {
    font-size: 20px;
  }
  p.myp-font {
    font-size: 15px;
  }
  .navbar-toggler {
    display: none !important;
  }
  #main {
    display: block;
  }
  .header-wrap .navbar .nav-link {
    color: #fff;
  }
  .mob-ul {
    list-style-type: none;
    padding-left: 0;
  }
  .header-wrap .sub-menu {
    width: 250px;
  }
  .box img {
    height: 100%;
  }
}
@media only screen and (min-width: 480px) and (max-width: 599px) {
  .inner-section h3 {
    font-size: 18px;
  }
  h5.events-heading {
    font-size: 15px;
  }
  .inner-section p {
    font-size: 13px;
    text-align: justify;
  }
  section#marketplace img {
    object-fit: cover;
  }
  .navbar-toggler {
    display: none !important;
  }
  #main {
    display: block;
  }
  .header-wrap .navbar .nav-link {
    color: #fff;
  }
  .mob-ul {
    list-style-type: none;
    padding-left: 0;
  }
  .header-wrap .sub-menu {
    width: 250px;
  }
  .box img {
    height: 100%;
  }
}
@media only screen and (min-width: 321px) and (max-width: 479px) {
  .inner-section h3 {
    font-size: 18px;
  }
  h5.events-heading {
    font-size: 15px;
  }
  .inner-section p {
    font-size: 13px;
    text-align: justify;
  }
  section#marketplace img {
    object-fit: cover;
  }
  .navbar-toggler {
    display: none !important;
  }
  #main {
    display: block;
  }
  .header-wrap .navbar .nav-link {
    color: #fff;
  }
  .mob-ul {
    list-style-type: none;
    padding-left: 0;
  }
  .header-wrap .sub-menu {
    width: 250px;
  }
  .box img {
    height: 100%;
  }
}
@media only screen and (max-width: 568px) and (orientation: landscape) {
  .navbar-toggler {
    display: none !important;
  }
  #main {
    display: block;
  }
  .header-wrap .navbar .nav-link {
    color: #fff;
  }
  .mob-ul {
    list-style-type: none;
    padding-left: 0;
  }
  .header-wrap .sub-menu {
    width: 250px;
  }
  .box img {
    height: 100%;
  }
}
@media only screen and (max-width: 320px) {
  .inner-section h3 {
    font-size: 18px;
  }
  h5.events-heading {
    font-size: 15px;
  }
  .inner-section p {
    font-size: 13px;
    text-align: justify;
  }
  section#marketplace img {
    object-fit: cover;
  }
  .navbar-toggler {
    display: none !important;
  }
  #main {
    display: block;
  }
  .header-wrap .navbar .nav-link {
    color: #fff;
  }
  .mob-ul {
    list-style-type: none;
    padding-left: 0;
  }
  .header-wrap .sub-menu {
    width: 250px;
  }
  .box img {
    height: 100%;
  }
}</style
>>
