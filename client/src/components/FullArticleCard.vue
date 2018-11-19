<template>
  <div v-if="article" class="card z-depth-2 border border-dark">
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
      <!-- {{article.data.location}} -->
      <google-map v-if="location" :place="location"></google-map>
      <hr>
      <youtube-accordion :location="location"/>

      <!-- Reply section -->
      <reply-card v-if="islogin" @trigger="updateArticle"></reply-card>
      <!-- Reply section -->

      <!-- Comment Section -->
      <section class="my-5">
        <div class="card-header border-0 font-weight-bold">{{article.data.comments.length}} comments</div>
        <comment-card v-for="(comment, index) in comments" :key="index" :comment="comment" :deleteComment="deleteComment"
          :currentUser="currentUser"></comment-card>
      </section>
      <!-- Comment Section -->

    </div>
    <!-- Card Body -->
  </div>
</template>

<script>
import config from '@/config.js'

import GoogleMap from '@/components/GoogleMap.vue'
import YoutubeAccordion from '@/components/YoutubeAccordion.vue'

import ReplyCard from '@/components/ReplyCard.vue'
import CommentCard from '@/components/CommentCard.vue'

export default {
  name: 'completearticle',
  components: {
    CommentCard,
    ReplyCard,
    GoogleMap,
    YoutubeAccordion
  },
  props: ['islogin'],
  data () {
    return {
      article: '',
      comments: '',
      triggerevent: '',
      currentUser: localStorage.getItem('currentuser'),
      location : '',
      videos : ''
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
          self.location = self.article.data.location
          self.comments = self.article.data.comments
          self.title = response.data.data.title

          self.$emit('full-article-card',response)
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
        // this.islogin = true
      } else {
        // this.islogin = false
        this.currentuser = ''
      }
    }
  },
  created () {
    this.checkToken()
  },
  mounted () {
    this.checkToken()
    this.getArticle(this.$route.params.articleId)
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
