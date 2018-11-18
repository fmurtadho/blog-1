<template>
  <!-- Page Content -->
    <div class="container">

      <div class="row">

        <!-- Sidebar -->
        <div class="col-sm-12 col-md-4">
          <div class="sticky-top sticky-offset mb-5">
            <accordion-card class="my-4"/>
            <search-widget @search-result="searchResult"></search-widget>
            <categories-widget @category-result="categoryResult"></categories-widget>
            <global-chat></global-chat>
          </div>
        </div>
        <!-- Sidebar -->

        <!-- Blog Entries Column -->
        <div class="col-sm-12 col-md-8">
          <br>
          <article-card v-if="showArticles" v-for="(article, index) in articles" :key="index" :article="article"></article-card>
          <router-view :islogin="islogin"></router-view>
          <br>
        </div>
        <!-- Blog Entries Column -->

      </div>
      <!-- /.row -->

    </div>
    <!-- /.container -->
</template>

<script>
import config from '@/config.js'

//MAIN
import ArticleCard from '@/components/ArticleCard.vue'
import FullArticleCard from '@/components/FullArticleCard.vue'
// import Pagination from '@/components/Pagination.vue'

//SIDEBAR
import SearchWidget from '@/components/SearchWidget.vue'
import AccordionCard from '@/components/AccordionCard.vue'
import CategoriesWidget from '@/components/CategoriesWidget.vue'
import GlobalChat from '@/components/GlobalChat.vue'

export default {
  name: 'home',
  props : ['islogin'],
  components: {
    // Pagination,
    ArticleCard,
    SearchWidget,
    GlobalChat,
    CategoriesWidget,
    FullArticleCard,
    AccordionCard
  },
  data () {
    return {
      articles : '',
      showArticles : true,
      // showArticle : false
    }
  },
  methods: {
    getAllArticle () {
      let self = this

      axios({
        method: 'GET',
        url: `${config.port}/articles`
      })
      .then((response) => {
        this.articles = response.data.data
      })
      .catch((err) => {
        console.log(err)
      })
    },
    searchResult (val) {
      this.articles = val
    },
    categoryResult (val) {
      this.articles = val
    }
  },
  created () {
    this.getAllArticle()
  },
  watch: {
    '$route' (to, from) {
      if(to.path !== '/'){
        this.showArticles  = false
        this.showArticle = true
      }else{
        this.getAllArticle()
        this.showArticles = true
      }
    },
    articles : function(val){
      // this.showArticle = false
      this.$router.replace('/')
      this.showArticles = true
    }
  }
}
</script>
<style scoped>
  .sticky-offset {
      top: 75px;
  }
</style>

