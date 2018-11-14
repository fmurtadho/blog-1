<template>
  <!-- /.container -->
  <div class="container">

    <br>
    <!-- /.row -->
    <div class="row">

      <!-- Article Content Column -->
      <div class="col-lg-8">

        <div class="card z-depth-2">
           <!-- Card Body -->
          <div class="card-body">
            <!-- Title -->
            <h1 class="mt-4 text-center">{{article.data.title}}</h1>
            <hr>

            <div class="row d-flex justify-content-center">
              <!-- Preview Image -->
              <img class="img-fluid rounded" v-bind:src="article.data.picture" alt="">
            </div>
            <hr>

            <!-- Post Content -->
            <div v-html="article.data.content"></div>
            <hr>

            <!-- Reply section -->
            <reply-card v-if="islogin" @trigger="updateArticle"></reply-card>
            <!-- Reply section -->

            <!-- Comment Section -->
            <section class="my-5">
              <div class="card-header border-0 font-weight-bold">{{article.data.comments.length}} comments</div>
              <comment-card v-for="(comment, index) in comments" :key="index" :comment="comment" :deleteComment="deleteComment" :currentUser="currentUser"></comment-card>
            </section>
            <!-- Comment Section -->

          </div>
          <!-- Card Body -->
        </div>

      </div>

    </div>
    <!-- /.row -->
    <br>
  </div>
  <!-- /.container -->
</template>

<script>
import config from '@/config.js'

import ReplyCard from '@/components/ReplyCard.vue'
import CommentCard from '@/components/CommentCard.vue'

export default {
  name: 'completearticle',
  components: {
    CommentCard,
    ReplyCard
  },
  props: ['islogin'],
  data () {
    return {
      article: '',
      inputcomment: '',
      comments: '',
      triggerevent: '',
      token: '',
      commentform: false,
      currentUser: localStorage.getItem('currentuser')
    }
  },
  methods: {
    getArticle (id) {
      let self = this

      axios({
        method: 'GET',
        url: `${config.port}/articles/${id}`
      })
        .then((response) => {
          self.article = response.data
          self.comments = self.article.data.comments
        })
        .catch((err) => {
          console.log(err)
        })
    },
    submitComment () {

      let self = this

      axios({
        method: 'POST',
        url: `${config.port}/comments/${this.$route.params.articleId}`,
        headers: {
          token: self.token
        },
        data: {
          thecomment: self.inputcomment
        }
      })
        .then((response) => {
          self.inputcomment = ''
          self.triggerevent = response
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteComment (id) {
      let self = this

      axios({
        method: 'DELETE',
        url: `${config.port}/comments/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((response) => {
          // console.log(response.data)
          self.triggerevent = response
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateArticle(val){
      this.triggerevent = val
    },
    checkToken () {
      let token = localStorage.getItem('token')
      if (token) {
        this.currentuser = localStorage.getItem('currentuser')
        this.token = token
        this.islogin = true
      } else {
        this.islogin = false
        this.currentuser = ''
      }
    }
  },
  created () {
    this.getArticle(this.$route.params.articleId)
    this.checkToken()
  },
  mounted () {
    this.checkToken()
  },
  watch: {
    triggerevent: function (val) {
      this.getArticle(this.$route.params.articleId)
    },
    islogin: function (val) {
      this.checkToken()
      this.getArticle(this.$route.params.articleId)
    },
    currentuser: function (val) {
      this.getArticle(this.$route.params.articleId)
    }
  }
}
</script>

<style>

</style>
