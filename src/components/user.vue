<template>
  <div>
    <Dropdown trigger="click" style="margin-left: 20px" placement="bottom-end">

      <a href="javascript:void(0)">
        <img class="headicon" :src="user.headimgurl" alt="">
      </a>

      <Dropdown-menu slot="list">
        <Dropdown-item disabled>{{ user.nickname}}</Dropdown-item>
        <Dropdown-item  @click.native="logout">注销</Dropdown-item>
      </Dropdown-menu>

    </Dropdown>

  </div>
</template>

<style scoped>
  .headicon {
    vertical-align: middle;
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  .username {
    text-align: center;
  }
</style>

<script>

  import {mapGetters, mapActions}  from 'vuex'
  import api from '../api/apinew'

  export default{
    data(){
      return {}
    },
    computed: mapGetters({
      user: 'getUserwx'
    }),

    mounted: function () {
      if (!this.$store.getters.getUserwx.length) {
        this.$store.dispatch('fetchUser').then(() => {
        })
      } else {
      }
    },

    methods: {
      logout: () => {
        api.user.logout({}, resp => {
          window.location.href = 'http://keliupc.mncats365.com/login.html';
        })
      }
    },
    components: {}
  }
</script>
