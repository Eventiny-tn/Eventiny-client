<template :v-if="dataCategories">
  <div class="addevent">
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
    <form class="ui form">
      <h1 class="title-basic">Basic Info</h1>
      <p>
        Name your event and explain to potential attendees why they absolutely
        need to come. <br />
        Add info highlighting its uniqueness.
      </p>
      <div class="field">
        <label>Event name</label>
        <div class="two field">
          <div class="fields">
            <input
              type="text"
              name="shipping[first-name]"
              placeholder="Event Name"
              v-model="event.name"
              class="c-inputs"
              id="eventname"
            />
          </div>
        </div>
      </div>
      <div class="field">
        <label>Caption</label>
        <div class="fields">
          <div class="twelve wide field">
            <input
              type="text"
              name="caption"
              placeholder="Event planner"
              v-model="event.caption"
              class="c-inputs"
            />
          </div>
        </div>
      </div>
      <div class="field">
        <label>Price</label>
        <div class="fields">
          <div class="twelve wide field">
            <input
              type="text"
              placeholder="Price"
              v-model="event.price"
              class="c-inputs"
            />
          </div>
        </div>
      </div>
      <div class="field">
        <label>Max tickets</label>
        <div class="fields">
          <div class="twelve wide field">
            <input
              type="number"
              placeholder="Max tickets"
              v-model="event.ticket"
              class="c-inputs"
            />
          </div>
        </div>
      </div>
      <div class="two fields"></div>

      <div class="field">
        <label>Event Category</label>

        <fieldset v-for="category in dataCategories" v-bind:key="category.id">
          <input
            type="checkbox"
            name="event.categorie"
            id="track"
            v-model="event.categories"
            v-bind:value="category.name"
          /><label for="track">{{ category.name }}</label
          ><br />
        </fieldset>
      </div>
      <form>
        <div>
          <label for="bday">Event date :</label>
          <input
            v-model="event.eventDate"
            type="date"
            id="bday"
            name="bday"
            class="c-inputs"
          />
        </div>
      </form>
      <label for="appt">Start time:</label>

      <input
        type="time"
        id="appt"
        name="appt"
        min="09:00"
        max="18:00"
        required
        v-model="event.dateStart"
        class="c-inputs"
      />

      <label for="appt">End time:</label>

      <input
        type="time"
        id="appt"
        name="appt"
        min="09:00"
        max="18:00"
        required
        v-model="event.dateEnds"
        class="c-inputs"
      />

      <small>24h/24h</small>

      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="form-group">
              <label id="locationlabel">Location:</label>
              <input
                id="searchinput"
                type="text"
                placeholder="Enter a location"
                v-model="event.location"
              />
            </div>
            <div id="map"></div>
          </div>
        </div>
      </div>
      <form enctype="multipart/form-data">
        Select cover image to upload:
        <input
          type="file"
          name="fileToUpload"
          id="fileToUpload"
          ref="file"
          v-on:change="handleFileUpload()"
          required
          :v-model="image"
        />
        <input type="submit" value="Upload Cover" name="submit" />
      </form>

      <form enctype="multipart/form-data">
        Select cover image to upload:
        <input
          type="file"
          name="fileToUpload"
          id="fileToUpload"
          ref="file"
          v-on:change="handleMultipleUpload()"
          required
          :v-model="images"
        />
        <input type="submit" value="Upload Cover" name="submit" />
      </form>

      <div class="form-group">
        <label id="description">Description:</label>
        <input
          type="text"
          placeholder="Enter a description"
          v-model="event.description"
        />
      </div>
    </form>

    <div @click="addEvent()" class="ui button" tabindex="0">Submit Order</div>
  </div>
</template>

<script>
import $Scriptjs from "scriptjs";
import axios from "axios";

export default {
  data() {
    return {
      dataCategories: [],
      data: [],
      event: {
        name: "",
        caption: "",
        price: "",
        ticket: 0,
        eventDate: "",
        dateStart: "",
        dateEnds: "",
        location: "",
        images: [],
        lat: "",
        lng: "",
        cover: "",
        description: "",
        categories: [],
        userId: 0,
      },
      image: "",
      images: "",
      container: [],
    };
  },

  methods: {
    handleMultipleUpload() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
      // Change the src attribute of the image to path
      if (this.file) {
        const images = new FormData();
        images.append("file", this.file);
        images.append("upload_preset", "lwsk5njh");
        axios
          .post(
            "https://api.cloudinary.com/v1_1/daakldabl/image/upload",
            images
          )
          .then(({ data }) => {
            console.log("imageId", data.url);
            this.$data.imagesUrl = data.url;
            console.log("===>", this.$data.imagesUrl);
            this.container.push(this.$data.imagesUrl);
          })
          .catch((err) => console.log(err));
      }
    },
    uploadPictureToDataBase() {
      if (this.$data.imageUrl) {
        console.log("this", this.$data.imageUrl);
        this.event.cover = this.$data.imageUrl;
        this.event.images = this.container;
      }
      console.log("clicked");
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
      // Change the src attribute of the image to path
      if (this.file) {
        const image = new FormData();
        image.append("file", this.file);
        image.append("upload_preset", "lwsk5njh");
        axios
          .post("https://api.cloudinary.com/v1_1/daakldabl/image/upload", image)
          .then(({ data }) => {
            console.log("imageId", data.url);
            this.$data.imageUrl = data.url;
            console.log("===>", this.$data.imageUrl);
          })
          .catch((err) => console.log(err));
      }
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
      axios
        .get("http://localhost:3000/profile", { headers: header })
        .then(({ data }) => {
          console.log("userinfo", data);
          this.$data.data = data;
          this.$data.event.userId = data.id;
          console.log("data userId", data);
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
    // getPlace() {
    //   var searchInput = "search_input";
    //   $(document).ready(function() {
    //     var autocomplete;
    //     autocomplete = new google.maps.places.Autocomplete(
    //       document.getElementById(searchInput),
    //       {
    //         types: ["geocode"],
    //       }
    //     );
    //   });
    // },
    addEvent(event) {
      this.uploadPictureToDataBase();
      console.log("event===>", this.event);
      axios
        .post("http://localhost:3000/event", this.event)
        .then((res) => {
          if (res) {
            console.log(res);
            swal("Thank you for adding your event", "Thank you", "success");
            return;
          }
        })
        .catch((err) => {
          swal("Something wrong", "Something wrong", "error");
          console.log(err);
        });
    },

    getCategories() {
      axios.get("http://localhost:3000/category").then(({ data }) => {
        console.log(data);
        this.$data.dataCategories = data;
      });
      console.log(this.dataCategories);
    },

    initMap() {
      var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 36.806389, lng: 11.181667 },
        zoom: 8,
      });
      var input = document.getElementById("searchinput");
      var autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.bindTo("bounds", map);

      var infowindow = new google.maps.InfoWindow();
      var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29),
      });

      autocomplete.addListener("place_changed", () => {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
          window.alert("Autocomplete's returned place contains no geometry");
          return;
        }

        // mark place:
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(13);
        }
        //adding coordonate:
        this.$data.event.lng = place.geometry.viewport.La.g;
        this.$data.event.lat = place.geometry.viewport.Ra.g;

        marker.setIcon({
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(35, 35),
        });

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        //getting place full name
        var address = "";
        if (place.address_components) {
          address = [
            (place.address_components[0] &&
              place.address_components[0].short_name) ||
              "",
            (place.address_components[1] &&
              place.address_components[1].short_name) ||
              "",
            (place.address_components[2] &&
              place.address_components[2].short_name) ||
              "",
          ].join(" ");
        }
        //adding address:

        this.$data.event.location = address;
        console.log(this.event.location);

        infowindow.setContent("<div><strong>" + place.name + "</strong><br>");
        infowindow.open(map, marker);

        //Location details
        for (var i = 0; i < place.address_components.length; i++) {
          if (place.address_components[i].types[0] == "postal_code") {
            document.getElementById("postal_code").innerHTML =
              place.address_components[i].long_name;
          }
          if (place.address_components[i].types[0] == "country") {
            document.getElementById("country").innerHTML =
              place.address_components[i].long_name;
          }
        }
        document.getElementById("location").innerHTML = place.formatted_address;
        document.getElementById(
          "lat"
        ).innerHTML = place.geometry.location.lat();
        document.getElementById(
          "lon"
        ).innerHTML = place.geometry.location.lng();
      });
    },
  },
  mounted() {
    this.getinfos();
    this.getCategories();
    $Scriptjs(
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=AIzaSyDapTrWdHVdzoF7ttygRmfv0XqIDkonBqg&callback=initMap",
      () => {
        this.initMap();
      }
    );
  },
};
</script>

<style scoped>
#map {
  height: 100%;
  width: 50%;
  margin-bottom: 150px;
}
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 80%;
}
#searchinput {
  font-size: 18px;
  width: 555px;
  margin-top: 14px;
  margin-right: 900px !important;
}
#eventname {
  width: 670px !important;
}
#locationlabel {
  margin-right: 560px;
}
.fields {
  margin-left: 620px !important;
  width: 900px;
}
.c-inputs {
  width: 100% !important;
}
.title-basic {
  color: #008ba3;
}
.form {
  margin-top: 100px;
}
.addevent {
  text-align: center;
}
.col-lg-12 {
  margin-bottom: 350px;
}
.form-group {
  margin-bottom: 10px;
  margin-top: 50px;
}
.container {
  margin-left: 650px;
}
.form-group label {
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
}
.form-group input {
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

.form-group input:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,700,800");
@import url("https://fonts.googleapis.com/css?family=Lobster");
html {
  font-size: 62.5%;
}
.fa-sign-out-alt {
  cursor: pointer;
}
body {
  /* font-family: "Kaushan Script", cursive;   */
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
.controls {
  margin-right: 500px;
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

.pb-100 {
  padding-bottom: 100px;
}
.pt-100 {
  padding-top: 100px;
}
a {
  text-decoration: none;
}
.section-title h4 {
  font-size: 14px;
  font-weight: 500;
  color: #777;
}
.section-title h2 {
  font-size: 32px;
  text-transform: capitalize;
  margin: 15px 0;
  display: inline-block;
  position: relative;
  font-weight: 700;
  padding-bottom: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.section-title p {
  font-weight: 300;
  font-size: 14px;
}
.black-bg .section-title h2,
.black-bg .section-title h4,
.black-bg .section-title p {
  color: #fff;
}
.section-title h2:before {
  position: absolute;
  content: "";
  width: 150px;
  height: 1px;
  background-color: #777;
  bottom: 0;
  left: 50%;
  margin-left: -75px;
}
.section-title h2:after {
  position: absolute;
  content: "";
  width: 80px;
  height: 3px;
  background-color: #008ba3;
  border: darkblue;
  bottom: -1px;
  left: 50%;
  margin-left: -40px;
}
.section-title {
  margin-bottom: 70px;
}
.single-price {
  text-align: center;
  padding: 30px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
}
.price-title h4 {
  font-size: 24px;
  text-transform: uppercase;
  font-weight: 600;
}
.price-tag {
  margin: 30px 0;
}
.price-tag {
  margin: 30px 0;
  background-color: #fafafa;
  color: #000;
  padding: 10px 0;
}
.center.price-tag {
  background-color: #008ba3;
  color: #fff;
}
.price-tag h2 {
  font-size: 45px;
  font-weight: 600;
  font-family: poppins;
}
.price-tag h2 span {
  font-weight: 300;
  font-size: 16px;
  font-style: italic;
}
.price-item ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.price-item ul li {
  font-size: 14px;
  padding: 5px 0;
  border-bottom: 1px dashed #eee;
  margin: 5px 0;
}
.price-item ul li:last-child {
  border-bottom: 0;
}
.single-price a {
  margin-top: 15px;
}
a.box-btn {
  background-color: #008ba3;
  padding: 5px 20px;
  display: inline-block;
  color: #fff;
  text-transform: capitalize;
  border-radius: 3px;
  font-size: 15px;
  transition: 0.3s;
}
a.box-btn:hover,
a.border-btn:hover {
  background-color: #008ba3;
}
</style>
