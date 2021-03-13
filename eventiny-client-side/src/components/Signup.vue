<template>
  <div class="container h-100">
    <div class="d-flex justify-content-center h-100">
      <div class="user_card">
        <div class="d-flex justify-content-center">
          <div class="brand_logo_container">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEOF3W-iZ0X_8aGZjRZSFkNp3UEuE2OGrBuw&usqp=CAU"
              class="brand_logo"
              alt="Logo"
            />
          </div>
        </div>
        <div class="d-flex justify-content-center form_container">
          <form>
            <div class="input-group mb-3" id="inputblock1">
              <div class="input-group-append">
                <span class="input-group-text"
                  ><i class="fas fa-user"></i
                ></span>
              </div>
              <input
                type="text"
                name=""
                class="form-control input_user"
                placeholder="username"
                v-model="signup.username"
              />
              <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-key"></i></span>
              </div>
              <input
                type="password"
                name=""
                class="form-control input_user"
                placeholder="password"
                v-model="signup.password"
              />
              <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-key"></i></span>
              </div>
              <input
                type="password"
                name=""
                class="form-control input_user"
                placeholder="confirm password"
                v-model="signup.confirmPassword"
              />
            </div>
            <div class="input-group mb-2" id="inputblock2">
              <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-at"></i></span>
              </div>
              <input
                type="email"
                name=""
                class="form-control input_user"
                placeholder="email"
                v-model="signup.email"
              />
              <div class="input-group-append">
                <span class="input-group-text"
                  ><i class="fas fa-receipt"></i
                ></span>
              </div>
              <input
                type="address"
                name=""
                class="form-control input_user"
                placeholder="address"
                v-model="signup.address"
              />
              <div class="input-group-append">
                <span class="input-group-text"
                  ><i class="fas fa-receipt"></i
                ></span>
              </div>
              <input
                type="address2"
                name=""
                class="form-control input_user"
                placeholder="address2"
                v-model="signup.address2"
              />
              <div class="input-group-append">
                <span class="input-group-text"
                  ><i class="fas fa-phone"></i
                ></span>
              </div>
              <input
                type="text"
                name=""
                class="form-control input_user"
                placeholder="phone"
                v-model="signup.phone"
              />
              <div class="input-group-append">
                <span class="input-group-text"
                  ><i class="fas fa-birthday-cake"></i
                ></span>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  placeholder="date of birthday"
                  v-model="signup.birthday"
                />
              </div>
              <div class="input-group-append">
                <span class="input-group-text"
                  ><i class="fas fa-map-marker-alt"></i
                ></span>
              </div>
              <input
                type="text"
                name=""
                class="form-control input_user"
                placeholder="city"
                v-model="signup.city"
              />
            </div>

            <div class="d-flex justify-content-center mt-3 login_container">
              <button
                type="button"
                name="button"
                class="btn login_btn"
                @click="onSubmitSignup(signup)"
              >
                Signup
              </button>
            </div>
          </form>
        </div>

        <div class="mt-4">
          <div class="d-flex justify-content-center links">
            Already have an account?
            <a href="#" class="ml-2" @click="signin()">Log in</a>
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
        password: "",
        confirmPassword: "",
        email: "",
        address: "",
        address2: "",
        phone: "",
        birthday: "",
        city: "",
      },
    };
  },
  name: "Signup",
  methods: {
    signin() {
      this.$router.push("/Login");
    },
    onSubmitSignup(signup) {
      for (let value of Object.values(signup)) {
        if (
          signup.password !== "" &&
          signup.confirmPassword !== "" &&
          signup.password === signup.confirmPassword &&
          value !== ""
        ) {
          axios
            .post("http://localhost:3000/signup", signup)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              swal("Username or email exist", "Please check again", "error");
              console.log(err);
              return;
            });
        } else if (value === "") {
          swal(
            "Please fill up all the informations",
            "Missing informations",
            "error"
          );
          return;
        } else if (signup.password !== signup.confirmPassword) {
          swal(
            "Password not match",
            "Put again your password  please!",
            "error"
          );
          return;
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 10%;
}

body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  background: #60a3bc !important;
}
.user_card {
  height: 500px;
  width: 750px;
  margin-top: auto;
  margin-bottom: auto;
  background: #f39c12;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
}
.cont-form {
  display: block;
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
.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
  background-color: #c0392b !important;
}
</style>
