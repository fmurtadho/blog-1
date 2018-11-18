<template>
    <div class="card mb-4 border border-dark z-depth-1">
        <!-- <img class="card-img-top" v-bind:src="article.picture" alt="Card image cap"> -->
        <div class="card-body">
            <h3 class="mb-3 font-weight-bold dark-grey-text">
                <strong>{{article.title}}</strong>
            </h3>
            <small><i class="fas fa-clock"></i> {{ article.createdAt | moment("dddd, MMMM Do YYYY") }} by <router-link :to="`/author/${article.author._id}`">{{article.author.name}}</router-link></small>
            <hr class="mb-1">

            <!--Grid row-->
            <div class="row mt-3 wow fadeIn">

                <!--Grid column-->
                <div class="col-lg-5 col-xl-4 mb-4">
                    <!--Featured image-->
                    <div class="view overlay rounded z-depth-1">
                        <img v-bind:src="article.picture" class="img-fluid" alt="">
                        <a :href="article.picture" target="_blank">
                            <div class="mask rgba-white-slight"></div>
                        </a>
                    </div>
                </div>
                <!--Grid column-->

                <!--Grid column-->
                <div class="col-lg-7 col-xl-7 ml-xl-4 mb-4">
                    <p>{{contentPreview}}</p>
                    <router-link :to="`article/${article._id}`" class="btn btn-primary btn-md">Read More
                        <i class="fa fa-play ml-2"></i>
                    </router-link>
                </div>
                <!--Grid column-->

            </div>
            <!--Grid row-->
        </div>
        <div class="card-footer text-muted bg-white">
            <i class="fa fa-eye"> {{article.views}}</i>&nbsp;
            <i class="fa fa-map-marker-alt"> {{article.location.name}}</i>&nbsp;
        </div>
    </div>
</template>

<script>
export default {
    props : ['article'],
    data () {
        return {
            contentPreview : ''
        }
    },
    methods : {
        removeHtmlTag : function (){
            const regex = /(<([^>]+)>)/ig
            const body = this.article.content
            const result = body.replace(regex, "");
            this.contentPreview = result.slice(0,255) + '...'
        }
    },
    mounted () {
        this.removeHtmlTag()
    }
}
</script>
