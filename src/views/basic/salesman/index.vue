<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @delList="delivery" @queryBtn="query" @uploadList="upload"/>
      </div>
      <list ref="list" @showDialog="handlerDialog" @uploadList="uploadPage"/>
    </div>

    <el-dialog
      :visible.sync="visible"
      title="基本信息"
      v-if="visible"
      v-dialogDrag
      :width="dialogWidth"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>
    </el-dialog>
  </div>
</template>
<script>import {List, TabsBar} from './components'
import {Info} from './form'

export default {
  components: {
    TabsBar,
    List,
    Info
  },
  data() {
    return {
      dialogWidth: '50%',
      visible: null,
      listInfo: null
    };
  },
  mounted() {
    this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    if (this._isMobile()) {
      this.dialogWidth = '90%'
    } else {
      this.dialogWidth = '50%'
    }
  },
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    },
    delivery(obj) {
      if (obj) {
        this.$refs.list.Delivery(obj)
      }
    },
    // 弹窗拖拽
    handleDrag() {
      this.$refs.select.blur();
    },
    hideWindow(val) {
      this.visible = val
    },
    handlerDialog(obj) {
      this.listInfo = null
      if (obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible = true
    },
    // 查询
    query() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 查询
    uploadPage(val) {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 更新列表
    upload() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
