<template>
  <div>
    <list
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      show-summary
      index
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
      @row-click="rowClick"
    />
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {deleteMovie, mainTSumCostSummary} from '@/api/basic/index'
  import List from '@/components/List'

  export default {
  components: {
    List
  },
  computed: {
    ...mapGetters(['node'])
  },
  data() {
    return {
      loading: false,
      visible: false,
      list: {},
      fid: null,
      type: null,
      checkDate: null,
      columns: [
        { text: '维修单号', name: 'repairOrder' },
        { text: '客户名称', name: 'contactPerson' },
        { text: '产品型号', name: 'productModel' },
        { text: '维修项目', name: 'faultDescription' },
        { text: '检修意见', name: 'repairOpinion' },
        { text: '收取费用（元）', name: 'payPrice' },
        { text: '费用类型', name: 'repairPaymentType' },
        { text: '修好快递寄出日期', name: 'createDate' },
        { text: '寄出快递单号', name: 'expressOrder' },
        { text: '收费日期', name: 'dateDescribe' },
      ]
    };
  },

  methods: {
    ExportData() {
      import('@/vendor/Export2Excel').then(excel => {
        // 表格的表头列表
        const columns = this.columns
        const tHeader = []
        // 与表头相对应的数据里边的字段
        const filterVal = []
        columns.forEach((item, index) => {
          tHeader.push(item.text)
          filterVal.push(item.name)
        })
        const list = this.list.records
        const data = this.formatJson(filterVal, list);
        // 这里还是使用export_json_to_excel方法比较好，方便操作数据
        excel.export_json_to_excel([tHeader],data,'汇总表')
      })
    },
    formatJson(filter, jsonDate){
      return jsonDate.map(v =>
        filter.map(j => {
          return v[j]
        })
      )
    },
    // 监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.$emit('uploadList')
    },
    // 监听当前页
    handleCurrent(val) {
      this.list.current = val
      this.$emit('uploadList')
    },
    Delivery(val) {
      deleteMovie(val).then(res => {
        if(res.flag) {
          this.$store.dispatch('list/setClickData', '');
          this.$emit('uploadList')
        }
      });
    },
    uploadPr(val) {
      this.fetchData(val, {
        pageNum: 1,
        pageSize: this.list.size || 50
      })
    },
    dblclick(obj) {
      this.$emit('showDialog', obj.row)
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch('list/setClickData', obj.row)
    },
    fetchData(val, data = {
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      this.loading = true
      mainTSumCostSummary(data,val).then(res => {
        this.loading = false
        this.list = res.data
      })
    }
  }
};
</script>

<style lang='scss' scoped>
.list-main {
  height: calc(100vh - 250px);
}
</style>
