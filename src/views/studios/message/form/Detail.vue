<template>
  <div>
    <el-form :size="'mini'">
      <el-row :gutter="20">
        <list
          class="list-main box-shadow"
          :columns="columns"
          :loading="loading"
          :list="list"
          index
          @handle-size="handleSize"
          @handle-current="handleCurrent"
        />
      </el-row>
    </el-form>
  </div>
</template>

<script>import {getCustomerMessageList} from '@/api/studios/index'
import List from '@/components/List'

export default {
  components: {
    List
  },
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      keyWords: [],
      loading: false,
      inputValue: '',
      list: {},
      columns: [
        { text: '客服', name: 'toUserName' },
        { text: '客户', name: 'weChatName' },
        { text: '时间', name: 'createDate' },
        { text: '图片', name: 'picUrl', default: 'image' },
        { text: '内容', name: 'content' }
      ]
    }
  },
  mounted() {
    if (this.listInfo) {
      this.fetchData({fromUserName: this.listInfo.fromUserName})
    }
  },
  methods: {
    // 监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.fetchData()
    },
    // 监听当前页
    handleCurrent(val) {
      this.list.current = val
      this.fetchData()
    },
    fetchData(val={}, data = {
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      this.loading = true;
      getCustomerMessageList(data, val).then(res => {
        this.loading = false
        this.list = res.data
      })
    }
  }
};
</script>
<style lang="scss">
  .hide .el-upload--picture-card {
    display: none;
  }
  .list-main {
    height: calc(100vh - 400px);
  }
  .el-table{
    height: 94% !important;
  }
</style>
