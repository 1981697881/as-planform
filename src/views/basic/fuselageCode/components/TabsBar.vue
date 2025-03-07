<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="''">
            <el-input v-model="search.productBarcode" placeholder="机身码"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="''">
            <el-input v-model="search.outPutOrderNumber" placeholder="生产单号"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="''">
            <el-input v-model="search.custName" placeholder="客户名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
          <!--<el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>-->
          <el-button :size="'mini'" type="primary" icon="el-icon-download" @click="exportData">导出</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
  components: {},
  computed: {
    ...mapGetters(['node','clickData','selections'])
  },
  data() {
    return {
      btnList: [],
      search: {
        productBarcode: null,
        custName: null,
        outPutOrderNumber: null
      }
    };
  },
  mounted() {
   /* let path = this.$route.meta.id
    getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate();
    });*/
  },
  methods: {
    onFun(method){
      this[method]()
    },
    // 导出
    exportData() {
      this.$emit('exportData')
    },
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    upload() {
      this.search.productBarcode = ''
      this.search.outPutOrderNumber = ''
      this.search.custName = ''
      this.$emit('uploadList')
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.productBarcode != null && this.search.productBarcode != '' ? obj.productBarcode = this.search.productBarcode : null
      this.search.outPutOrderNumber != null && this.search.outPutOrderNumber != '' ? obj.outPutOrderNumber = this.search.outPutOrderNumber : null
      this.search.custName != null && this.search.custName != '' ? obj.custName = this.search.custName : null
      return obj
    },

  }
};
</script>

<style>
</style>
