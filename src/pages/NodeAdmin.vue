<template>
  <div>
    <div>

      <div class="layout-breadcrumb">
        <Breadcrumb>
          <Breadcrumb-item href="#">节点</Breadcrumb-item>
          <Breadcrumb-item href="#">管理</Breadcrumb-item>
        </Breadcrumb>
      </div>

      <div class="layout-content">
        <div class="layout-content-main">

          <div class="method-wrapper ">
            <!--<Button type="warning">删除选中</Button>-->
            <Button @click.native="createnodemodel = true" type="success">生成</Button>
          </div>

          <div class="clearfix"></div>

          <div class="table-wrapper">
            <Table style="min-width: 700px" border :columns="columns4" :data="nodes"></Table>
          </div>

        </div>
      </div>


    </div>


    <Modal
      v-model="createnodemodel"
      title="生成节点"
      @on-ok="createNodeok">
      <i-form :label-width="60">
        <Form-item label="数量">
          <Input-number :min="1" v-model="nodeNumber"></Input-number>
        </Form-item>

        <Form-item label="类型">
          <Select v-model="selnodeType">
            <Option v-for="item in nodetypes" :value="item.id" :key="item">{{ item.name }}</Option>
          </Select>
        </Form-item>
      </i-form>
    </Modal>


    <Modal
      v-model="editNodeModel"
      title="编辑节点"
      @on-ok="editNodeok">
      <i-form :label-width="60">
        <Form-item label="deui">
          <Input v-model="selNodetoEdit.deui" disabled></Input>
        </Form-item>
        <Form-item label="类型">
          <Select v-model="selNodetoEdit.type">
            <Option v-for="item in nodetypes" :value="item.id" :key="item">{{ item.name }}</Option>
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
            title: 'Deui',
            key: 'deui'
          }, {
            title: 'netid',
            key: 'netid'
          }, {
            title: 'addr',
            key: 'devaddr'
          },
          {
            title: '类型',
            key: 'type',
            render(row, column, index){
              var typemap = {"1": '警报器', "5": '测试'}
              return typemap[row.type]?typemap[row.type]:''
            },
            filters: [
              {
                label: '警报器',
                value: '1'
              },
              {
                label: '测试',
                value: '5'
              },
            ],
            filterMethod (value, row) {
              return row['type'] == value;
            }
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
            title: '操作',
            key: 'action',
            width: 180,
            align: 'center',
            render (row, column, index) {
              return `
<i-button type="ghost" size="small" @click="show(${index})"><Icon type="information-circled"></Icon></i-button>
 <i-button type="ghost" type="primary" size="small" @click="editOne(${index})"><Icon type="ios-compose"></Icon></i-button>
<i-button type="ghost" size="small" @click="deleteOne(${index})"><Icon type="android-delete"></Icon></i-button>
`;
            }
          }
        ],
        nodes: [
          {
            "deui": "ffffff000002b995",
            "netid": "",
            "devaddr": "",
            "appkey": "mJKbkvCeLa9nbWRtD2HSUA==",
            "nskey": "",
            "askey": "",
            "captcha": "hguszhyuoj",
            "time": 1490163606,
            "type": 1
          }, {
            "deui": "ffffff000002b994",
            "netid": "",
            "devaddr": "",
            "appkey": "mJKbkvCeLa9nbWRtD2HSUA==",
            "nskey": "",
            "askey": "",
            "captcha": "zmd3wvumpk",
            "time": 1490163498,
            "type": 5
          }, {
            "deui": "ffffff000002b993",
            "netid": "",
            "devaddr": "",
            "appkey": "mJKbkvCeLa9nbWRtD2HSUA==",
            "nskey": "",
            "askey": "",
            "captcha": "vvrs52no88",
            "time": 1490163498,
            "type": 5
          }, {
            "deui": "ffffff000002b992",
            "netid": "",
            "devaddr": "",
            "appkey": "mJKbkvCeLa9nbWRtD2HSUA==",
            "nskey": "",
            "askey": "",
            "captcha": "6unvjfesum",
            "time": 1490163498,
            "type": 5
          }, {
            "deui": "ffffff000002b991",
            "netid": "",
            "devaddr": "",
            "appkey": "mJKbkvCeLa9nbWRtD2HSUA==",
            "nskey": "",
            "askey": "",
            "captcha": "415jinhpp3",
            "time": 1490163498,
            "type": 5
          }, {
            "deui": "ffffff000002b990",
            "netid": "",
            "devaddr": "",
            "appkey": "mJKbkvCeLa9nbWRtD2HSUA==",
            "nskey": "",
            "askey": "",
            "captcha": "sff6bwb1bo",
            "time": 1490163498,
            "type": 5
          }, {
            "deui": "ffffff000002b98f",
            "netid": "",
            "devaddr": "",
            "appkey": "mJKbkvCeLa9nbWRtD2HSUA==",
            "nskey": "",
            "askey": "",
            "captcha": "7qyjw14eim",
            "time": 1490163498,
            "type": 5
          }, {
            "deui": "ffffff000002b98e",
            "netid": "",
            "devaddr": "",
            "appkey": "mJKbkvCeLa9nbWRtD2HSUA==",
            "nskey": "",
            "askey": "",
            "captcha": "unbsvewn5q",
            "time": 1490163498,
            "type": 5
          }, {
            "deui": "ffffff000002b98d",
            "netid": "",
            "devaddr": "",
            "appkey": "mJKbkvCeLa9nbWRtD2HSUA==",
            "nskey": "",
            "askey": "",
            "captcha": "dv23j6gnaf",
            "time": 1490163498,
            "type": 5
          }, {
            "deui": "ffffff000002b98c",
            "netid": "",
            "devaddr": "",
            "appkey": "mJKbkvCeLa9nbWRtD2HSUA==",
            "nskey": "",
            "askey": "",
            "captcha": "f6av20envs",
            "time": 1490163498,
            "type": 5
          }, {
            "deui": "ffffff000002b98b",
            "netid": "",
            "devaddr": "",
            "appkey": "mJKbkvCeLa9nbWRtD2HSUA==",
            "nskey": "",
            "askey": "",
            "captcha": "yceica5sh2",
            "time": 1490163498,
            "type": 5
          }],
        createnodemodel: false,
        nodetypes: [],
        selnodeType: '',
        nodeNumber: 1,
        editNodeModel: false,
        selNodetoEdit: {}
      }
    },
    mounted: function () {

      api.node.getall({}, resp => {
        this.nodes = resp.info;
      }, error => {
      })

      api.node_type({}, resp => {
        this.nodetypes = resp.info;
      }, error => {
      })
    },
    methods: {
      createNodeok: function () {
        api.node.create(
          {
            node_type: this.selnodeType,
            num: this.nodeNumber
          },
          resp => {
            api.node.getall({}, resp => {
              this.nodes = resp.info;
            }, error => {
            })
          },
          error => {
          })
      },

      editNodeok: function () {
        api.node.edit({deui: this.selNodetoEdit.deui, node_type: this.selNodetoEdit.type}, resp => {
          this.$Message.success('修改成功')
        }, error => {
        })
      },

      editOne: function (index) {
        this.selNodetoEdit = this.nodes[index];
        this.editNodeModel = true;
      },
      show:function (index) {
        var item = this.nodes[index];
        this.$router.push('NodeInfo?role=admin&deui='+ item.deui)
      },
      deleteOne: function (index) {
        var item = this.nodes[index];
        this.$Modal.confirm({
          title: '删除',
          content: '确定删除吗',
          onOk: () => {
            api.node.delete(
              {deui: [item.deui]},
              resp => {
                this.$Message.success('删除成功');
                this.nodes.splice(index, 1);
              },
              error => {})
          },
          onCancel: () => {
          }
        });
      }
    },

    components: {}
  }
</script>
