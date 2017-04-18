<template>
  <div>
    <div>

      <div class="layout-breadcrumb">
        <Breadcrumb>
          <Breadcrumb-item>网关详情</Breadcrumb-item>
        </Breadcrumb>
      </div>

      <div class="layout-content">
        <div class="layout-content-main">
          <div id="usermapcontainer"></div>

          <div class="row">
            <div class=" col-xs-12 col-md-6 col-lg-6 card-container">
              <gateway-node :item="nodeitem"></gateway-node>
            </div>

            <div class=" col-xs-12 col-md-6 col-lg-6 card-container">

              <Card>
                <p slot="title" style="vertical-align: middle">网关参数</p>
                <p>geui:{{this.geui}}</p> <br>
                <p>role:{{this.role}}</p>
              </Card>

            </div>
          </div>

          <gateway-log :item="nodeitem"></gateway-log>

        </div>
      </div>

    </div>
  </div>
</template>
<style scoped lang="scss">
  .table-wrapper {
    overflow: scroll;
  }

  .method-wrapper {
    float: right;
    margin-bottom: 10px;
  }

  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
  }

  .card-container {
    margin-bottom: 20px;
  }
  p{
    margin: 0;
  }

</style>
<script>
  import api from '../api/apinew'

  export default{
    data(){
      return {
        geui: this.$route.query.geui,
        role: this.$route.query.role,
        nodeitem: {geui: this.geui, role: this.role}
      }
    },

    created: function () {
      this.nodeitem = {geui: this.geui, role: this.role};
    },

    mounted: function () {

    },
    methods: {},
    computed: {},
    components: {
      GatewayNode: require('../components/GatewayNode.vue'),
      GatewayLog:require('../components/GatewayLog.vue'),
    }
  }
</script>
