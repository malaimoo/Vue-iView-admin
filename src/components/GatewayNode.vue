<template>
  <div>
    <Card>
      <p slot="title">节点列表</p>

      <div class="method-wrapper ">
        <!--<Button @click.native='deleteSel' type="warning">删除选中</Button>-->
        <!--<Button @click.native='deleteSel' type="warning">清空</Button>-->
        <Button @click.native="createGatewayNodeModel = true" type="info">添加</Button>
        <!--<Button type="info">导入</Button>-->
      </div>
      <div class="clearfix"></div>

      <Table                    :context="self"
                                @on-selection-change="tableSelChange" @on-select="tableSel" style="min-width: 200px" border
             :columns="columns4" :data="nodes"></Table>

    </Card>

    <Modal
      v-model="createGatewayNodeModel"
      title="添加节点"
      @on-ok="createGatewayNodeOK">

      <i-form :label-width="60">
        <Form-item label="deui">
          <Input v-model="gatenodedeui" placeholder="请输入"> </Input>
        </Form-item>
      </i-form>
    </Modal>

  </div>
</template>
<style scoped>
  .table-wrapper {
    overflow-x: scroll;
    overflow-y: hidden;
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
            title: 'deui',
            key: 'deui'
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
            title: '操作',
            key: 'action',
            align: 'center',
            render (row, column, index) {
              return `
<i-button type="ghost" size="small" @click="deleteOne(${index})"><Icon type="android-delete"></Icon></i-button>
`;
            }
          }
        ],
        nodes: [

        ],
        self:this,
        selectedSelection: [],
        gatenodedeui: '',
        createGatewayNodeModel: false
      }
    },
    props: {
      item: {
        type: Object,
        default: {}
      }
    },

    mounted: function () {
      api.gateway.gatewaynode({
        geui: this.item.geui,
        role: this.item.role
      }, resp => {
        this.nodes = resp.info;
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
      deleteSel: function () {
//        todo
      },
      deleteOne:function (index) {
          var item = this.nodes[index];

        this.$Modal.confirm({
          title: '删除',
          content: '确定删除吗',
          onOk: () => {
            api.gateway.deletegatewaynode({geui:this.item.geui,deui:[item.deui],role:this.item.role},resp=>{
              this.$Message.success('删除成功')
            },error=>{
            })
          },
          onCancel: () => {
          }
        });
      },

      createGatewayNodeOK: function () {
//        todo 验证输入。
        api.gateway.creategatewaynode({geui:this.item.geui,deui:this.gatenodedeui,role:this.item.role},resp=>{
            this.$Message.success('添加成功')
        },error=>{
        })
      }
    },

    components: {}
  }
</script>
