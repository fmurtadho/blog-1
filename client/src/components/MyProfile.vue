<template>
  <div class="row d-flex justify-content-center">
    <div class="col-sm-12 col-md-10 col-lg-8">
      <div class="card z-depth-2 border border-dark">
        <div class="card-body">
          <div class="view overlay zoom">
            <img class="card-img-top rounded" :src="profile_avatar" style="max-height:400px">
            <a href="#!">
              <div class="mask rgba-white-slight"></div>
            </a>
          </div>
          <div class="card-body card-body-cascade text-center">
            <!-- Title -->
            <h4 class="card-title"><strong>{{profile_name}}</strong></h4>
            <!-- Subtitle -->
            <h6 class="font-weight-bold indigo-text py-2">{{profile_email}}</h6>
            <!-- Text -->
            <p class="card-text">
              {{profile_bio}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config.js'

export default {
  name: 'myprofile',
  props: ['islogin'],
  data () {
    return {
      currentuser: localStorage.getItem('currentuser'),
      profile_name: '',
      profile_email: '',
      profile_age: '',
      profile_bio: '',
      profile_avatar: '',

      success : false,
      failed : false
    }
  },
  methods: {
    checkToken () {
      let token = localStorage.getItem('token')
      this.token = token

      if (token == null) {
        this.$router.push('/')
      }
    },
    getProfile (id) {
      let self = this

      axios({
        method: 'GET',
        url: `${config.port}/users/${this.currentuser}`
      })
        .then((response) => {
          self.profile_name = response.data.name
          self.profile_email = response.data.email
          self.profile_age = response.data.age
          self.profile_bio = response.data.bio
          self.profile_avatar = response.data.avatar
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateProfile () {
      let self = this

      let data = {
        name: self.profile_name,
        email: self.profile_email,
        age: self.profile_age,
        bio: self.profile_bio,
        avatar: self.profile_avatar
      }

      axios({
        method: 'PUT',
        url: `${config.port}/users/update`,
        headers: {
          token: localStorage.getItem('token')
        },
        data
      })
        .then((response) => {
          self.success = true
          console.log(response)
        })
        .catch((err) => {
          self.failed = true
          console.log(err)
        })
    }
  },
  mounted () {
    this.checkToken()
    this.getProfile()
  },
  watch: {
    islogin: function (val) {
      this.checkToken()
    }
  }
}
</script>