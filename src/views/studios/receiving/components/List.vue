<template>
  <div>
    <list
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      :tree="{children: 'repairDetailList',hasChildren: 'hasChildren'}"
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
      @row-click="rowClick"
    />
  </div>
</template>

<script>import {mapGetters} from 'vuex'
import {deleteMovie, getRepairList} from '@/api/studios/index'
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
        {text: '维修单号', name: 'repairOrder',width: '200' },
        {text: '客户', name: 'contactPerson'},
        {text: '手机号码', name: 'contactNumber'},
        {text: '产品条码', name: 'productCode'},
        {text: '产品名称', name: 'productName'},
        {text: '机身码', name: 'productCode'},
        {text: '型号', name: 'productModel'},
        {text: '寄件单号', name: 'courierNumber'},
        {text: '购买日期', name: 'productBuyDate'},
        {text: '保修期至', name: 'productGuarantee'},
        {text: '故障说明', name: 'faultDescription'},
        {text: '维修说明', name: 'repairOpinion'},
        {text: '运费', name: 'freight'},
        {text: '配件费用', name: 'partsMoney'},
        {text: '维修费用', name: 'payPrice'},
        {text: '付款状态', name: 'payStatus', formatt: 'checkPay'},
        {text: '工程师', name: 'engineerName'},
        {text: '计划完成时间', name: 'planDate'},
        {text: '维修状态', name: 'status', formatt: 'checkType'},
        {text: '统一发货物流', name: 'logistics.expressName'},
        {text: '统一发货单号', name: 'logistics.expressOrder'},
        {text: '多个发货物流', name: 'companyName'},
        {text: '多个发货单号', name: 'courierNumber'},
        {text: '创建时间', name: 'createDate'},
        {text: '修改时间', name: 'editDate'},
        {text: '完成时间', name: 'completeTime'},
        { text: '备注', name: 'remark' },
        {text: '操作时间', name: 'datedescribes', default: 'handler'}
      ]
    }
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
        let inportData = []
        list.forEach((item) => {
          inportData = [...inportData,...item.repairDetailList]
        })
        console.log(inportData)
        const data = this.formatJson(filterVal, inportData);
        // 这里还是使用export_json_to_excel方法比较好，方便操作数据
        excel.export_json_to_excel([tHeader],data,'维修单')
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
        if (res.flag) {
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
      this.loading = true;
      getRepairList(data, val).then(res => {
        this.loading = false
        res.data.records.forEach((item, index) => {
          item.id = index + item.repairOrder
        })
        this.list = res.data
      })
    }
  }
};
</script>

<style lang="scss" scoped>
  .list-main {
    height: calc(100vh - 250px);
  }
</style>
