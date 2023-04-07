<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'">
      <el-row :gutter="10">
        <el-button-group style="float:right;padding-bottom: 10px">
          <!-- <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>-->
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handlerAdd">新增</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAlter">修改</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="del">删除</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import {seriesList} from '@/api/basic/index'
  import {mapGetters} from 'vuex'

  export default {
  data() {
    return {
      btnList: [],
      sArray: [],
      search: {
        parentId: null
      }
    };
  },
  computed: {
    ...mapGetters(['node', 'clickData'])
  },
  mounted() {
    let path = this.$route.meta.id
    /*getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate();
    });*/
    this.getSeriesList();
  },
  methods: {
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.parentId != null && this.search.parentId != '' ? obj.parentId = this.search.parentId : null
      return obj
    },
    getSeriesList() {
      seriesList({ parentId: 0 }).then(res => {
        if (res.flag) {
          this.sArray = res.data
        }
      })
    },
    onFun(method) {
      this[method]()
    },
    handlerAdd() {
      this.$emit('showDialog')
    },
    upload() {
      this.search.parentId = null
      this.$emit('uploadList')
    },
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    del() {
      if (this.clickData.id) {
        this.$confirm('是否删除(' + this.clickData.seriesName + ')，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('del', {id: this.clickData.id})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
    handlerAlter() {
      if (this.clickData.id) {
        this.$emit('showDialog', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    },
  }
};
</script>

<style>
</style>
