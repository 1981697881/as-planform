<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'">
      <el-row :gutter="10">
        <el-col :span="3">
          <el-form-item :label="''">
            <el-input v-model="search.prodName" placeholder="产品名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="''">
            <el-input v-model="search.prodCode" placeholder="产品编码"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="''">
            <el-input v-model="search.faultDesc" placeholder="报修原因"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="''">
            <el-input v-model="search.prodModel" placeholder="产品型号"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="''">
            <el-input v-model="search.custName" placeholder="客户名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="5" style="display: inline-block">
          <el-form-item :label="''">
            <el-date-picker
              style="width: auto"
              v-model="value"
              type="daterange"
              :picker-options="pickerOptions"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right;padding-bottom: 10px">
          <!--<el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>-->
          <el-button :size="'mini'" type="primary" icon="el-icon-download" @click="exportData">导出</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>import {mapGetters} from 'vuex'
import moment from 'moment'

export default {
  data() {
    return {
      btnList: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value: [moment(new Date()).format('YYYY-MM-DD'), moment(this.getNextDay(new Date())).format('YYYY-MM-DD')],
      search: {
        prodName: '',
        prodCode: '',
        faultDesc: '',
        prodModel: '',
        custName: '',
      }
    };
  },
  computed: {
    ...mapGetters(['node', 'clickData'])
  },
  mounted() {
    /* let path = this.$route.meta.id
     getByUserAndPrId(path).then(res => {
       this.btnList = res.data
       this.$forceUpdate();
     });*/
  },
  methods: {
    getNextDay(date) {
      const nextDay = new Date(date)
      nextDay.setDate(nextDay.getDate() + 1)
      return nextDay
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.prodName != null && this.search.prodName != '' ? obj.prodName = this.search.prodName : null
      this.search.prodCode != null && this.search.prodCode != '' ? obj.prodCode = this.search.prodCode : null
      this.search.faultDesc != null && this.search.faultDesc != '' ? obj.faultDesc = this.search.faultDesc : null
      this.search.prodModel != null && this.search.prodModel != '' ? obj.prodModel = this.search.prodModel : null
      this.search.custName != null && this.search.custName != '' ? obj.custName = this.search.custName : null
      this.value != null && this.value != undefined ? obj.endDate = this.value[1] : null
      this.value != null && this.value != undefined ? obj.startDate = this.value[0] : null
      return obj
    },
    onFun(method) {
      this[method]()
    },
    handlerAdd() {
      this.$emit('showDialog')
    },
    upload() {
      this.search.prodName = ''
      this.search.prodCode = ''
      this.search.faultDesc = ''
      this.search.prodModel = ''
      this.search.custName = ''
      this.value = [moment(new Date()).format('YYYY-MM-DD'), moment(this.getNextDay(new Date())).format('YYYY-MM-DD')]
      this.$emit('uploadList')
    },
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    del() {
      if (this.clickData.filmId) {
        this.$confirm('是否删除(' + this.clickData.filmName + ')，删除后将无法恢复?', '提示', {
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
    // 导出
    exportData() {
      this.$emit('exportData')
    },
    handlerAlter() {
      if (this.clickData.filmId) {
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
