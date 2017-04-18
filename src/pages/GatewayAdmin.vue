<template>
  <div>
    <div>

      <div class="layout-breadcrumb">
        <Breadcrumb>
          <Breadcrumb-item href="#">网关</Breadcrumb-item>
          <Breadcrumb-item href="#">管理</Breadcrumb-item>
        </Breadcrumb>
      </div>

      <div class="layout-content">
        <div class="layout-content-main">

          <div class="method-wrapper ">
            <Button @click.native='deleteSel' type="warning">删除选中</Button>
            <!--<Button @click.native="selectedSelection.length?(updateGatewaymodel = true):''" type="info">批量升级</Button>-->
            <Button @click.native="createGateway = true" type="success">生成</Button>
            <!--<Button type="info">导入</Button>-->
          </div>

          <div class="clearfix"></div>

          <div class="table-wrapper">
            <Table @on-selection-change="tableSelChange" @on-select="tableSel" style="min-width: 700px" border
                   :columns="columns4" :data="gateways"></Table>
          </div>
        </div>
      </div>
    </div>


    <!--todo 将表单数据包到一个 object 里-->
    <Modal
      v-model="createGateway"
      title="生成网关"
      @on-ok="createGatewayok">
      <i-form :label-width="60">
        <Form-item label="数量">
          <Input-number :min="1" v-model="gateWayNumber"></Input-number>
        </Form-item>

        <Form-item label="类型">
          <Select v-model="selGatewayType">
            <Option v-for="item in gatewaytypes" :value="item.id" :key="item">{{ item.name }}</Option>
          </Select>
        </Form-item>

        <Form-item label="别名">
          <Input v-model="gateWayalias" placeholder="请输入"> </Input>
        </Form-item>
      </i-form>
    </Modal>




    <Modal
      v-model="editgatewaymodel"
      title="编辑网关"
      @on-ok="editgatewaymodelok">
      <i-form :label-width="60">

        <Form-item label="geui">
          {{gatewayToEdit.geui}}
        </Form-item>

        <Form-item label="型号">
          <Select v-model="gatewayToEdit.type">
            <Option v-for="item in gatewaytypes" :value="item.id" :key="item">{{ item.name }}</Option>
          </Select>
        </Form-item>

        <Form-item label="别名">
          <Input v-model="gatewayToEdit.alias" placeholder="请输入"> </Input>
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
            title: '别名',
            key: 'alias'
          },
          {
            title: '验证码',
            key: 'captcha'
          },
          {
            title: '创建时间',
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
<i-button type="ghost" size="small" @click="selinfo(${index})"><Icon type="information-circled"></Icon></i-button>
<i-button type="ghost" type="primary" size="small" @click="editOne(${index})"><Icon type="ios-compose"></Icon></i-button>
<i-button type="ghost" size="small" @click="updateOne(${index})"><Icon type="android-arrow-up"></Icon></i-button>
<i-button type="ghost" size="small" @click="restartOne(${index})"><Icon type="android-refresh"></Icon></i-button>
<i-button type="ghost" size="small" @click="deleteOne(${index})"><Icon type="android-delete"></Icon></i-button>`;
            }
          }
        ],
        gateways: [],
        selectedSelection: [],
        createGateway: false,
        updateGatewaymodel: false,
        gateWayNumber: 1,
        gatewaytypes: [
          {
            label: 'GW1000',
            id: '1'
          },
          {
            label: 'GW5000',
            id: '2'
          },
          {
            label: 'GW8000',
            id: '3'
          },
          {
            label: 'GW3000',
            id: '4'
          }],
        selGatewayType: '',
        gateWayalias: '',
        selGatewayUpdateVersion: '',
        gatewayToEdit: {},
        editgatewaymodel: false,
        toupdateType:{}
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

      this.getallgateway();
      api.gatewaytype({}, resp => {
        this.gatewaytypes = resp.info
      }, error => {
      });

      api.gatewaytype({}, resp => {
        this.gatewayversions = resp.info
      }, error => {
      });

    },
    methods: {
      tableSel: function (section, row) {
        this.selectedSelection = section;
      },
      tableSelChange: function (section) {
        this.selectedSelection = section;
      },
      deleteSel: function () {
        var geuiarray = this.selectedSelection.map(function (item, index, array) {
          return item.geui
        });
        this.deleteFromsever(geuiarray)
      },
      getallgateway: function () {
        api.gateway.getall({}, resp => {
          this.gateways = resp.info
        }, error => {
        });
      },
      editOne: function (index) {
        this.gatewayToEdit = this.gateways[index];
        this.editgatewaymodel = true;
      },

      editgatewaymodelok: function () {
        api.gateway.edit({
          alias: this.gatewayToEdit.alias,
          gw_type: this.gatewayToEdit.type,
          geui: this.gatewayToEdit.geui,
          version: this.gatewayToEdit.version
        }, resp => {
          this.$Message.success('修改成功')
        }, error => {
        })
      },

      updateOne: function (index) {
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
      restartOne: function (index) {
        var item = this.gateways[index];

        this.$Modal.confirm({
          title: '重启',
          content: '确定重启吗',
          onOk: () => {
            api.gateway.opera(
              {fn_name: 'reboot', geui: item.geui}, resp => {
                this.$Message.success('重启成功')
              }, error => {
              })
          },
          onCancel: () => {
          }
        });

      },
      deleteOne: function (index) {
        var item = this.gateways[index];
        this.deleteFromsever([item.geui])
      },

      deleteFromsever: function (items) {

        this.$Modal.confirm({
          title: '删除',
          content: '确定删除吗',
          onOk: () => {
            api.gateway.delete({
              geui: items
            }, resp => {
              this.getallgateway();
            }, error => {
            })
          },
          onCancel: () => {
          }
        });
      },


      createGatewayok: function () {
//          todo 输入验证
        api.gateway.create({
          num: this.gateWayNumber,
          gw_type: this.selGatewayType,
          alias: this.gateWayalias,
        }, resp => {
          api.gateway.getall({}, resp => {
            this.gateways = resp.info
          }, error => {
          });
        }, error => {
        })
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

      selinfo: function (index) {
        var item = this.gateways[index];
        this.$router.push('GateWayAdminInfo?role=admin&geui=' + item.geui)
      },

      versionoftype: function (type) {
        return this.gatewayversions.filter(function (item, index, array) {
          return {version: item.version, id: item.id}
        })
      }


    },

    computed: mapGetters({
      gatewayversions: 'getGatewayversion',
      gatewaytypes: 'getGatewaytype'
    }),

    components: {}
  }
</script>
