<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="''">
            <el-input v-model="search.name" placeholder="名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
          <!--<el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>-->
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="alter">修改</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-connection" @click="disable">禁启</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="Delivery">删除</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>import {mapGetters} from 'vuex'
import {updateEmployee} from '@/api/basic/index'

export default {
  components: {},
  computed: {
    ...mapGetters(['node', 'clickData', 'selections'])
  },
  data() {
    return {
      btnList: [],
      search: {
        name: null
      }
    };
  },
  mounted() {
    /* let path = this.$route.meta.id
     getByUserAndPrId(path).then(res => {
       this.btnList = res.data
       this.$forceUpdate();
     });*/
  },
  methods: {
    onFun(method) {
      this[method]()
    },
    Delivery() {
      if (this.clickData.id) {
        this.$confirm('是否删除（' + this.clickData.employeeName + '），删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('delList', {
            id: this.clickData.id
          })
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
    alter() {
      if (this.clickData.id) {
        this.$emit('showDialog', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
    disable() {
      if (this.clickData.id) {
        this.clickData.status = (this.clickData.status == '0' ? this.clickData.status = '1' : this.clickData.status = '0')
        updateEmployee(this.clickData).then(res => {
          if (res.flag) {
            console.log(12333)
            this.$emit('uploadList')
          }
        });
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    },
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    upload() {
      this.search.name = ''
      this.$emit('uploadList')
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.name != null && this.search.name != '' ? obj.employeeName = this.search.name : null
      return obj
    },
    handleAdd() {
      this.$emit('showDialog')
    }
  }
};
</script>

<style>
</style>
