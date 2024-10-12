<template>
  <div class="app-list">
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @exportData="exportData"  @showChoice="showChoice" @showReceiving="showReceiving"
                  @showDeliver="showDeliver" @queryBtn="query" @uploadList="upload"/>
      </div>
      <list ref="list" @uploadList="uploadPage" @showDialog="handlerDialog"/>
    </div>
    <el-dialog
      :visible.sync="visible"
      title="维修费用"
      v-if="visible"
      v-dialogDrag
      :width="dialogWidth"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>
    </el-dialog>
    <el-dialog
      :visible.sync="visible1"
      title="分配工程师"
      v-if="visible1"
      v-dialogDrag
      :width="dialogWidth"
      destroy-on-close
    >
      <choice @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></choice>
    </el-dialog>
    <el-dialog
      :visible.sync="visible2"
      title="发货"
      v-if="visible2"
      v-dialogDrag
      :width="dialogWidth"
      destroy-on-close
    >
      <deliver @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></deliver>
    </el-dialog>
    <el-dialog
      :visible.sync="visible3"
      title="确认收货"
      v-if="visible3"
      v-dialogDrag
      :width="dialogWidth"
      destroy-on-close
    >
      <receiving @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></receiving>
    </el-dialog>
  </div>
</template>

<script>import {Choice, Deliver, Info, Receiving} from './form'
import {List, TabsBar} from './components'

export default {
  components: {
    TabsBar,
    List,
    Choice,
    Deliver,
    Receiving,
    Info
  },
  data() {
    return {
      dialogWidth: '50%',
      visible: null,
      visible1: null,
      visible2: null,
      visible3: null,
      rid: null,
      listInfo: null,
      floorId: null
    }
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
    exportData() {
      this.$refs.list.ExportData()
    },
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    },
    hideWindow(val) {
      this.visible = val
      this.visible1 = val
      this.visible2 = val
      this.visible3 = val
    },
    handlerDialog(obj) {
      this.listInfo = null
      if (obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible = true
    },
    showChoice(obj) {
      this.listInfo = null
      if (obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible1 = true
    },
    showReceiving(obj) {
      this.listInfo = null
      if (obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible3 = true
    },
    showDeliver(obj) {
      this.listInfo = null
      if (obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible2 = true
    },
    // 更新列表
    upload() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
    uploadPage(val) {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 查询
    query() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
