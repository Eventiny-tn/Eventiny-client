<template>
  <form>
    <div class="form-group">
      <label for="exampleInputEmail1">Email</label>
      <input type="email" class="form-control" placeholder="Enter email" />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">First Name</label>
      <input type="name" class="form-control" placeholder=" Your first name" />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Last Name</label>
      <input type="name" class="form-control" placeholder=" Your Last name" />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Phone Number</label>
      <input type="tel" class="form-control" placeholder=" Your phone number" />
    </div>
    <button type="submit" class="btn submit-button">
      continue checkout with konnect
    </button>
  </form>
</template>
<script>

</script>
<style scoped>
.submit-button {
  margin-left: 40%;
  position: relative;
  transition-property: background-color;
  transition-duration: 2s;
  transition-timing-function: linear;
  transition-delay: 1s;
}
.submit-button:hover {
  background-color: rgb(255, 94, 0, 0.5);
}
</style>
