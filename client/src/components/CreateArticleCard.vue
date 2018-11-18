<template>
    <div class="card">
        <h5 class="card-header elegant-color lighten-3 text-white">Post Article</h5>
            <div class="card-body">
                <div class="alert alert-primary" v-if="uploading === true" role="alert">
                Please wait while we post your article...
            </div>
            <div class="alert alert-success" v-if="success === true" role="alert">
                Upload Success!
            </div>
            <div class="alert alert-danger" v-if="failed === true" role="alert">
                Upload Failed :(
            </div>
            <div class="form-group">
                Picture :
                <br>
                <input type="file" v-on:change="addImage($event)">
                <br>
                <br>
                Title :
                <input type="text" class="form-control" rows="3" v-model="input_title">
                <br>
                Location :
                <br>
                <input ref="autocomplete" placeholder="Search" class="search-location form-control" onfocus="value = ''" type="text" />
                <p v-if="alert_place" :class="alert_place">{{alert_place_message}}</p>
                <br>
                Content :
                <wysiwyg v-model="input_content"/>
                <br>
                Category :
                <br>
                <select v-model="input_category" name="Category">
                    <option v-for="category in categories" :key="category._id" :value="category._id">{{category.name}}</option>
                </select>
            </div>
            <div class="row d-flex">
              <button class="btn btn-primary ml-auto mr-3" v-on:click="submitArticle()">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
import config from '@/config.js'

export default {
  name: 'createarticle',
  props: ['islogin'],
  data () {
    return {
      token: '',
      input_title: '',
      input_content: '',

      input_image: '',

      input_category: '',

      input_place : '',
      alert_place : '',
      alert_place_message : '',

      uploading: false,
      success: false,
      failed: false,

      categories : '',
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
    submitArticle () {
      if (!this.input_place.lat || !this.input_place.lon) {
        this.alert_place = 'text-danger'
        this.alert_place_message = '*invalid location'
      } else {
        this.alert_place = ''
        this.alert_place_message = ''

        this.upload = true

        let formdata = new FormData()
        formdata.append('image', this.input_image)

        axios.post(`${config.port}/articles/upload`, formdata, {

          })
          .then((response) => {
            let title = this.input_title
            let content = this.input_content
            let picture = response.data.link
            let category = this.input_category
            let location = this.input_place

            let self = this

            let data = {
              title,
              content,
              picture,
              category,
              location
            }

            axios({
                method: 'POST',
                url: `${config.port}/articles/create`,
                headers: {
                  token: self.token
                },
                data
              })
              .then((response) => {
                self.success = true

                self.input_title = ''
                self.input_content = ''
                self.input_image = ''
                self.input_category = ''
                self.input_place = ''
              })
          })
          .catch((err) => {
            self.failed = true
            console.log(err)
          })
      }
    },
    addImage (link) {
      this.input_image = link.target.files[0]
    }
  },
  mounted () {
    this.checkToken()
    this.getCategories()

    this.autocomplete = new google.maps.places.Autocomplete(
      (this.$refs.autocomplete),
      {types: ['geocode']}
    );

    this.autocomplete.addListener('place_changed', () => {
      let place = this.autocomplete.getPlace();
      let ac = place.address_components;
      let lat = place.geometry.location.lat();
      let lon = place.geometry.location.lng();
      let city = ac[0]["short_name"];
      this.input_place = {
        name : place.formatted_address,
        lat : lat,
        lon : lon
      }
    });
  },
  watch : {
    islogin : function(val) {
      this.checkToken()
    }
  }
}
</script>

<style>

</style>
