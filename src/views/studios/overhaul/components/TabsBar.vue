<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" >
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="''">
            <el-input v-model="search.name" placeholder="单号"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="''" prop="eid">
            <el-select v-model="search.engineerId" filterable class="width-full" placeholder="请选择工程师">
              <el-option :label="t.name" :value="t.eid" v-for="(t,i) in levelFormat" :key="i"></el-option>
            </el-select>
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
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAlter">检修意见</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-check" @click="check">维修完成</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>

<script>import {mapGetters} from 'vuex'
import {completeRepair} from '@/api/studios/index'
import {getClerkList} from '@/api/basic/index'

export default {
  data() {
    return {
      btnList: [],
      levelFormat: [],
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
      }],
      search: {
        name: '',
        status: null,
        engineerId: null,
      }
    }
  },
  computed: {
    ...mapGetters(['node','clickData'])
  },
  mounted() {
    let path = this.$route.meta.id
    this.fetchFormat();
    /*getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate();
    });*/
  },
  methods:{
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.name == null || this.search.name == '' ? null : obj.repairOrder = this.search.name
      this.search.engineerId == null || this.search.engineerId == '' ?null : obj.engineerId = this.search.engineerId
      this.search.status == null || this.search.status == '' ? null : obj.status = this.search.status
      return obj
    },
    changeStatus(e) {
      this.search.status = e
      this.query();
    },
    fetchFormat() {
      const data = {
        pageNum: 1,
        pageSize: 1500
      };
      getClerkList(data, {disable: false}).then(res => {
        this.levelFormat = res.data.records
      });
    },
    onFun(method){
      this[method]()
    },
    handlerAdd() {
      this.$emit('showDialog')
    },
    upload() {
      this.search.name = ''
      this.search.status = null
      this.search.engineerId = null
      this.$emit('uploadList')
    },
    query() {

      this.$emit('queryBtn', this.qFilter())
    },
    check() {
      if (this.clickData.repairOrder) {
        completeRepair({repairOrder: this.clickData.repairOrder}).then(res => {
          if (res.flag) {
            this.query()
          }
        });
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
    handlerAlter() {
      if (this.clickData.repairOrder) {
        this.$emit('showDialog', this.clickData)
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
