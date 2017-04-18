<template>
  <div>
    <div style="overflow-x:scroll;overflow-y:hidden;">
      <Table style="min-width: 700px" border
             :columns="column4" :data="logs"></Table>
    </div>
    <br>

    <Page page-size=20
                v-model="page"
          @on-change='pageChange'
          :total='totalCustomeNumber'
          show-elevator>
    </Page>


  </div>
</template>
<style>

</style>
<script>
  import api from '../api/apinew'
  export default{

    data(){
      return {
        logs: [],
        column4: [
          {
            title: 'ackr',
            key: 'ackr'
          },
          {
            title: 'dwnb',
            key: 'dwnb'
          },
          {
            title: 'rxfw',
            key: 'rxfw'
          },
          {
            title: 'rxnb',
            key: 'rxnb'
          },
          {
            title: 'rxok',
            key: 'rxok'
          },
          {
            title: 'txnb',
            key: 'txnb'
          },
          {
            title: 'long',
            key: 'long'
          },
          {
            title: 'lati',
            key: 'lati'
          },
          {
            title: 'time',
            key: 'time',
            render(row, column, index){
              var newDate = new Date();
              newDate.setTime(row.time * 1000);
              return newDate.toLocaleDateString()
            }
          }
        ],
        page: 1,
        totalCustomeNumber: 0
      }
    },
    props: {
      item: {
        type: Object
      }
    },

    mounted: function () {
      api.log.gatewaylognumber(
        {geui: this.item.geui, role: this.item.role},
        resp => {
          this.totalCustomeNumber = resp.info
        },
        error => {
        })
      this.getlogs(this.page)
    },
    methods: {
      pageChange: function (page) {
        this.getlogs(page)
      },

      getlogs: function (page) {
        api.log.gatewaylog(
          {geui: this.item.geui, role: this.item.role, page: page, num: 20},
          resp => {
            this.logs = resp.info
          }, error => {

          })
      }
    },
    components: {}
  }
</script>
