<template>
  <div class=" col-xs-12 col-md-6 col-lg-3 ">
    <div class="card">

      <div class="icon">
        <Icon type="android-wifi" size="98"></Icon>
      </div>

      <div class="content">
        <div class="content-inner">
          <p class="number">{{item.number.toString()}}</p>
          <p class="name">{{item.name}}</p>
        </div>
      </div>

    </div>

  </div>
</template>
<style scoped lang="scss">

  .card {
    color: white;
    border-radius: 5px;
    height: 100px;
    background: #5cadff;
    padding-right: 10px;
    margin-top: 20px;
    /*padding-left: 10px;*/
    .icon {
      display: inline-block;
      font-weight: 100;
      height: 100%;
      background: #3399ff;
      border-radius: 5px;
      padding-left: 5px;
      padding-right: 5px;
    }

    .content {
      display: inline-block;
      vertical-align: top;
      padding-left: 10px;
      height: 100px;

      .number {
        margin-top: 15px;
        font-size: 24px;
        font-weight: 600;
      }
      .name {
        font-size: 16px;
      }
    }
  }

</style>
<script>

  export default{
    data(){
      return {}
    },
    props: {
      item: {
        type: Object,
        required: true,
        default:{
            number:0
        }
      }
    },


    mounted: function () {

    },
    components: {}
  }
</script>
