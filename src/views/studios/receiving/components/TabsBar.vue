<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="'关键字'">
            <el-input v-model="search.name" placeholder="名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right;padding-bottom: 10px">
          <!-- <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>-->
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAlter">维修费用</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handlerChoice">分配工程师</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="handlerDeliver">发货</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="handlerReceiving">确认收货</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { getByUserAndPrId } from '@/api/system/index'
export default {
  data() {
    return {
      btnList: [],
      search: {
        name: ""
      }
    };
  },
  computed: {
    ...mapGetters(['node','clickData'])
  },
  mounted() {
    let path = this.$route.meta.id
    /*getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate();
    });*/
  },
  methods:{
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.cinemaName != null && this.search.cinemaName != '' ? obj.cinemaName = this.search.cinemaName : null
      return obj
    },
    onFun(method){
      this[method]()
    },
    upload() {
      this.search.name = ''
      this.$emit('uploadList')
    },
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    del() {
      if (this.clickData.filmId) {
        this.$confirm('是否删除(' + this.clickData.filmName + ')，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('del', {filmId :this.clickData.filmId})
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
      if (this.clickData.filmId) {
        this.$emit('showDialog', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    }, handlerChoice() {
      if (this.clickData.filmId) {
        this.$emit('showChoice', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    }, handlerReceiving() {
      if (this.clickData.filmId) {
        this.$emit('showReceiving', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    }, handlerDeliver() {
      if (this.clickData.filmId) {
        this.$emit('showDeliver', this.clickData)
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
