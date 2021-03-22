<template>
  <div>
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
              src="https://s3.amazonaws.com/ooomf-com-files/wdXqHcTwSTmLuKOGz92L_Landscape.jpg"
            />
          </div>
        </li>
        <li data-target="#thumbnail-preview-indicators" data-slide-to="1">
          <div class="thumbnail">
            <img
              class="img-responsive"
              src="https://s3.amazonaws.com/ooomf-com-files/tU3ptNgGSP6U2fE67Gvy_SYDNEY-162.jpg"
            />
          </div>
        </li>
        <li data-target="#thumbnail-preview-indicators" data-slide-to="2">
          <div class="thumbnail">
            <img
              class="img-responsive"
              src="https://s3.amazonaws.com/ooomf-com-files/mtNrf7oxS4uSxTzMBWfQ_DSC_0043.jpg"
            />
          </div>
        </li>
      </ol>
      <div class="carousel-inner">
        <div class="item slides active">
          <div class="slide-1"></div>
          <div class="container"></div>
        </div>
        <div class="item slides">
          <div class="slide-2"></div>
          <div class="container">
            <div class="carousel-caption"></div>
          </div>
        </div>
        <div class="item slides">
          <div class="slide-3"></div>
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

    <div class="container details-event">
      <div class="row">
        <!-- HEADER -->

        <!-- INFO -->
        <div class="row">
          <div class="col-xs-12">
            <h4 style="line-height: 25px;">
              {{ eventDetails.name }}
            </h4>
          </div>
        </div>
        <div class="row row-eq-height" style="padding-right:15px">
          <div class="col-xs-9 text">
            <p>
              {{ eventDetails.caption }}
            </p>
            <p>
              Su edificación empezó en el año 1980. Nueve años después,
              concretamente el 1 de mayo de 1989, se abrió al público.
            </p>
            <p class="semi-title">Title</p>
            <p>
              El área del inmueble es de 207.000 metros cuadrados, con un total
              de ocho pisos, y puede albergar a 150.000 personas.
            </p>
            <p>
              El techo posee 16 arcos que emulan los pétalos de una flor, y el
              césped es natural. También cuenta con una piscina y saunas.
            </p>
            <p>
              En él no solo se llevan a cabo partidos de fútbol y competencias
              de atletismo (dispone de una pista de 400 metros), sino festivales
              artísticos, así como eventos del Partido de los Trabajadores, que
              gobierna el país desde 1948.
            </p>
            <p>
              Dentro de las actividades que se realizan destaca el Festival
              Arirang, que incluye espectáculos de circo, música, gimnasia y
              danza.
            </p>
            <p>
              Según la agencia EFE, este festival se celebra desde 2002 para
              recordar el nacimiento del líder fundador de Corea del Norte, Kim
              Il-sung.
            </p>
            <p class="semi-title">Reclamation</p>
            <p>
              En 2014, el estadio fue remodelado y el año pasado reabrió sus
              puertas.
            </p>
            <p>
              De acuerdo con el diario inglés The Guardian, entre las
              renovaciones están nuevos vestuarios, equipo de fisioterapia,
              salas de juntas y un centro de medios.
            </p>
          </div>
          <!-- Sidebar // advertising -->
          <div class="col-xs-3 side">
            <img
              style="max-width: 100%"
              src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG9ncmFwaHl8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
              alt="Photograph"
            />

            <small>
              <p style="margin-bottom:0px;"><b>Estadísticas</b></p>
              <div class="statistics">
                <p><span class="label label-default">Visitas 2550</span></p>
                <p><span class="label label-default">Comentarios 15</span></p>
                <p>
                  <span class="label label-default">Compartido 50 veces</span>
                </p>
                <p><span class="label label-default">Me gusta 20</span></p>
              </div>
              <p style="margin-bottom:0px;margin-top:25px;">
                <b>Noticias importantes</b>
              </p>
              <ul class="list-group">
                <li class="list-group-item">
                  <big><b>1.</b></big> Cras justo odio
                </li>
                <li class="list-group-item">
                  <big><b>2.</b></big> Dapibus ac facilisis in
                </li>
                <li class="list-group-item">
                  <big><b>3.</b></big> Morbi leo risus
                </li>
                <li class="list-group-item">
                  <big><b>4.</b></big> Porta ac consectetur ac
                </li>
                <li class="list-group-item">
                  <big><b>5.</b></big> Vestibulum at eros
                </li>
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
export default {
  props: {
    eventDetails: Object,
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
          // localStorage.removeItem("token");
        });
    },
  },
  created() {
    this.getUserInfo();
  },
};
</script>
<style scoped>
.details-event {
  margin-top: 3%;
}
#thumbnail-preview-indicators {
  position: relative;
  overflow: hidden;
}
#thumbnail-preview-indicators .slides .slide-1,
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
#thumbnail-preview-indicators .slides .slide-1 {
  background-image: url(https://s3.amazonaws.com/ooomf-com-files/wdXqHcTwSTmLuKOGz92L_Landscape.jpg);
}
#thumbnail-preview-indicators .slides .slide-2 {
  background-image: url(https://s3.amazonaws.com/ooomf-com-files/tU3ptNgGSP6U2fE67Gvy_SYDNEY-162.jpg);
}
#thumbnail-preview-indicators .slides .slide-3 {
  background-image: url(https://s3.amazonaws.com/ooomf-com-files/mtNrf7oxS4uSxTzMBWfQ_DSC_0043.jpg);
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
  margin-top: 30px;
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
