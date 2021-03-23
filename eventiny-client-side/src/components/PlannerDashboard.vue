<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <p>
            Google Maps JavaScript API with Places Library Autocomplete Address
            Field
          </p>

          <div class="form-group">
            <label>Location:</label>
            <input
              type="text"
              class="form-control"
              id="search_input"
              placeholder="Type address..."
            />
          </div>
          <div id="map"></div>
        </div>
      </div>
    </div>
  </div>
</template>

//
<script>
var searchInput = "search_input";
$(document).ready(function() {
  var autocomplete;
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById(searchInput),
    {
      types: ["geocode"],
    }
  );
});
</script>

<style scoped>
#map {
  height: 100%;
}
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 80%;
}
#search_input {
  font-size: 18px;
}
.form-group {
  margin-bottom: 10px;
  margin-top: 50px;
}
.form-group label {
  font-size: 18px;
  font-weight: 600;
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
</style>
