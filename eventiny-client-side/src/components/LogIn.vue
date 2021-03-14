<template>
  <div class="container h-100">
    <div class="d-flex justify-content-center h-100">
      <div class="user_card">
        <div class="d-flex justify-content-center">
          <div class="brand_logo_container">
            <img
              src="https://i.pinimg.com/originals/27/49/69/27496910bdeb9581f521ae0e66f7c0cd.gif"
              class="brand_logo"
              alt="Logo"
            />
          </div>
        </div>
        <div class="d-flex justify-content-center form_container">
          <form>
            <div class="input-group mb-3">
              <div class="input-group-append">
                <span class="input-group-text"
                  ><i class="fas fa-user"></i
                ></span>
              </div>
              <input
                type="email"
                class="form-control input_user"
                placeholder="email"
                v-model="login.email"
              />
            </div>
            <div class="input-group mb-2">
              <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-key"></i></span>
              </div>
              <input
                type="password"
                class="form-control input_pass"
                placeholder="password"
                v-model="login.password"
              />
            </div>
            <div class="d-flex justify-content-center mt-3 login_container">
              <button
                type="button"
                name="button"
                class="btn login_btn"
                @click="onSubmitLogin(login)"
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <div class="mt-4">
          <div class="d-flex justify-content-center links">
            Don't have an account?
            <a href="#" class="ml-2" @click="signup()">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

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
    onSubmitLogin(login) {
      axios
        .post("http://localhost:3000/login", login)
        .then(({ data }) => {
          console.log("==>", data);
          if (data.token == undefined) {
            localStorage.removeItem("token");
            this.$router.push("/Signup");
          } else if (data.token !== undefined) {
            localStorage.setItem("token", data.token);
            this.$router.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
          this.$router.push("/Signup");
        });
    },
    signup() {
      this.$router.push("/Signup");
    },
  },
};
</script>
<style scoped>
.container {
  margin-top: 10%;
}

.user_card {
  height: 400px;
  width: 350px;
  margin-top: auto;
  margin-bottom: auto;
  background: #f39c12;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 4%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
}
.brand_logo_container {
  position: absolute;
  height: 170px;
  width: 170px;
  top: -75px;
  border-radius: 50%;
  background: #c0392b;
  padding: 10px;
  text-align: center;
}
.brand_logo {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  border: 2px solid white;
}
.form_container {
  margin-top: 100px;
}
.login_btn {
  width: 100%;
  background: #c0392b !important;
  color: white !important;
}
.login_btn:focus {
  box-shadow: none !important;
  outline: 0px !important;
}
.login_container {
  padding: 0 2rem;
}
.input-group-text {
  background: #c0392b !important;
  color: white !important;
  border: 0 !important;
  border-radius: 0.25rem 0 0 0.25rem !important;
}
.input_user,
.input_pass:focus {
  box-shadow: none !important;
  outline: 0px !important;
}
</style>
