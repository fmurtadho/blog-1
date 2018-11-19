<template>
    <div v-if="author" class="row d-flex justify-content-center">
        <div class="col-sm-12 col-md-10 col-lg-8">
            <div class="card z-depth-2 border border-dark">
                <div class="card-body">
                    <p v-if="alert" :class="alert">
                        {{alertMessage}}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </p>
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
                    <div v-if="footer" class="card-footer d-flex justify-content-center">
                        <div v-if="!follower" @click="follow" class="btn btn-danger">follow</div>
                        <div v-if="follower" @click="unfollow" class="btn btn-danger">unfollow</div>
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
      author : '',
      follower : false,
      alert : '',
      alertMessage : '',
      footer : true
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

            let followers = this.author.followers

            let currentuser = localStorage.getItem('currentuser')
            for(let i = 0 ; i < followers.length ; i ++){
                let follower = followers[i]._id.toString()
                if(follower === currentuser){
                    this.follower = true
                    break;
                }
            }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    follow(){
        axios({
            method : 'POST',
            url : `${config.port}/users/follow/${this.$route.params.authorId}`,
            headers : {
                token : localStorage.getItem('token')
            }
        })
        .then((response)=>{
            this.getProfile(this.$route.params.authorId)
            this.alert = 'alert alert-info text-center'
            this.alertMessage = `You are now following ${this.author.name}. You will receive an email every time ${this.author.name} publish new article.`
            
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    unfollow(){
        axios({
            method : 'POST',
            url : `${config.port}/users/unfollow/${this.$route.params.authorId}`,
            headers : {
                token : localStorage.getItem('token')
            }
        })
        .then((response)=>{
            this.alert = 'alert alert-info text-center'
            this.alertMessage = `You unfollowed ${this.author.name}. You wouldn't receive an email every time ${this.author.name} publish new article anymore.`
            this.follower = false
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  },
  mounted () {
    this.getProfile(this.$route.params.authorId)
    if(this.$route.params.authorId === localStorage.getItem('currentuser')){
        this.footer = false
    }
  }
}
</script>

<style scoped>
</style>
