<template>
  <div>
    <Table border :columns="logcolum" :data="logs"></Table>

    <br>

    <Page page-size=20
                  v-model="page"
          @on-change='pageChange'
          :total='totalLogNumber'
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
        logcolum: [

          {
            title: 'max_rssi',
            key: 'max_rssi'
          }, {
            title: 'mtype',
            key: 'mtype'
          }, {
            title: 'userdata',
            key: 'userdata',
// todo 数据的级联显示
//            render(row, column, index){
//              return `<Tree v-model=` + row +`></Tree>`
//            },
          },
          {
            title: 'gwtx',
            key: 'gwtx'
          },
        ],
        logs: [],
        totalLogNumber: 0,
        page: 1
      }
    },
    props: {
      item: {
        type: Object,
        default: {},
      }
    },

    mounted: function () {
      api.log.nodelognumber({
        deui: this.item.deui,
        role: this.item.role,
      }, resp => {
        this.totalLogNumber = resp.info
      }, error => {
      });
      this.getpagelogs()
    },
    methods: {
      pageChange: function (page) {
          this.page = page;
        this.getpagelogs();
      },

      getpagelogs: function () {
        api.log.nodelog(
          {
            deui: this.item.deui,
            role: this.item.role,
            page: this.page,
            num: 20
          },
          resp => {
            this.logs = resp.info
          },
          error => {
          })
      }
    },


    components: {}
  }
</script>
