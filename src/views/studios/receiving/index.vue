<template>
  <div class="app-list">
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @showChoice="showChoice" @showReceiving="showReceiving" @showDeliver="showDeliver"  @queryBtn="query" @uploadList="upload"/>
      </div>
      <list ref="list" @uploadList="uploadPage" @showDialog="handlerDialog"  />
    </div>
    <el-dialog
      :visible.sync="visible"
      title="维修费用"
      v-if="visible"
      v-dialogDrag
      :width="'50%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>
    </el-dialog><el-dialog
      :visible.sync="visible1"
      title="分配工程师"
      v-if="visible1"
      v-dialogDrag
      :width="'40%'"
      destroy-on-close
    >
      <choice @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></choice>
    </el-dialog><el-dialog
      :visible.sync="visible2"
      title="发货"
      v-if="visible2"
      v-dialogDrag
      :width="'40%'"
      destroy-on-close
    >
      <deliver @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></deliver>
    </el-dialog><el-dialog
      :visible.sync="visible3"
      title="确认收货"
      v-if="visible3"
      v-dialogDrag
      :width="'40%'"
      destroy-on-close
    >
      <receiving @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></receiving>
    </el-dialog>
  </div>
</template>

<script>
import { TabsBar,List } from "./components"
import {choice, deliver, Info, receiving} from "./form"
export default {
  components: {
    TabsBar,
    List,
    choice,
    deliver,
    receiving,
    Info
  },
  data() {
    return {
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
    },
  methods: {
      hideWindow(val) {
          this.visible = val
          this.visible1 = val
          this.visible2 = val
          this.visible3 = val
      },
      handlerDialog(obj) {
        this.listInfo = null
        if(obj) {
          const info = JSON.parse(JSON.stringify(obj))
          this.listInfo = info
        }
          this.visible = true
      },
    showChoice(obj) {
        this.listInfo = null
        if(obj) {
          const info = JSON.parse(JSON.stringify(obj))
          this.listInfo = info
        }
          this.visible1 = true
      },showReceiving(obj) {
        this.listInfo = null
        if(obj) {
          const info = JSON.parse(JSON.stringify(obj))
          this.listInfo = info
        }
          this.visible2 = true
      },showDeliver(obj) {
        this.listInfo = null
        if(obj) {
          const info = JSON.parse(JSON.stringify(obj))
          this.listInfo = info
        }
          this.visible3 = true
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
