<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @delList="delivery"  @queryBtn="query" @uploadList="upload"/>
      </div>
      <list ref="list"  @showDialog="handlerDialog" @uploadList="uploadPage"/>
    </div>
  </div>
</template>

<script>
  import {List, TabsBar} from "./components";

  export default {
  components: {
    TabsBar,
    List
  },
  data() {
    return {
      visible: null,
      listInfo: null
    };
  },
  mounted() {
    this.$refs.list.fetchData(this.$refs.tabs.qFilter())
  },
  methods: {
    // 查询
    query() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 查询
    uploadPage(val) {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 更新列表
    upload(){
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
