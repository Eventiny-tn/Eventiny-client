<template>
  <header class="header-area overlay">
    <nav class="navbar navbar-expand-md navbar-dark">
      <div class="container">
        <a class="navbar-brand" href="/">
          <h3 class="my-heading ">Eventiny<span class="bg-main">TN</span></h3>
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
            <li><a href="#" class="nav-item nav-link active">Home</a></li>

            <li class="dropdown">
              <a href="#" class="nav-item nav-link" data-toggle="dropdown"
                >Events</a
              >
              <div class="dropdown-menu">
                <a href="#" class="dropdown-item">category 1</a>
                <a href="#" class="dropdown-item">category 2</a>
                <a href="#" class="dropdown-item">category 3</a>
              </div>
            </li>
            <li class="dropdown">
              <a href="#" class="nav-item nav-link" data-toggle="dropdown"
                >Profile</a
              >
              <div class="dropdown-menu">
                <a @click="goprofile()" href="#" class="dropdown-item">
                  <i class="far fa-user"></i> My Profile</a
                >
                <a href="#" class="dropdown-item">
                  <i class="fas fa-sign-out-alt"></i> Logout</a
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="banner">
      <div class="container">
        <h1>Start</h1>
        <p>
          Create Your Event
        </p>
        <a class="button button-primary">Go</a>
      </div>
    </div>
    <div>
      <main>
        <section id="content" class="content">
          <div class="container mt-40 mb-30">
            <h3 class="text-center">Events</h3>
            <div class="row mt-30">
              <div class="col-md-4 col-sm-6">
                <div class="box21">
                  <img
                    src="https://res.klook.com/image/upload/c_fill,w_750,h_500,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/2682fa96-Printball-game.jpg"
                    alt=""
                    class="event-img"
                  />
                  <div class="box-content">
                    <h4 class="title">willimson</h4>
                    <p class="description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed mattis augue in odio suscipit, at.
                    </p>
                    <a class="read-more" href="#">read more</a>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-6">
                <div class="box21">
                  <img
                    src="https://www.dubainight.com/images/upload/contenu/photos/2019/02/25/hiphopbanner-1-7909.jpg"
                    alt=""
                    class="event-img"
                  />
                  <div class="box-content">
                    <h4 class="title">Kristiana</h4>
                    <p class="description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed mattis augue in odio suscipit, at.
                    </p>
                    <a class="read-more" href="#">read more</a>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-6">
                <div class="box21">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt=""
                    class="event-img"
                  />
                  <div class="box-content">
                    <h4 class="title">David Guetta</h4>
                    <p class="description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed mattis augue in odio suscipit, at.
                    </p>
                    <a class="read-more" href="#">read more</a>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-6">
                <div class="box21">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt=""
                    class="event-img"
                  />
                  <div class="box-content">
                    <h4 class="title">Championship Chess</h4>
                    <p class="description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed mattis augue in odio suscipit, at.
                    </p>
                    <a class="read-more" href="#">read more</a>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-6">
                <div class="box21">
                  <img
                    src="https://res.klook.com/image/upload/c_fill,w_750,h_500,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/2682fa96-Printball-game.jpg"
                    alt=""
                    class="event-img"
                  />
                  <div class="box-content">
                    <h4 class="title">willimson</h4>
                    <p class="description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed mattis augue in odio suscipit, at.
                    </p>
                    <a class="read-more" href="#">read more</a>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-6">
                <div class="box21">
                  <img
                    src="https://www.dubainight.com/images/upload/contenu/photos/2019/02/25/hiphopbanner-1-7909.jpg"
                    alt=""
                    class="event-img"
                  />
                  <div class="box-content">
                    <h4 class="title">Kristiana</h4>
                    <p class="description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed mattis augue in odio suscipit, at.
                    </p>
                    <a class="read-more" href="#">read more</a>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-6">
                <div class="box21">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt=""
                    class="event-img"
                  />
                  <div class="box-content">
                    <h4 class="title">David Guetta</h4>
                    <p class="description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed mattis augue in odio suscipit, at.
                    </p>
                    <a class="read-more" href="#">read more</a>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-6">
                <div class="box21">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt=""
                    class="event-img"
                  />
                  <div class="box-content">
                    <h4 class="title">Championship Chess</h4>
                    <p class="description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed mattis augue in odio suscipit, at.
                    </p>
                    <a class="read-more" href="#">read more</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    goprofile() {
      this.$router.push("/Profile");
    },
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
}
.navbar-dark .navbar-nav .nav-link:focus,
.navbar-dark .navbar-nav .nav-link:hover {
  color: #fff;
}
.navbar .dropdown-menu {
  padding: 0;
  background-color: rgba(0, 0, 0, 0.9);
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
</style>
