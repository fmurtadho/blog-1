<template>
    <div class="card">
      <h5 class="card-header elegant-color lighten-3 text-white">Edit Article</h5>
      <div class="card-body">
          <div class="form-group">
            Picture :
            <br>
            <input type="file" v-on:change="addImage($event)">
            <br>
            <br>
            Title :
            <input type="text" class="form-control" rows="3" v-model="input_title">
            <br>
            Content :
            <wysiwyg v-model="input_content"/>
            <br>
            <select v-model="input_category" name="Category">
                <option v-for="category in categories" :key="category._id" :value="category._id">{{category.name}}</option>
            </select>
          </div>
          <button class="btn btn-primary" v-on:click="submitArticle()">Submit Update</button>
      </div>
    </div>
</template>

<script>
import config from '@/config.js'

export default {
  name: 'editarticle',
  data () {
    return {
      token: '',
      input_title: '',
      input_content: '',

      input_image: '',
      new_image: '',

      input_category: '',
      categories : ''
    }
  },
  methods: {
    getCategories (){
      axios({
        method : 'GET',
        url : `${config.port}/categories`
      })
      .then(response=>{
        this.categories = response.data
      })
      .catch(error=>{
        console.log('error reading category list')
      })
    },
    checkToken () {
      let token = localStorage.getItem('token')
      this.token = token

      if (token == null) {
        this.$router.push('/')
      }
    },
    getValue () {
      let self = this

      axios({
        method: 'GET',
        url: `${config.port}/articles/${this.$route.params.articleId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((response) => {
          self.input_image = response.data.data.picture
          self.input_title = response.data.data.title
          self.input_content = response.data.data.content
          self.new_image = response.data.data.picture
          self.input_category = response.data.data.category._id
        })
        .catch((err) => {
          console.log(err)
        })
    },
    submitArticle () {
      
      if (this.new_image !== this.input_image) {
        let formdata = new FormData()
        formdata.append('image', this.new_image)

        axios.post(`${config.port}/articles/upload`, formdata, {

        })
          .then((response) => {
            let title = this.input_title
            let content = this.input_content
            let picture = response.data.link
            let category = this.input_category

            let self = this

            let data = {
              title,
              content,
              picture,
              category
            }

            axios({
              method: 'PUT',
              url: `${config.port}/articles/${this.$route.params.articleId}`,
              headers: {
                token: localStorage.getItem('token')
              },
              data
            })
              .then((response) => {
                self.input_title = ''
                self.input_content = ''
                self.input_image = ''
                this.$router.push('/myarticle')
              })
          })
          .catch((err) => {
            console.log(err)
          })
      } else if (this.input_image === this.new_image) {
        let title = this.input_title
        let content = this.input_content
        let picture = this.input_image
        let category = this.input_category

        let self = this

        let data = {
          title,
          content,
          picture,
          category
        }

        axios({
          method: 'PUT',
          url: `${config.port}/articles/${this.$route.params.articleId}`,
          headers: {
            token: localStorage.getItem('token')
          },
          data
        })
          .then((response) => {
            self.input_title = ''
            self.input_content = ''
            self.input_image = ''
            this.$router.push('/myarticle')
          })
      }
    },
    addImage (link) {
      this.new_image = link.target.files[0]
    }
  },
  mounted () {
    this.checkToken()
    this.getValue()
    this.getCategories()
  },
  created () {
    this.checkToken()
    this.getValue()
  }
}
</script>

<style>

</style>
