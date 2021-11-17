<template>
  <div>
    <el-form :model="form" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'维修单号'">
            <el-input v-model="form.repairOrder" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <block v-for="(item, index) in form.repairDetailList" :key="index">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'工程师'">
              <el-input v-model="item.productCode" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'产品条码'" >
              <el-input v-model="item.productCode" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'产品名称'" >
              <el-input v-model="item.productName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'型号'">
              <el-input v-model="item.productModel" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'维修项目'" :prop="'list.' + index + '.dutyId.'+i+'.dutyid'" :rules="{required: true, message: '请输入', trigger: 'blur'}">
              <el-input v-model="item.repairOpinion"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'配件费用'" >
              <el-input-number v-model="item.partsMoney" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'工时费'" >
              <el-input-number v-model="item.workMoney" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="'配件清单'">
              <div style="margin-top: 20px;margin-bottom: 10px">
                <el-button @click="setRow(item)">添加</el-button>
                <el-button @click="delRow(item)">删除</el-button>
              </div>
              <el-table class="list-main" :data="item.repairDetailParts" border size="mini"
                        :highlight-current-row="true">
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
      </block>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="配件信息"
      v-if="visible"
      :width="'50%'"
      destroy-on-close
      append-to-body
    >
      <el-form :model="postform" ref="postform" label-width="120px" :size="'mini'">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label-width="0">
              <el-input v-model="username" placeholder=""><el-button slot="append" icon="el-icon-search" @click="fetchFormat"></el-button></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="20">
          <el-col :span="24">
            <el-table class="list-main" height="200px" :data="list" border size="mini" :highlight-current-row="true"
                      @row-click="yzClick">
              <el-table-column
                v-for="(t,i) in partsColumns"
                :key="i"
                align="center"
                :prop="t.name"
                :label="t.text"
                v-if="t.default!=undefined?t.default:true"
                :width="t.width?t.width:''"
              ></el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row :span="20">
          <el-col :span="12">
            <el-form-item :label="'是否保修期内'" >
              <el-switch
                v-model="postform.isWarranty"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-col>
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

<script>import {getPartsList} from '@/api/basic/index';
import {repairDetailUpdate} from '@/api/studios/index';
import {getToken} from '@/utils/auth'

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
      value: true,
      keyWords: [],
      inputValue: '',
      username: '',
      visible: null,
      list: [],
      columns: [
        {text: '配件名称', name: 'partsCode'},
        {text: '费用', name: 'partsPrice'},
        {text: '是否保修期内', name: 'partsName'},
      ],
      partsColumns: [
        {text: '配件编码', name: 'partsCode'},
        {text: '配件名称', name: 'partsName'},
        {text: '销售价格', name: 'salePrice'},
      ],
      userList: [],
      form: {
        partsMoney: 1,
        repairOpinion: null,
        workMoney: 1,
      },
      checkData: null,
      partData: null,
      postform: {
        isWarranty: false, // 名称
      },
      pArray: [],
    };
  },
  mounted() {
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    // 选中
    yzClick(obj) {
      this.checkData = obj
    },
    // 删除
    delRow(item) {
      if (this.checkData.id) {
        this.$confirm('是否删除(' + this.checkData.partsName + ')?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          item.repairDetailParts.some((item, index) => {
            if (this.checkData.id == item.id) {
              item.repairDetailParts.splice(index, 1)
              return true
            }
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
    // 确认
    confirm() {
      let me = this
      this.$refs['postform'].validate((valid) => {
        // 判断必填项
        if (valid) {
          if (this.checkData != null) {
            if(me.partData.repairDetailParts == null){
              me.partData.repairDetailParts = []
            }
            let list = me.partData.repairDetailParts
            let number = 0
            for (let val of list) {
              if (me.checkData.id == val.id) {
                number++
              }
            }
            if (number == 0) {
              me.visible = false
              list.push({
                partsCode: me.checkData.partsCode,
                id: me.checkData.id,
                partsName: me.checkData.partsName,
                k3Code: me.checkData.k3Code,
                isWarranty: me.postform.isWarranty,
                partsPrice: me.checkData.salePrice,
                partsEdition: me.checkData.partsEdition,
              })
              me.checkData = null
              me.partData = null
            } else {
              this.$message.error('配件列表已存在');
            }
          } else {
            this.$message.error('无选中数据');
          }
        } else {
          return false
        }
      })
    },
    // 演职人员选择
    setRow(item) {
      this.postform = {
        roleName: null, // 名称
        roleType: null,
      }
      this.partData = item
      this.visible = true
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        //判断必填项
        if (valid) {
          //修改
          let param = this.form
          repairDetailUpdate(this.form).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          });
        } else {
          return false;
        }
      })
    },
    fetchFormat() {
      const data = {
        pageNum: 1,
        pageSize: 50,
      };
      getPartsList(data, {username: this.username}).then(res => {
        this.list = res.data.records
      });
    },
  }
};
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
