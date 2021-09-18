<template>
  <div>
    <list
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      type
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
      @row-click="rowClick"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getMovieList, deleteMovie} from "@/api/basic/index";
import List from "@/components/List";

export default {
  components: {
    List
  },
  computed: {
    ...mapGetters(["node"])
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
        { text: '维修单号', name: '' },
        { text: '产品条码', name: '' },
        { text: '产品名称', name: '' },
        { text: '型号', name: '' },
        { text: '购买日期', name: '' },
        { text: '保修期至', name: '' },
        { text: '故障说明', name: '' },
        { text: '维修说明', name: '' },
        { text: '维修费用', name: '' },
        { text: '付款状态', name: '' },
        { text: '工程师', name: '' },
        { text: '计划完成时间', name: '' },
        { text: '维修状态', name: '' },
        { text: '物流信息', name: '' }
      ]
    };
  },

  methods: {
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
        if(res.flag){
          this.$store.dispatch("list/setClickData", '');
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
      this.$store.dispatch("list/setClickData", obj.row)
    },
    fetchData(val, data = {
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      this.loading = true;
      getMovieList(data, val).then(res => {
        this.loading = false
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
