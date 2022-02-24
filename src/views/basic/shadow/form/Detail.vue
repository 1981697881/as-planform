<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'零件编码'" prop="partsCode">
            <el-input v-model="form.partsCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'所属系列'" prop="parentId">
            <el-select v-model="form.parentId" class="width-full" placeholder="请选择">
              <el-option :label="t.seriesName" :value="t.id" v-for="(t,i) in sArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'零件名称'" prop="partsName">
            <el-input v-model="form.partsName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'版本号'" prop="partsEdition">
            <el-input v-model="form.partsEdition"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'销售价格'" prop="salePrice">
            <el-input-number v-model="form.salePrice" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'出库价格'" retrievalPrice="retrievalPrice">
            <el-input-number v-model="form.retrievalPrice" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'备注说明'" prop="remark">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'适用产品'">
            <div>
              <el-button @click="setRow">添加</el-button>
              <el-button @click="delRow">删除</el-button>
              <el-switch
                v-model="form.value"
                style="margin-top:10px;margin-bottom:10px;display: block"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="适用所有"
                inactive-text="不适用所有">
              </el-switch>
            </div>
            <el-table
              class="list-main"
              :data="list"
              border
              size="mini"
              :highlight-current-row="true"
              @row-click="yzClick">
              <el-table-column
                v-for="(t,i) in columns"
                :key="i"
                align="center"
                :prop="t.name"
                :label="t.text"
                v-if="t.default!=undefined?t.default:true"
                :width="t.width?t.width:''"
              ></el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="产品信息"
      v-if="visible"
      :width="'50%'"
      destroy-on-close
      append-to-body
    >
      <el-form :model="postform" :rules="rules2" ref="postform" label-width="80px" :size="'mini'">
        <el-row :span="20" style="padding-top: 15px">
          <el-col :span="12">
            <el-form-item :label="'编码'">
              <el-input v-model="postform.roleName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
          </el-col>
        </el-row>
        <el-row :span="20" style="padding-top: 15px">
          <el-table
            class="list-main"
            :data="productList"
            border
            size="mini"
            :highlight-current-row="true"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              v-for="(t,i) in columns"
              :key="i"
              align="center"
              :prop="t.name"
              :label="t.text"
              v-if="t.default!=undefined?t.default:true"
              :width="t.width?t.width:''"
            ></el-table-column>
          </el-table>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center;padding-top: 15px">
        <el-button type="success" @click="confirm">确认</el-button>
      </div>
    </el-dialog>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>
<script>import {getToken} from '@/utils/auth'
import {addParts, productList, seriesList} from '@/api/basic/index'

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      headers: {
        'authorization': getToken('aspanrx')
      },
      starName: null,
      keyWords: [],
      inputValue: '',
      visible: null,
      list: [],
      columns: [
        {text: '产品编码', name: 'productCode'},
        {text: '对应K3编码', name: 'productK3code'},
        {text: '产品名称', name: 'productName'},
        {text: '规格型号', name: 'productModel'},
      ],
      productList: [],
      form: {
        parentId: null,
        partsCode: null,
        partsEdition: null,
        partsName: null,
        remark: null,
        retrievalPrice: null,
        salePrice: null,
        value: false
      },
      checkData: null,
      checkYzData: null,
      postform: {
        roleName: null, // 名称
      },
      userform: {
        starSex: null,
        starName: null, // 名称
        starProfile: null,
        starPhotoUrl: null,
      },
      sArray: [],
      selection: [],
      rules: {
        partsCode: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        partsEdition: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        partsName: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
      },
      rules2: {
        roleName: [
          {required: true, message: '请输入值', trigger: 'blur'},
        ],
        roleType: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
      },
    };
  },
  mounted() {
    this.getSeriesList();
    if (this.listInfo) {
      this.form = this.listInfo
      this.list = this.listInfo.productionApplies
    }
  },
  methods: {
    query() {
      productList({productCode: this.postform.roleName}).then(res => {
        if (res.flag) {
          this.productList = res.data
        }
      })
    },
    // 演职人员选中
    yzClick(obj) {
      this.checkYzData = obj
    },
    // 监听多选 参数-所有选中的值
    handleSelectionChange(val) {
      this.selection = val
    },
    // 演职人员删除
    delRow() {
      if (this.checkYzData.productName) {
        this.$confirm('是否删除(' + this.checkYzData.productName + ')?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.list.some((item, index) => {
            this.list.splice(index, 1)
            return true
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
    // 演职人员确认
    confirm() {
      let me = this;
      if (this.selection.length > 0) {
        this.selection.forEach((item) => {
          me.list.push(item)
        });
        this.visible = null;
        this.selection = [];
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
    getSeriesList() {
      seriesList({parentId: 0}).then(res => {
        if (res.flag) {
          this.sArray = res.data
        }
      })
    },
    // 演职人员选择
    setRow() {
      this.postform = {
        roleName: null, // 名称
        roleType: null,
      }
      this.visible = true
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          // 修改
          const param = this.form
          param.productionApplies = this.list
          addParts(param).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          });
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
<style lang="scss">
  .hide .el-upload--picture-card {
    display: none;
  }
</style>
