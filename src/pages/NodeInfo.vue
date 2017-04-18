<template>
  <div>
    <div>

      <div class="layout-breadcrumb">
        <Breadcrumb>
          <Breadcrumb-item>节点详情</Breadcrumb-item>
        </Breadcrumb>
      </div>

      <div class="layout-content">
        <div class="layout-content-main">


          <div id="nodemapcontainer"></div>

          <br>
          <div class="row">
            <div class="col-xs-12 col-md-6 col-lg-4 card-container">
              <Card>
                <p slot="title" style="vertical-align: middle">可用网关列表</p>
                <Table border :columns="columns4" :data="vallidateGateways"></Table>
              </Card>
            </div>

            <div class=" col-xs-12 col-md-6 col-lg-4 card-container">

              <Card>
                <p slot="title" style="vertical-align: middle">节点详细</p>

                <Form :label-width="60">
                  <Form-item v-for="(value, key) in nodeinfo" :label="key">
                    {{value}}
                  </Form-item>
                </Form>

              </Card>
            </div>
          </div>

          <node-log :item = 'nodeitem'></node-log>

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

  p {
    margin: 0;
  }
  #nodemapcontainer {
    height: 500px;
    width: 100%;
  }
</style>
<script>
  import api from '../api/apinew'
  export default{
    data(){
      return {
        deui: this.$route.query.deui,
        role: this.$route.query.role,
        columns4: [

          {
            title: 'geui',
            key: 'geui'
          }, {
            title: 'chan',
            key: 'chan'
          }, {
            title: 'lsnr',
            key: 'lsnr'
          },
          {
            title: 'rfch',
            key: 'rfch'
          },
          {
            title: 'rssi',
            key: 'rssi'
          },
          {
            title: 'time',
            key: 'time',
            render(row, column, index){
              var newDate = new Date();
              newDate.setTime(row.time * 1000);
              return newDate.toLocaleDateString()
            }
          },
        ],
        vallidateGateways: [],
        nodeinfo: {},
        nodeitem:{}
      }
    },

    created: function () {
      this.nodeitem = {deui: this.deui, role: this.role};
    },

    activated:function () {
        this.deui = this.$route.query.deui;
        this.role = this.$route.query.role;
      this.nodeitem = {deui: this.deui, role: this.role};


    },

    mounted: function () {

      api.nodeuser.info({
        deui: this.deui
      }, resp => {
        this.nodeinfo = resp.info;
      }, error => {
      });


      api.log.position({role:this.role,deui:this.deui}, resp => {
        var usermap = new BMap.Map("nodemapcontainer");          // 创建地图实例

        if (resp.info.length) {
          resp.info.forEach(function (item, index, aray) {
            var point = new BMap.Point(item.long, item.lati);
            var marker = new BMap.Marker(point);
            usermap.addOverlay(marker);
          });

          var point2 = new BMap.Point(resp.info[0].long, resp.info[0].lati);  // 创建点坐标
          usermap.centerAndZoom(point2, 15);
          usermap.enableScrollWheelZoom();
          usermap.enableContinuousZoom();
        }
      }, error => {
      })
    },


    methods: {},
    computed: {},
    components: {
      NodeLog: require('../components/NodeLog.vue'),
    }

  }
</script>
