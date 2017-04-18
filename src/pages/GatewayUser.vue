<template>
  <div>
    <div>

      <div class="layout-breadcrumb">
        <Breadcrumb>
          <Breadcrumb-item href="#">网关</Breadcrumb-item>
          <Breadcrumb-item href="#">用户</Breadcrumb-item>
        </Breadcrumb>
      </div>

      <div class="layout-content">
        <div class="layout-content-main">

          <div class="method-wrapper ">
            <!--<Button type="warning" @click.native="deleteSelsections">删除选中</Button>-->
            <!--<Button type="info" >批量升级</Button>-->
            <Button @click.native="createGatewayModel = true" type="success">添加</Button>
          </div>

          <div class="clearfix"></div>

          <div class="table-wrapper">
            <Table @on-selection-change="tableSelChange" @on-select="tableSel" style="min-width: 700px" border
                   :columns="columns4" :data="gateways"></Table>
          </div>

        </div>
      </div>
    </div>


    <Modal
      v-model="createGatewayModel"
      title="生成网关"
      @on-ok="createGatewayok">
      <i-form :label-width="60">
        <Form-item label="geui">
          <Input v-model="gateWaygeui" placeholder="请输入"> </Input>
        </Form-item>

        <Form-item label="验证码">
          <Input v-model="gateWayauthcode" placeholder="请输入"> </Input>
        </Form-item>
      </i-form>
    </Modal>


    <Modal
      v-model="updateGatewaymodel"
      title="升级"
      @on-ok="updateGatewayOk">
      <i-form :label-width="60">

        <Form-item :label="toupdateType.name">
          <Select v-model="selGatewayUpdateVersion">
            <Option v-for="item in toupdateType.vers" :value="item.id" :key="item">{{ item.version }}</Option>
          </Select>
        </Form-item>

      </i-form>

    </Modal>


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
</style>
<script>

  import api from '../api/apinew'
  import {mapGetters} from 'vuex'


  export default{
    data(){
      return {
        columns4: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: 'geui',
            key: 'geui'
          },
          {
            title: '类型',
            key: 'type',
            render(row, column, index){
              var typemap = {"1": 'GW1000', "2": 'GW5000', '3': 'GW8000', '4': 'GW3000'}
              return typemap[row.type]
            },
            filters: [
              {
                label: 'GW1000',
                value: '1'
              },
              {
                label: 'GW5000',
                value: '2'
              },
              {
                label: 'GW8000',
                value: '3'
              },
              {
                label: 'GW3000',
                value: '4'
              }
            ],
            filterMethod (value, row) {
              return row['type'] == value;
            }
          },
          {
            title: '添加时间',
            key: 'time',
            render(row, column, index){
              var newDate = new Date();
              newDate.setTime(row.time * 1000);
              return newDate.toLocaleDateString()
            }
          },
          {
            title: '版本',
            key: 'version'
          },
          {
            title: '操作',
            key: 'action',
            width: 180,
            align: 'center',
            render (row, column, index) {
              return `
<i-button type="ghost" size="small" @click="show(${index})"><Icon type="information-circled"></Icon></i-button>
 <i-button type="ghost" type="primary" ref="重启" size="small" @click="restartgateway(${index})"><Icon type="android-refresh"></Icon></i-button>
<i-button type="ghost" size="small" @click="updategateway(${index})"><Icon type="android-arrow-up"></Icon></i-button>
<i-button type="ghost" size="small" @click="deletegateway(${index})"><Icon type="android-delete"></Icon></i-button>
`;
            }
          }
        ],
        gateways: [],
        selectedSelection: [],
        createGatewayModel: false,
        gateWaygeui: '',
        gateWayauthcode: '',
        toupdateType: {vers: []},
        selGatewayUpdateVersion: '',
        updateGatewaymodel: false
      }
    },

    created: function () {
      if (!this.$store.getters.getGatewayversion.length) {
        this.$store.dispatch('fetchGatewayversion').then(() => {
        })
      }
      if (!this.$store.getters.getGatewaytype.length) {
        this.$store.dispatch('fetchGatewaytype').then(() => {
        })
      }
    },

    mounted: function () {
      api.gatewayuser.getall({}, resp => {
        this.gateways = resp.info;
      }, error => {
      })
    },
    methods: {
      tableSel: function (section, row) {
        this.selectedSelection = section;
      },
      tableSelChange: function (section) {
        this.selectedSelection = section;
      },
      deleteSelsections: function () {
// todo 删除选中
      },

      createGatewayok: function () {
//          todo 验证输入
        api.gatewayuser.create({
          geui: this.geui,
          captcha: this.gateWayauthcode
        }, resp => {
          this.$Message.success('添加成功')
        }, error => {
          this.$Message.success('添加失败')
        })
      },
      restartgateway: function (index) {
        var item = this.gateways[index];
        this.$Modal.confirm({
          title: '重启',
          content: '确定重启吗',
          onOk: () => {
            api.gatewayuser.opera({fn_name: 'reboot', geui: item.geui}, resp => {
              this.$Message.success('重启成功')
            }, error => {
            })
          },
          onCancel: () => {
          }
        });
      },

      updategateway: function (index) {
        let selitem = this.gateways[index];
        this.toupdateType.vers = this.gatewayversions.filter(function (item, index, array) {
          if (item.type == selitem.type) {
            return true;
          }
        });
        let maptype = this.gatewaytypes.filter(function (item, index, array) {
          if (item.id == selitem.type) {
            return true;
          }
        });
        this.toupdateType.name = maptype[0].name;
        this.toupdateType.typeid = maptype[0].id;
        this.toupdateType.geui = selitem.geui;

        this.updateGatewaymodel = true;
      },

      deletegateway: function (index) {
        var item = this.gateways[index];
        this.$Modal.confirm({
          title: '删除',
          content: '确定删除吗',
          onOk: () => {
            api.gatewayuser.delete(
              {geui:[item.geui]},
              resp => {
                this.$Message.success('删除成功');
                this.gateways.splice(index,1);
              },
              error = {
              })
          },
          onCancel: () => {
          }
        });
      },
      show: function (index) {
        var item = this.gateways[index];
        this.$router.push('GateWayAdminInfo?role=user&geui=' + item.geui)
      },

      updateGatewayOk: function () {
        var string = {
          2: {// todo 修改2为实际值。
            geui: [this.toupdateType.geui],
            type: this.toupdateType.typeid,
            version: this.selGatewayUpdateVersion
          }
        }
        api.gatewayuser.update({data: string}, resp => {
          this.$Message.success('保存成功')
        }, error => {
        })
      },

    },

    computed: mapGetters({
      gatewayversions: 'getGatewayversion',
      gatewaytypes: 'getGatewaytype'
    }),

    components: {}
  }
</script>
