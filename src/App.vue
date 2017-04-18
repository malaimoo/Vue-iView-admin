<template>
  <div id="app">
    <!--<keep-alive>-->
    <router-view></router-view>
    <!--</keep-alive>-->
  </div>
</template>

<script>
  export default {
    name: 'app',
//    created: function () {
    // appid 的缓存
//      this.$logger(this.$route.query.appid);
//      this.$logger('appvue created')
//      this.$store.dispatch('setAppId', this.$route.query.appid)
//    }
  }
</script>

<style>

</style>
