<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <Breadcrumb-item href="#">首页</Breadcrumb-item>
        欢迎使用 iSenLora


      </Breadcrumb>
    </div>
    <div class="layout-content">
      <div class="layout-content-main">

        <div class="row">
          <lora-dot-card :item='admingateway'></lora-dot-card>
          <lora-dot-card :item='usergateway'></lora-dot-card>
          <lora-dot-card :item='adminnode'></lora-dot-card>
          <lora-dot-card :item='usernode'></lora-dot-card>
        </div>

        <div class="map">
          <p class="title"> 管理网关分布 </p>
          <div id="adminmapcontainer"></div>
          <br>
          <br>
          <p class="title"> 用户网关分布 </p>
          <div id="usermapcontainer"></div>
        </div>
      </div>
    </div>
  </div>

</template>
<style scoped lang="scss">
  .map {
    padding: 30px 0px;
    .title {
      font-size: 17px;
      font-weight: 700;
    }
    #adminmapcontainer {
      height: 500px;
      width: 100%;
    }
    #usermapcontainer {
      height: 500px;
      width: 100%;
    }
  }
</style>
<script>

  import api from '../api/apinew'

  export default{
    data(){
      return {
        admingateway: {number: 0},
        usergateway: {number: 0},
        adminnode: {number: 0},
        usernode: {number: 0},
      }
    },
    mounted: function () {


      api.gateway.getNumber({}, resp => {
        this.admingateway.number = resp.info.toString();
        this.admingateway.name = '网关（管理）';
      }, error => {
      })


      api.gatewayuser.getNumber({}, resp => {
        this.usergateway.number = resp.info.toString();
        this.usergateway.name = '网关（用户）';
      }, error => {
      })

      api.node.getNumber({}, resp => {
        this.adminnode.number = resp.info.toString();
        this.adminnode.name = '节点（管理）';
      }, error => {
      })


      api.nodeuser.getNumber({}, resp => {
        this.usernode.number = resp.info.toString();
        this.usernode.name = '节点（用户）';
      }, error => {
      })


      api.log.position({role: 'admin'}, resp => {
        var usermap = new BMap.Map("adminmapcontainer");          // 创建地图实例

        if (resp.info.length) {
          resp.info.forEach(function (item, index, aray) {
            var point = new BMap.Point(item.long, item.lati);
            var marker = new BMap.Marker(point);
            usermap.addOverlay(marker);
          })

          var point2 = new BMap.Point(resp.info[0].long, resp.info[0].lati);  // 创建点坐标
          usermap.centerAndZoom(point2, 15);
          usermap.enableScrollWheelZoom();
          usermap.enableContinuousZoom();
        }
      }, error => {
      })

      api.log.position({role: 'user'}, resp => {
        var usermap = new BMap.Map("usermapcontainer");          // 创建地图实例

        resp.info.forEach(function (item, index, aray) {
          var point = new BMap.Point(item.long, item.lati);
          var marker = new BMap.Marker(point);
          usermap.addOverlay(marker);
        });

        var point2 = new BMap.Point(resp.info[0].long, resp.info[0].lati);  // 创建点坐标
        usermap.centerAndZoom(point2, 15);
        usermap.enableScrollWheelZoom();
        usermap.enableContinuousZoom();
      }, error => {
      })
    },
    components: {
      loraDotCard: require('../components/LoraDotCard.vue')
    }

  }
</script>
