<template>
    <div class="media d-block d-md-flex mt-3 border-bottom">
        <img class="card-img-64 d-flex mx-auto mb-3" :src="comment.user.avatar" alt="Generic placeholder image">
        <div class="media-body text-center text-md-left ml-md-3 ml-0">
            <h5 class="font-weight-bold mt-0">
                <a href="">{{comment.user.name}}</a>
                <a href="" class="pull-right">
                    <!-- <i class="fa fa-reply"></i> -->
                </a>
            </h5>
            
            <div class="row d-flex flex-row ml-2 mr-2">
                <p>{{comment.thecomment}}</p>
                <button v-if="comment.user._id === currentUser" class="btn-sm btn-danger ml-auto p-2" v-on:click="deleteComment(comment._id)"><i class="fa fa-trash" aria-hidden="true"></i></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props : ['comment','deleteComment','currentUser'],
    data (){
        return {
            
        }
    }
}
</script>

