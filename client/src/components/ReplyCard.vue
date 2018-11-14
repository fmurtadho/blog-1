<template>
    <section class="my-5">

        <!-- Leave a reply -->
        <div class="card-header border-0 font-weight-bold">Leave a reply</div>

        <!-- Default form reply -->
        <div class="px-1 mt-4">

            <!-- Comment -->
            <div class="form-group">
                <label for="replyFormComment">Your comment</label>
                <textarea v-model="inputComment" class="form-control" id="replyFormComment" rows="5"></textarea>
            </div>

            <div class="text-center mt-4">
                <button v-on:click="submitComment()" class="btn btn-primary btn-md">Post</button>
            </div>

        </div>
        <!-- Default form reply -->

    </section>
</template>

<script>
import config from '@/config.js'

export default {
    data(){
        return {
            inputComment : ''
        }
    },
    methods : {
        submitComment(){

            let self = this

            axios({
                method: 'POST',
                url: `${config.port}/comments/${this.$route.params.articleId}`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    thecomment: self.inputComment
                }
            })
            .then((response) => {
                self.inputComment = ''
                this.$emit('trigger',response)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

