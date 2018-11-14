<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12 col-md-5 img">
                <!-- Card -->
                <div class="card testimonial-card">

                <!-- Background color -->
                <div class="card-up indigo lighten-1"></div>
                <br>
                <!-- Avatar -->
                <div class="avatar mx-auto white">
                    <img :src="author.avatar" class="rounded-circle">
                </div>

                <!-- Content -->
                <div class="card-body">
                    <!-- Name -->
                    <h4 class="card-title">{{author.name}}</h4>
                    <hr>
                    <!-- Quotation -->
                    <p><i class="fas fa-envelope"></i> &nbsp; {{author.email}}</p>
                    <p>{{author.bio}}</p>
                </div>

                </div>
                <!-- Card -->
                <!-- <img v-bind:src="author.avatar"
                    alt="" class="img-rounded">
                <br>
                <br> -->
            </div>
            <div class="col-sm-12 col-md-7 details">
                
            </div>
        </div>
    </div>
</template>

<script>
import config from '@/config.js'

export default {
  name: 'authorprofile',
  props: ['islogin'],
  data () {
    return {
      author : ''
    }
  },
  methods: {
    getProfile (id) {
      let self = this

      axios({
        method: 'GET',
        url: `${config.port}/users/${id}`
      })
        .then((response) => {
            this.author = response.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getProfile(this.$route.params.authorId)
  }
}
</script>

<style scoped>
.container{
    padding:5%;
}
.container .img{
    text-align:center;
}
.container .details{
    border-left:3px solid #ded4da;
}
.container .details p{
    font-size:15px;
    font-weight:bold;
}
</style>
