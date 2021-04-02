<template>
  <div class="eventDetailContainer">
    <div>
      <div class="pd-wrap">
        <div class="container">
          <div class="heading-section">
            <h2>Event Details</h2>
          </div>
          <div class="row">
            <div>
              <div class="container">
                <!--Start code-->
                <div class="row">
                  <div class="col-12 pb-5">
                    <!--SECTION START-->
                    <section class="row">
                      <!--Start slider news-->
                      <div class="col-12 col-md-6 pb-0 pb-md-3 pt-2 pr-md-1">
                        <div
                          id="featured"
                          class="carousel slide carousel"
                          data-ride="carousel"
                        >
                          <!--carousel inner-->
                          <div class="carousel-inner">
                            <!--Item slider-->
                            <div class="carousel-item active">
                              <div
                                class="card border-0 rounded-0 text-light overflow zoom"
                              >
                                <div class="position-relative">
                                  <!--thumbnail img-->
                                  <div class="ratio_left-cover-1 image-wrapper">
                                    <a>
                                      <img
                                        class="img-fluid w-100"
                                        :src="currentImage"
                                      />
                                    </a>
                                  </div>
                                  <div
                                    class="position-absolute p-2 p-lg-3 b-0 w-100 bg-shadow"
                                  >
                                    <!--title-->
                                    <a>
                                      <h2 class="h3 post-title text-white my-1">
                                        {{ eventDetails.name.toUpperCase() }}
                                      </h2>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!--end item slider-->
                          </div>
                          <!--end carousel inner-->
                        </div>
                      </div>
                      <!--End slider news-->

                      <!--Start box news-->
                      <div
                        class="col-12 col-md-6 pt-2 pl-md-1 mb-3 mb-lg-4"
                        id="box-news-carrousel"
                      >
                        <div class="row">
                          <!--news box-->

                          <div
                            class="col-6 pb-1 pt-0 pr-1"
                            v-for="(event, i) in eventDetails.images"
                            :key="i"
                          >
                            <div
                              class="card border-0 rounded-0 text-white overflow zoom"
                              @click.prevent="showImage(event.image)"
                            >
                              <div class="position-relative">
                                <!--thumbnail img-->
                                <div class="ratio_right-cover-2 image-wrapper">
                                  <a>
                                    <img class="img-fluid" :src="event.image" />
                                  </a>
                                </div>
                                <div
                                  class="position-absolute p-2 p-lg-3 b-0 w-100 bg-shadow"
                                >
                                  <!--title-->
                                </div>
                              </div>
                            </div>
                          </div>
                          <!--end news box-->
                        </div>
                      </div>
                      <!--End box news-->
                    </section>
                    <!--END SECTION-->
                  </div>
                </div>
                <!--end code-->
              </div>
            </div>
            <div class="ui three column grid">
              <section class="column col-md-6">
                <!-- google map must be here -->
                <h3 class="loc-title">
                  Location :
                  <h5>{{ eventDetails.location }}</h5>
                </h3>

                <div class=" img-fluid " id="map"></div>
              </section>
              <div class="column col-md-6">
                <section class="row ">
                  <div class="product-dtl">
                    <div class="product-info">
                      <div class="product-name">
                        {{ eventDetails.name.toUpperCase() }}
                      </div>
                      <div class="product-price-discount">
                        <span>{{ eventDetails.price }} TND</span>
                      </div>
                    </div>
                    <div class="ui visible message">
                      <p>{{ eventDetails.caption.toUpperCase() }}</p>
                    </div>

                    <div class="product-count">
                      <label for="size">Quantity</label>
                      <div class="ui message">
                        <div id="e-organiser" class="header">
                          Event organiser: {{ eventDetails.user.username }}
                        </div>

                        <div id="input-ticket2">
                          <div class="header" v-if="ticketsBuy.quantity < 10">
                            <p>
                              Tickets :{{
                                eventDetails.ticket - ticketRiserved
                              }}
                            </p>
                            <p>
                              You puchase {{ ticketsBuy.quantity }} /
                              {{ ticketLimit }} tickets
                            </p>
                            <div
                              class="ui three column grid button-buy-tickets"
                            >
                              <div class="ui input focus column">
                                <input
                                  type="number"
                                  name="tentacles"
                                  min="1"
                                  v-bind:max="10 - ticketsBuy.quantity"
                                  v-model="tickets"
                                />
                              </div>
                              <div>
                                <button
                                  class="round-black-btn"
                                  @click="clickPay()"
                                  v-if="ticketsBuy.quantity < 10"
                                >
                                  Buy Ticket
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="statistics"></div>

                    <div
                      class="ui negative message"
                      v-if="ticketsBuy.quantity > 9"
                    >
                      <div class="header">
                        Sorry you cannot buy more tickets
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div class="ui visible message" v-if="showPayment">
              <Payment :submittedPay="submittedPay" />
            </div>
            <h2 class="about-event" v-if="eventDetails.description">
              About this Event
            </h2>
            <div class="ui visible message " v-if="eventDetails.description">
              <h2 class="about-event">About this Event</h2>
              <div class="ui visible message ">
                <p
                  class="description "
                  v-for="(paragh, i) in eventDetails.description.split('.')"
                  :key="i"
                >
                  {{ paragh }}
                </p>
              </div>
            </div>

            <div class="product-info-tabs">
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    id="description-tab"
                    data-toggle="tab"
                    href="#description"
                    role="tab"
                    aria-controls="description"
                    aria-selected="true"
                    >Comment Section</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    id="review-tab"
                    data-toggle="tab"
                    href="#review"
                    role="tab"
                    aria-controls="review"
                    aria-selected="false"
                    >Reviews</a
                  >
                </li>
              </ul>
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="description"
                  role="tabpanel"
                  aria-labelledby="description-tab"
                >
                  <div class="ui list cards">
                    <EventComment
                      :comments="comments"
                      :userinfo="userinfo"
                      :eventDetails="eventDetails"
                      :getEventComment="getEventComment"
                    />
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="review"
                  role="tabpanel"
                  aria-labelledby="review-tab"
                >
                  <div class="review-heading">REVIEWS</div>
                </div>
              </div>
            </div>
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
import moment from "moment";
import Payment from "./Payment.vue";
export default {
  components: {
    EventComment,
    Payment,
  },
  data() {
    return {
      ticketsBuy: {
        quantity: 0,
      },
      tickets: 0,
      comments: [],
      userinfo: {},
      currentImage: this.eventDetails.images[0].image,
      showPayment: false,
      ticketRiserved: 0,
      ticketLimit: 10,
    };
  },
  props: {
    eventDetails: {
      type: Object,
    },
  },
  methods: {
    showImage(url) {
      this.$data.currentImage = url;
    },
    getAllParticipent() {
      axios
        .get(`http://localhost:3000/participant/${this.eventDetails.id}`)
        .then(({ data }) => {
          if (data) {
            const allTicket = data.reduce((i, el) => {
              return i + el.quantity;
            }, 0);
            this.$data.ticketRiserved = allTicket;
            if (this.eventDetails.ticket - this.ticketRiserved <= 10) {
              this.$data.ticketLimit =
                this.eventDetails.ticket - this.ticketRiserved;
            }
          }
        })
        .catch((err) => console.log(err));
    },

    getEventComment() {
      setInterval(() => {
        axios
          .get("http://localhost:3000/comments/" + this.eventDetails.id)
          .then(({ data }) => {
            this.$data.comments = data;
          })
          .catch((err) => console.log(err));
      }, 2000);
    },

    submittedPay(PayMeth) {
      PayMeth.amount = this.tickets * 1 * this.eventDetails.price * 1;
      PayMeth.receiverWallet = "6064c027c7e3ca6b3c9fa682";
      axios
        .post(
          `http://localhost:3000/ticket/${this.userinfo.id}/${this.eventDetails.id}`,
          { quantity: this.$data.tickets }
        )
        .then(({ data }) => {
          this.getParticipant();
          const ticketData = {
            data: {
              userEmail: this.userinfo.email,
              userName: this.userinfo.username,
              eventName: this.eventDetails.name,
              eventLocation: this.eventDetails.location,
              eventDate: this.eventDetails.eventDate,
              purchaseTime: `${moment().format("MMM Do YY")}`,
              from: this.eventDetails.dateEnds,
              to: this.eventDetails.dateStart,
              place: this.$data.tickets,
            },
          };
          
          axios
            .post(`http://localhost:3000/send/ticket`, ticketData)
            .then(({ data }) => {
              axios
                .post(`http://localhost:3000/payment`, PayMeth)
                .then(({ data }) => {
                  window.open(data.payUrl);
                  this.$data.showPayment = false;
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clickPay() {
      this.$data.showPayment = true;
    },

    initMap() {
      var map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: parseFloat(this.eventDetails.lat),
          lng: parseFloat(this.eventDetails.lng),
        },
        zoom: 13,
      });
      var marker = new google.maps.Marker({
        position: {
          lat: parseFloat(this.eventDetails.lat),
          lng: parseFloat(this.eventDetails.lng),
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
          if (data[0].quantity !== undefined) {
            this.$data.ticketsBuy = data[0];
          } else {
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
    this.getAllParticipent();
    console.log("detailsevent", this.eventDetails);
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
.mb-4 {
  display: inline-flex;
  justify-content: flex-start;
}
.about-event {
  border-color: #39364f;
  color: #39364f;
  display: inline-block;
  font-size: 14.9333px;
  gap: normal;
  letter-spacing: 0.5px;
  line-height: 20px;
  padding: 0px 15px;
}
.img-fluid {
  cursor: pointer;
}
.description {
  border-color: #6f7287;
  color: #6f7287;
  font-family: Neue Plak;
  gap: normal;
  letter-spacing: 0.5px;
  line-height: 24px;
  text-align: left;
}
#e-organiser {
  color: #008ba3;
}
.button-buy-tickets {
  display: flex;
}
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
  height: 337px;
  width: 95%;
  display: flex;
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
  height: 580px;
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
.loc-title {
  margin-top: 10px;
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

/***Paaaart 2 of event detials */
.pd-wrap {
  padding: 40px 0;
  font-family: "Poppins", sans-serif;
}
.heading-section {
  text-align: center;
  margin-bottom: 20px;
}
.sub-heading {
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  display: block;
  font-weight: 600;
  color: #2e9ca1;
  text-transform: uppercase;
  letter-spacing: 2px;
}
.heading-section h2 {
  font-size: 32px;
  font-weight: 500;
  padding-top: 10px;
  padding-bottom: 15px;
  font-family: "Poppins", sans-serif;
}
.user-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: relative;
  min-width: 80px;
  background-size: 100%;
}
.carousel-testimonial .item {
  padding: 30px 10px;
}
.quote {
  position: absolute;
  top: -23px;
  color: #2e9da1;
  font-size: 27px;
}
.name {
  margin-bottom: 0;
  line-height: 14px;
  font-size: 17px;
  font-weight: 500;
}
.position {
  color: #adadad;
  font-size: 14px;
}
.owl-nav button {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  outline: none;
  height: 25px;
}
.owl-nav button svg {
  width: 25px;
  height: 25px;
}
.owl-nav button.owl-prev {
  left: 25px;
}
.owl-nav button.owl-next {
  right: 25px;
}
.owl-nav button span {
  font-size: 45px;
}
.product-thumb .item img {
  height: 100px;
}
.product-name {
  font-size: 22px;
  font-weight: 500;
  line-height: 22px;
  margin-bottom: 4px;
}
.product-price-discount {
  font-size: 22px;
  font-weight: 400;
  padding: 10px 0;
  clear: both;
}
.product-price-discount span.line-through {
  text-decoration: line-through;
  margin-left: 10px;
  font-size: 14px;
  vertical-align: middle;
  color: #a5a5a5;
}
.display-flex {
  display: flex;
}
.align-center {
  align-items: center;
}
.product-info {
  width: 100%;
}
.reviews-counter {
  font-size: 13px;
}
.reviews-counter span {
  vertical-align: -2px;
}
.rate {
  float: left;
  padding: 0 10px 0 0;
}
.rate:not(:checked) > input {
  position: absolute;
  top: -9999px;
}
.rate:not(:checked) > label {
  float: right;
  width: 15px;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  font-size: 21px;
  color: #ccc;
  margin-bottom: 0;
  line-height: 21px;
}
.rate:not(:checked) > label:before {
  content: "\2605";
}
.rate > input:checked ~ label {
  color: #ffc700;
}
.rate:not(:checked) > label:hover,
.rate:not(:checked) > label:hover ~ label {
  color: #deb217;
}
.rate > input:checked + label:hover,
.rate > input:checked + label:hover ~ label,
.rate > input:checked ~ label:hover,
.rate > input:checked ~ label:hover ~ label,
.rate > label:hover ~ input:checked ~ label {
  color: #c59b08;
}
.product-dtl p {
  font-size: 14px;
  line-height: 24px;
  color: #7a7a7a;
}
.product-dtl .form-control {
  font-size: 15px;
}
.product-dtl label {
  line-height: 16px;
  font-size: 15px;
}
.form-control:focus {
  outline: none;
  box-shadow: none;
}
.product-count {
  margin-top: 15px;
}
.product-count .qtyminus,
.product-count .qtyplus {
  width: 34px;
  height: 34px;
  background: #212529;
  text-align: center;
  font-size: 19px;
  line-height: 36px;
  color: #fff;
  cursor: pointer;
}
.product-count .qtyminus {
  border-radius: 3px 0 0 3px;
}
.product-count .qtyplus {
  border-radius: 0 3px 3px 0;
}
.product-count .qty {
  width: 60px;
  text-align: center;
}
.round-black-btn {
  border-radius: 4px;
  background: #212529;
  color: #fff;
  padding: 7px 45px;
  display: inline-block;
  margin-top: 20px;
  border: solid 2px #212529;
  transition: all 0.5s ease-in-out 0s;
}
.round-black-btn:hover,
.round-black-btn:focus {
  background: transparent;
  color: #212529;
  text-decoration: none;
}

.product-info-tabs {
  margin-top: 25px;
}
.product-info-tabs .nav-tabs {
  border-bottom: 2px solid #d8d8d8;
}
.product-info-tabs .nav-tabs .nav-item {
  margin-bottom: 0;
}
.product-info-tabs .nav-tabs .nav-link {
  border: none;
  border-bottom: 2px solid transparent;
  color: #323232;
}
.product-info-tabs .nav-tabs .nav-item .nav-link:hover {
  border: none;
}
.product-info-tabs .nav-tabs .nav-item.show .nav-link,
.product-info-tabs .nav-tabs .nav-link.active,
.product-info-tabs .nav-tabs .nav-link.active:hover {
  border: none;
  border-bottom: 2px solid #d8d8d8;
  font-weight: bold;
}
.product-info-tabs .tab-content .tab-pane {
  padding: 30px 20px;
  font-size: 15px;
  line-height: 24px;
  color: #7a7a7a;
}
.review-form .form-group {
  clear: both;
}
.mb-20 {
  margin-bottom: 20px;
}

.review-form .rate {
  float: none;
  display: inline-block;
}
.review-heading {
  font-size: 24px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 6px;
  text-transform: uppercase;
  color: #000;
}
.review-form .form-control {
  font-size: 14px;
}
.review-form input.form-control {
  height: 40px;
}
.review-form textarea.form-control {
  resize: none;
}
.review-form .round-black-btn {
  text-transform: uppercase;
  cursor: pointer;
}
.b-0 {
  bottom: 0;
}
.bg-shadow {
  background: rgba(76, 76, 76, 0);
  background: -webkit-gradient(
    left top,
    left bottom,
    color-stop(0%, rgba(179, 171, 171, 0)),
    color-stop(49%, rgba(48, 48, 48, 0.37)),
    color-stop(100%, rgba(19, 19, 19, 0.8))
  );
  background: linear-gradient(
    to bottom,
    rgba(179, 171, 171, 0) 0%,
    rgba(48, 48, 48, 0.71) 49%,
    rgba(19, 19, 19, 0.8) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4c4c4c', endColorstr='#131313', GradientType=0 );
}
.top-indicator {
  right: 0;
  top: 1rem;
  bottom: inherit;
  left: inherit;
  margin-right: 1rem;
}
.overflow {
  position: relative;
  overflow: hidden;
}
.zoom img {
  transition: all 0.2s linear;
}
.zoom:hover img {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
/* #box-news-carrousel {
  width: 500px;
} */
section {
  width: 100%;
  display: flex;
  padding: 25px;
}
.col-md-6 {
  /* display: block;
  position: relative; */
  margin-top: 120px !important  ;
}
</style>
