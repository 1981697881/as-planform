<template>
  <div class="app-list">
    <Tree ref="tree" class="list-tree" />
    <div class="list-container">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @delList="delList" @delGroup="delGroup" @uploadAll="uploadAll" @queryBtn="query" @showGroupDialog="groupDialog"  />
      </div>
      <list ref="list" @showDialog="handlerDialog"  />
    </div>
    <el-dialog
      :visible.sync="visible"
      title="用户信息"
      v-if="visible"
      v-dialogDrag
      :width="dialogWidth"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>

    </el-dialog>
    <el-dialog
      :visible.sync="visible2"
      title="用户组信息"
      v-if="visible2"
      v-dialogDrag
      :width="dialogWidth"
      destroy-on-close
    >
      <group @hideGroupDialog="hideGroupWindow" @uploadGroup="uploadGroup" :gpInfo="gpInfo"></group>

    </el-dialog>
  </div>
</template>

<script>
  import {List, TabsBar, Tree} from "./components";
  import {Group, Info} from "./form";

  export default {
  components: {
    Tree,
    TabsBar,
    List,
    Group,
    Info
  },
  data() {
    return {
      dialogWidth: '50%',
      visible: null,
      gpInfo: null,
      listInfo: null,
      visible2: null,
      floorId: null
    }
  },
  mounted() {
    this.$refs.list.fetchData()
    this.$refs.tree.fetchData()
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
    hideWindow(val) {
      this.visible = val
    },
    hideGroupWindow(val) {
      this.visible2 = val
    },
    handlerDialog(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible = true
    },
    groupDialog(obj) {
      this.gpInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.gpInfo = info
      }
      this.visible2 = true
    },
    // 更新列表
    upload() {
      this.$refs.list.uploadPr()
    },
    // 更新列表
    uploadAll() {
      this.$refs.list.uploadPr()
      this.$refs.tree.fetchData()
    },
    // 更新列表
    uploadGroup() {
      this.$refs.tree.fetchData()
    },
    delList(val) {
      if(val) {
        this.$refs.list.Delivery(val)
      }
    },// 查询
    query() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
    delGroup(val) {
      if(val) {
        this.$refs.tree.Delivery(val)
      }
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
