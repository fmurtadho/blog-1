<template>
    <div class="accordion" id="accordionExample">
        <div class="card z-depth-0">
            <div class="card-header" id="headingTwo">
                <h5 class="mb-0 text-center">
                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo"
                        aria-expanded="false" aria-controls="collapseTwo">
                        <strong>Show Related Youtube Videos</strong>
                    </button>
                </h5>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                <div class="card-body row d-flex justify-content-around">
                    <div class="col-md-4" v-for="(video,index) in videos" :key="index">
                        
                        <div class="card" @click="openVid(video.id.videoId)" style="cursor:pointer">
                            <div class="card-header text-center">
                                <small>{{video.snippet.title}}</small>
                            </div>
                            <div class="card-body row d-flex justify-content-center">
                                <img :src="video.snippet.thumbnails.default.url">
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
.<script>
export default {
    props : ['location'],
    data (){
        return {
            videos : ''
        }
    },
    methods : {
        openVid(videoId){
            window.open(`https://www.youtube.com/watch?v=${videoId}`)
        },
        getRelatedVideos() {
            console.log('get related videos...')

            let self = this
            
            let title = self.location.name
            
            let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=3&q=${title}&key=`
            console.log('url to go',url)

            axios({
                    method: 'GET',
                    url
                })
                .then((response)=>{
                    self.videos = response.data.items
                })
                .catch((error)=>{
                    console.log(error)
                })
        }
    },
    mounted (){
        this.getRelatedVideos()
    }
}
</script>

