<template>
    <div class="row d-flex justify-content-center">
        <div class="col-sm-12 col-md-10 col-lg-8">
            <div class="card z-depth-2 border border-dark">
                <div class="card-body">
                    <div class="view overlay zoom">
                        <img class="card-img-top rounded" :src="author.avatar" style="max-height:400px">
                        <a href="#!">
                            <div class="mask rgba-white-slight"></div>
                        </a>
                    </div>
                    <div class="card-body card-body-cascade text-center">
                        <!-- Title -->
                        <h4 class="card-title"><strong>{{author.name}}</strong></h4>
                        <!-- Subtitle -->
                        <h6 class="font-weight-bold indigo-text py-2">{{author.email}}</h6>
                        <!-- Text -->
                        <p class="card-text">
                            {{author.bio}}
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
