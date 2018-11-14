<template>
    <div class="card my-4">
        <h5 class="card-header elegant-color text-white">Search</h5>
        <div class="card-body">
            <div class="input-group">
                <input type="text" class="form-control" v-model="input_search" placeholder="Search for...">
                <span class="input-group-btn">
                    <button class="btn btn-elegant waves-effect btn-sm my-0 ml-sm-2 mt-1" type="button" @click="runSearch()"><i
                            class="fas fa-search"></i></button>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import config from '@/config.js'

export default {
    data (){
        return {
            input_search : ''
        }
    },
    methods : {
        runSearch(){
            let self = this

            axios({
                method: 'GET',
                url: `${config.port}/articles/search?keyword=${self.input_search}`
            })
            .then((response) => {
                // console.log('result di search widget',response)
                self.$emit('search-result', response.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>
