<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark elegant-color scrolling-navbar fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#"><i class="fas fa-briefcase"></i> TRAVEREST</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link" href="#">Home
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="`/about`" class="nav-link" href="#">About</router-link>
            </li>
            <li class="nav-item" v-if="islogin === false" data-toggle="modal" data-target="#exampleModalCenter">
              <a class="nav-link" href="#">Login</a>
            </li>
            <li class="nav-item" v-if="islogin === false" data-toggle="modal" data-target="#registerModal">
              <a class="nav-link" href="#">Register</a>
            </li>
            <li class="nav-item" v-if="islogin === true">
              <a class="nav-link" @click="signout()">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Login</h5>
            <button type="button" class="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p v-if="alertLogin" :class="alertLogin">{{alertLoginMessage}}</p>
            Email<br>
            <input type="text" v-model="login_email"><br>
            Password<br>
            <input type="password" v-model="login_password">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="signin()">Login</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Register</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p v-if="alertRegister" :class="alertRegister">{{alertRegisterMessage}}</p>
            Name<br>
            <input type="text" v-model="register_name"><br>
            Email<br>
            <input type="email" v-model="register_email"><br>
            Password<br>
            <input type="password" v-model="register_password">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="register()">Register</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import config from '@/config.js'

export default {
  name: 'Navbar',
  data () {
    return {
      islogin: false,
      isadmin: false,
      login_email: '',
      login_password: '',

      triggerchange: '',

      register_name: '',
      register_email: '',
      register_password: '',

      alertLogin : '',
      alertLoginMessage : '',

      alertRegister : '',
      alertRegisterMessage : ''
    }
  },
  mounted () {
    this.checkToken()
  },
  methods: {
    checkToken () {
      let token = localStorage.getItem('token')
      if (token) {
        this.islogin = true
        this.$emit('islogin-data', this.islogin)
      }

      // let admin = localStorage.getItem('admin')
      // if (admin === true) {
      //   this.isadmin = true
      // }
    },
    register () {
      let self = this

      let data = {
        name: this.register_name,
        email: this.register_email,
        password: this.register_password
      }

      axios({
        url: `${config.port}/users/signup`,
        method: 'POST',
        data
      })
        .then((response) => {
          self.alertRegister = 'alert alert-info'
          self.alertRegisterMessage = `${response.data.message}`
        })
        .catch((error) => {
          self.alertRegister = 'alert alert-danger'
          self.alertRegisterMessage = `${error.response.data.message}`
        })
    },
    signin () {
      let email = this.login_email
      let password = this.login_password

      let data = {
        email,
        password
      }

      let self = this

      axios({
        method: 'POST',
        url: `${config.port}/users/signin`,
        data
      })
        .then(function (response) {
          self.login_email = ''
          self.login_password = ''

          self.alertLogin = 'alert alert-info'
          self.alertLoginMessage = 'Login Success'

          setTimeout(function(){
            self.alertLogin = ''
            self.alertLoginMessage = ''
          }, 2000);

        //   console.log(response.data.name)

          localStorage.setItem('token', response.data.token)
          localStorage.setItem('admin', response.data.isAdmin)
          localStorage.setItem('currentuser', response.data.userId)
          localStorage.setItem('name', response.data.name)

          if (response.data.isAdmin === true) {
            self.isadmin = true
          }
          self.islogin = true

          self.$emit('islogin-data', self.islogin)
          self.$emit('isadmin-data', self.isadmin)
          // console.log(this.isadmin)
        })
        .catch(function (err) {
          self.failedLogin = true
          // console.log(err)
          self.alertLogin = 'alert alert-danger'
          self.alertLoginMessage = 'Login Failed'
        })
    },
    signout () {
      localStorage.removeItem('token')
      localStorage.removeItem('admin')
      localStorage.removeItem('currentuser')
      localStorage.removeItem('name')
      this.islogin = false
      this.isadmin = false
      this.$emit('trigger-change', this.triggerchange)
      this.$emit('islogin-data', this.islogin)
      this.$emit('isadmin-data', this.isadmin)
    }
  }
}
</script>

<style>
li { cursor: pointer; }
</style>
