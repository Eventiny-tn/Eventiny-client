<template>
  <div class="eventDetailContainer">
    <div
      id="thumbnail-preview-indicators"
      class="carousel slide"
      data-ride="carousel"
    >
      <!-- Indicators -->
      <ol class="carousel-indicators">
        <li
          data-target="#thumbnail-preview-indicators"
          data-slide-to="0"
          class="active"
        >
          <div class="thumbnail">
            <img
              class="img-responsive"
              v-bind:src="eventDetails.images[0].image"
            />
          </div>
        </li>
        <li data-target="#thumbnail-preview-indicators" data-slide-to="1">
          <div class="thumbnail">
            <img
              class="img-responsive"
              v-bind:src="eventDetails.images[1].image"
            />
          </div>
        </li>
        <li data-target="#thumbnail-preview-indicators" data-slide-to="2">
          <div class="thumbnail">
            <img
              class="img-responsive"
              v-bind:src="eventDetails.images[2].image"
            />
          </div>
        </li>
      </ol>
      <div class="carousel-inner">
        <div class="item slides active">
          <div
            class="slide-1"
            :style="{
              backgroundImage: 'url(' + eventDetails.images[0].image + ')',
            }"
          ></div>
          <div class="container"></div>
        </div>
        <div class="item slides">
          <div
            class="slide-2"
            :style="{
              backgroundImage: 'url(' + eventDetails.images[1].image + ')',
            }"
          ></div>
          <div class="container">
            <div class="carousel-caption"></div>
          </div>
        </div>
        <div class="item slides">
          <div
            class="slide-3"
            :style="{
              backgroundImage: 'url(' + eventDetails.images[2].image + ')',
            }"
          ></div>
          <div class="container">
            <div class="carousel-caption"></div>
          </div>
        </div>
      </div>
      <a
        class="left carousel-control"
        href="#thumbnail-preview-indicators"
        role="button"
        data-slide="prev"
        ><span class="glyphicon glyphicon-chevron-left"></span
      ></a>
      <a
        class="right carousel-control"
        href="#thumbnail-preview-indicators"
        role="button"
        data-slide="next"
        ><span class="glyphicon glyphicon-chevron-right"></span
      ></a>
    </div>

    <div class="container detail-event">
      <div class="row">
        <!-- HEADER -->

        <!-- INFO -->

        <div class="row">
          <div class="col-xs-12">
            <h4 style="line-height: 25px;">
              {{ eventDetails.name.toUpperCase() }}
            </h4>
          </div>
        </div>
        <div class="row row-eq-height" style="padding-right:15px">
          <div class="col-xs-9 text">
            <p>
              {{ eventDetails.caption.toUpperCase() }}
            </p>

            <h2 class="semi-title">Title</h2>
            <p>{{ eventDetails.description }}</p>

            <!-- Event Comment must be here -->
            <div>
              <!-- Comments Container-->
              <!-- :v-for="comment in comments"
              <Comment :comment="comment"/>  -->
              <EventComment
                :comments="comments"
                :userinfo="userinfo"
                :eventDetails="eventDetails"
              />
            </div>
            <br />
            <br />
            <br />
          </div>
          <!-- Sidebar // advertising -->
          <div class="col-xs-3 side">
            <img
              style="max-width: 100%"
              v-bind:src="eventDetails.cover"
              alt="Photograph"
            />

            <small>
              <p style="margin-bottom:0px;" class="detail-title">
                <b>{{ eventDetails.user.username }}</b>
              </p>
              <div class="statistics">
                <p>
                  <span class="label label-default detail-event">
                    Tickets :{{ eventDetails.ticket }}</span
                  >
                </p>
                <p>
                  <span class="label label-default detail-event"
                    >You puchase {{ ticketsBuy.quantity }} / 10 tickets</span
                  >
                </p>
                <input
                  type="number"
                  name="tentacles"
                  min="1"
                  v-bind:max="10 - ticketsBuy.quantity"
                  v-model="tickets"
                />
                <button
                  type="button"
                  class="btn btn-success"
                  @click="clickadd()"
                >
                  Reserve
                </button>
              </div>
              <p style="margin-bottom:0px;margin-top:25px;">
                <b>Location</b>
              </p>
              <ul class="list-group">
                <li id="map"></li>
              </ul>
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import $Scriptjs from "scriptjs";
import EventComment from "./EventComment.vue";
export default {
  components: {
    EventComment,
  },
  data() {
    return {
      ticketsBuy: {
        quantity: 0,
      },
      tickets: 1,
      comments: [],
      userinfo: {},
    };
  },
  props: {
    eventDetails: {
      type: Object,
    },
    // userinfo: {
    //   type: Object,
    // },
  },
  methods: {
    getEventComment() {
      setInterval(() => {
        axios
          .get("http://localhost:3000/comments/" + this.eventDetails.id)
          .then(({ data }) => {
            this.$data.comments = data;
            console.log("comments==>>", this.comments);
          })
          .catch((err) => console.log(err));
      }, 2000);
    },

    clickadd() {
      axios
        .post(
          `http://localhost:3000/ticket/${this.userinfo.id}/${this.eventDetails.id}`,
          { quantity: this.$data.tickets }
        )
        .then(console.log("done"))
        .catch((err) => {
          console.log(err);
        });
    },

    initMap() {
      var map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: 36.86249448797207,
          lng: 10.33179298996273,
        },
        zoom: 13,
      });
      var marker = new google.maps.Marker({
        position: {
          lat: 36.86249448797207,
          lng: 10.33179298996273,
        },
        map: map,
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
          if (data !== undefined) {
            this.$data.isLogged = true;
            this.$data.userinfo = data;
            this.getParticipant();
            return;
          } else {
            localStorage.removeItem("token");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getParticipant() {
      axios
        .get(
          `http://localhost:3000/participant/${this.userinfo.id}/${this.eventDetails.id}`
        )
        .then(({ data }) => {
          console.log("-------------------------------------------->", data);
          if (data[0].quantity !== undefined) {
            console.log("paaaaaaaaaaaarticepent", data);
            this.$data.ticketsBuy = data[0];
          } else {
            console.log("daaaaaaaaaaaaaaaaatttttttttaaaaaaaaaaaaa");
          }
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.getUserInfo();
    this.getEventComment();
  },
  beforeMount() {},
  mounted() {
    console.log("user: ", this.userinfo);
    $Scriptjs(
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=AIzaSyDapTrWdHVdzoF7ttygRmfv0XqIDkonBqg&callback=initMap",
      () => {
        this.initMap();
        // this.getPlace();
      }
    );
  },
};
</script>
<style scoped>
.eventDetailContainer {
  display: block;
  justify-content: center;
  align-content: center;
  background-color: #eeeeee;
}
.detail-event {
  margin-top: 3%;
}
.detail-event {
  font-size: 15px;
}
.detail-title {
  font-size: 30px;
}
#map {
  height: 150px;
  width: 100%;
}
#thumbnail-preview-indicato detail-eventrs {
  position: relative;
  overflow: hidden;
}
#thumbnail-p detail-eventreview-indicators .slides .slide-1,
#thumbnail-preview-indicators .slides .slide-2,
#thumbnail-preview-indicators .slides .slide-3 {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
#thumbnail-preview-indicators,
#thumbnail-preview-indicators .slides,
#thumbnail-preview-indicators .slides .slide-1,
#thumbnail-preview-indicators .slides .slide-2,
#thumbnail-preview-indicators .slides .slide-3 {
  height: 480px;
}

#thumbnail-preview-indicators .carousel-inner .item .carousel-caption {
  top: 20%;
  bottom: inherit;
}
#thumbnail-preview-indicators .carousel-indicators li,
#thumbnail-preview-indicators .carousel-indicators li.active {
  position: relative;
  width: 100px;
  height: 8px;
}
#thumbnail-preview-indicators .carousel-indicators li > .thumbnail {
  position: absolute;
  top: 0;
  width: 100px;
  display: none;
  opacity: 0;
  left: 50%;
  margin-top: -80px;
  margin-left: -50px;
}
#thumbnail-preview-indicators .carousel-indicators li:hover > .thumbnail,
#thumbnail-preview-indicators .carousel-indicators li.active > .thumbnail {
  display: block;
  opacity: 0.8;
}
#thumbnail-preview-indicators
  .carousel-indicators
  li.active
  > .thumbnail:hover {
  opacity: 1;
}
@media screen and (max-width: 480px) {
  #thumbnail-preview-indicators .carousel-indicators li,
  #thumbnail-preview-indicators .carousel-indicators li.active {
    width: 50px;
    height: 8px;
    position: relative;
  }
  #thumbnail-preview-indicators .carousel-indicators li > .thumbnail {
    width: 50px;
    left: 50%;
    margin-top: -50px;
    margin-left: -25px;
  }
}
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
body {
  font-family: "Open Sans", sans-serif;
}
.header {
  position: relative;
  overflow: hidden;
  max-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.text {
  /*-webkit-column-count: 2; 
    -moz-column-count: 2; 
    column-count: 2; */
  margin-top: 15px;
}
.statistics > p {
  margin-bottom: 2px;
}
.statistics > p > span.label {
  background-color: white;
  color: gray;
}
.side {
  background: #fafafa;
  padding-top: 15px;
}
.side > img {
  margin-bottom: 15px;
}
.semi-title {
  font-weight: bold;
  margin-top: 40px;
}
.title {
  position: absolute;
  bottom: 45px;
  padding: 7px;
  right: 25px;
  padding-left: 25px;
  padding-right: 30px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
}
.sub-title {
  position: absolute;
  bottom: 94px;
  padding: 7px;
  right: 25px;
  padding-left: 12px;
  padding-right: 12px;
  color: orange;
  background: rgba(0, 0, 0, 0.7);
}
.name-author {
  position: absolute;
  bottom: 35px;
  left: 100px;
  font-size: 11px;
  color: white;
  background: black;
  padding: 2px;
  padding-right: 10px;
  padding-left: 22px;
  margin-left: -21px;
  z-index: 1;
  font-weight: 500;
}
.photo-author {
  max-height: 70px;
  padding: 2px;
  position: absolute;
  left: 25px;
  bottom: 25px;
  background: white;
  z-index: 3;
}
.triangulo {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 60px 0 0 1200px;
  border-color: transparent transparent transparent #ffffff;
}
.row-eq-height {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

@media (max-width: 426px) {
  .header {
    margin-left: -15px;
    margin-top: -15px;
    margin-right: -15px;
  }
  .title {
    font-size: 15px;
    bottom: -12px;
    right: 0px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .photo-author {
    max-height: 45px;
    left: 5px;
    bottom: 40px;
  }
  .name-author {
    font-size: 9px;
    margin-left: -63px;
    bottom: 44px;
  }
  .sub-title {
    right: 0px;
    bottom: 18px;
    padding: 5px;
    font-size: 10px;
  }
}
</style>
