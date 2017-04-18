<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }

  .layout-menu-left {
    background: white;
    position: fixed;
    width: 200px;
    height: 100%;
    border-right: 1px solid lightgray;
  }

  .layout-content-right {
    margin-left: 200px;
    position: relative;
  }

  .layout-header {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    /*position: fixed;*/
    /*top: 0px;*/
    /*left: 0px;*/
    /*width: 100%;*/
    /*padding-right: 200px;*/
  }

  .layout-logo-left {
    width: 90%;
    height: 30px;
    background: white;
    border-radius: 3px;
    margin: 15px auto;
  }

  .layout-logo-left p {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
  }

  .user-banner {
    float: right;
    vertical-align: middle;
    padding: 6px 15px;
  }

  .user-banner-icon {
    vertical-align: middle
  }

  .user-banner-message {
    margin-right: 20px
  }

  .ivu-menu-vertical.ivu-menu-light:after {
    background: none;
  }

  .layout-mobile-content {
    margin-left: 0px;
  }

  .layout-mobile-menu {
    display: none;
  }

  a {
    text-decoration: none;
  }

</style>
<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
    <div>

      <div class="layout-menu-left" :class="{'layout-mobile-menu' : isLeftHiden}">

        <Menu active-name="1-2" width="auto" :open-names="['1']">

          <div class="layout-logo-left">
            <p>Vue Gentelella</p>
          </div>

          <Menu-item @click.native="goto('/Home')" name="1-1">
            <Icon type="ios-keypad">
            </Icon>
            主页
          </Menu-item>

          <Submenu name="2">

            <template slot="title">
              <Icon type="ios-keypad"></Icon>
              网关
            </template>

            <Menu-item @click.native="goto('/GatewayAdmin')" name="2-1">管理</Menu-item>


            <Menu-item @click.native="goto('/GatewayUser')" name="2-2">用户</Menu-item>

          </Submenu>


          <Submenu name="3">

            <template slot="title">
              <Icon type="ios-analytics"></Icon>
              节点
            </template>

            <Menu-item @click.native="goto('/NodeAdmin')" name="3-1">管理</Menu-item>

            <Menu-item @click.native="goto('/NodeUser')" name="3-2">用户</Menu-item>

          </Submenu>


        </Menu>
      </div>

      <div class="layout-content-right " :class="{'layout-mobile-content' : isLeftHiden}">

        <div class="layout-header">
          <i-button type="text" @click="toggleClick">
            <Icon type="navicon" size="30"></Icon>
          </i-button>

          <div class="user-banner">
            <Badge class="user-banner-message">
              <!--<Icon type="ios-email-outline" size="30"></Icon>-->
            </Badge>

            <Icon class="user-banner-icon" type="ios-person-outline" size="30"></Icon>

            <Dropdown trigger="click">
              <a href="javascript:void(0)">
                {{username}}
                <Icon type="arrow-down-b"></Icon>
              </a>
              <Dropdown-menu slot="list">
                <Dropdown-item @click.native="logout">注销</Dropdown-item>
                <!--<Dropdown-item>账户设置</Dropdown-item>-->
              </Dropdown-menu>
            </Dropdown>
          </div>
        </div>
        <keep-alive>
          <router-view></router-view>

        </keep-alive>

        <div class="layout-copy">
          2011-2016 &copy; iSenLoRa
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        spanLeft: 5,
        spanRight: 19,
        isLeftHiden: false,
        username: ''
      }
    },

    components: {},

    beforeMount () {
      const {body} = document
      const WIDTH = 768;
      const RATIO = 3;
      const handler = () => {
        if (!document.hidden) {
          let rect = body.getBoundingClientRect()
          let isMobile = rect.width - RATIO < WIDTH
          this.togglemobileauto(isMobile)
        }
      }
      document.addEventListener('visibilitychange', handler)
      window.addEventListener('DOMContentLoaded', handler)
      window.addEventListener('resize', handler);
    },
    mounted () {
      this.username = sessionStorage.getItem('username')
    },
    computed: {
      iconSize () {
        return this.spanLeft === 5 ? 14 : 24;
      }
    },
    methods: {
      toggleClick () {
        this.isLeftHiden = !this.isLeftHiden;
      },
      togglemobileauto(ismobile){
        this.isLeftHiden = ismobile
      },
      logout(){
        sessionStorage.removeItem('smartkitusername');
        this.$router.replace('Login')
      },
      goto(next){
        this.$router.push(next)
      }
    }
  }
</script>
