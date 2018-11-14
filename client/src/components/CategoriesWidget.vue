<template>
    <div class="card my-4">
        <h5 class="card-header elegant-color text-white">Categories</h5>
        <div class="card-body">
            <div class="row">
                <div class="col-lg-3 col-md-4 col-sm-6" v-for="(category, index) in categories" :key="index">
                    <button style="cursor:pointer" class=" view overlay btn-sm btn-outline-elegant" @click="getByCategory(category._id)">
                        {{category.name}}
                        <div class="mask flex-center rgba-black-strong">
                            
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import config from '@/config.js'

export default {
    data () {
        return {
            categories : ''
        }
    },
    methods : {
        getCategories () {

            let self = this

            axios({
                method: 'GET',
                url: `${config.port}/categories/`
            })
            .then((response) => {
                this.categories = response.data
            })
            .catch((err) => {
                console.log(err)
            })
        },
        getByCategory (id) {

            let self = this

            axios({
                method: 'GET',
                url: `${config.port}/articles/bycategory/${id}`
            })
            .then((response) => {
                self.$emit('category-result', response.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },
    created (){
        this.getCategories()
    }
}
</script>

