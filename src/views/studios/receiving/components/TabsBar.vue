<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="''">
            <el-input v-model="search.name" placeholder="单号"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="''">
            <el-select v-model="search.status" filterable class="width-full" placeholder="状态" @change="changeStatus">
              <el-option :label="t.name" :value="t.value" v-for="(t,i) in options" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right;padding-bottom: 10px">
          <!-- <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>-->
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAlter">维修费用</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handlerChoice">分配工程师</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="handlerDeliver">发货</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-finished" @click="handlerPay">确认支付</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="handlerReceiving">确认收货</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-download" @click="exportData">导出</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>

<script>import {mapGetters} from 'vuex'
import {confirmRepair} from '@/api/studios/index'

export default {
  data() {
    return {
      btnList: [],
      search: {
        name: "",
        status: null,
      },
      options: [{
        name: '待寄回',
        value: 0
      },{
        name: '待检修',
        value: 1
      },{
        name: '待确认',
        value: 2
      },{
        name: '待维修',
        value: 3
      },{
        name: '待发货',
        value: 4
      },{
        name: '待收货',
        value: 5
      },{
        name: '完成',
        value: 6
      }]
    };
  },
  computed: {
    ...mapGetters(['node', 'clickData'])
  },
  mounted() {
    let path = this.$route.meta.id
    /*getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate();
    });*/
  },
  methods: {
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.name == null || this.search.name == '' ? null : obj.repairOrder = this.search.name
      this.search.status == null || this.search.status == '' ? null : obj.status = this.search.status
      return obj
    },
    // 导出
    exportData() {
      this.$emit('exportData')
    },
    changeStatus(e) {
      this.search.status = e
      this.query();
    },
    onFun(method) {
      this[method]()
    },
    upload() {
      this.search.name = ''
      this.search.status = null
      this.$emit('uploadList')
    },
    query() {
      console.log(this.qFilter())
      this.$emit('queryBtn', this.qFilter())
    },
    del() {
      if (this.clickData.repairOrder) {
        this.$confirm('是否删除(' + this.clickData.repairOrder + ')，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('del', {filmId: this.clickData.filmId})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
    handlerPay() {
      if (this.clickData.repairOrder) {
        confirmRepair({repairOrder: this.clickData.repairOrder}).then(res => {
          if(res.flag) {
            this.$emit('uploadList')
          }
        });
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    }, handlerAlter() {
      if (this.clickData.repairOrder) {
        this.$emit('showDialog', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    }, handlerChoice() {
      if (this.clickData.repairOrder) {
        this.$emit('showChoice', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    }, handlerReceiving() {
      if (this.clickData.repairOrder) {
        this.$emit('showReceiving', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    }, handlerDeliver() {
      if (this.clickData.repairOrder) {
        this.$emit('showDeliver', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    },
  }
};
</script>

<style>
</style>
