<template>
  <div class="google-map" :id="mapName" style="width:100%;max-height:500px"></div>
</template>

<script>
export default {
  name: 'google-map',
  props: ['name','place'],
  data: function () {
    return {
        mapName: this.name + "-map"
    }
  },
  methods : {
      getMap(){
        const latitude = Number(this.place.lat)
        const longitude = Number(this.place.lon)

        // const bounds = new google.maps.LatLngBounds();
    
        const element = document.getElementById(this.mapName)
        const options = {
        zoom: 16,
        center: new google.maps.LatLng(latitude,longitude)
        }
        const map = new google.maps.Map(element, options);

        const position = new google.maps.LatLng(latitude, longitude);

        const marker = new google.maps.Marker({
            position,
            map
        });

        // map.fitBounds(bounds.extend(position))
      }
  },
  mounted: function () {
    this.getMap()
  },
  watch : {
      place : function(val){
          this.getMap()
      }
  }
};
</script>

<style scoped>
.google-map {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  background: gray;
}
</style>