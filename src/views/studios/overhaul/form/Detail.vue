<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
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
            <el-form-item :label="'工程师'" prop="productCode">
              <el-input v-model="item.productCode" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'产品条码'" prop="productCode">
              <el-input v-model="item.productCode" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'产品名称'" prop="productName">
              <el-input v-model="item.productName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'型号'" prop="productModel">
              <el-input v-model="item.productModel" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'维修项目'" prop="filmName">
              <el-input v-model="item.filmName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'配件费用'" prop="partsMoney">
              <el-input-number v-model="item.partsMoney" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'工时费'" prop="workMoney">
              <el-input-number v-model="item.workMoney" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="'配件清单'" prop="orgAttr">
              <div style="margin-top: 20px;margin-bottom: 10px">
                <el-button @click="setRow">添加</el-button>
                <el-button @click="delRow">删除</el-button>
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
      <el-form :model="postform" :rules="rules2" ref="postform" label-width="120px" :size="'mini'">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label-width="0">
              <el-input v-model="username" placeholder="名称"><el-button slot="append" icon="el-icon-search" @click="fetchFormat"></el-button></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="20">
          <el-col :span="24">
            <el-table class="list-main" height="200px" :data="list" border size="mini" :highlight-current-row="true"
                      @row-dblclick="dblclick">
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
          </el-col>
        </el-row>
        <el-row :span="20">
          <el-col :span="12">
            <el-form-item :label="'是否保修期内'" prop="roleName">
              <el-switch
                v-model="value"
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
      visible: null,
      list: [],
      columns: [
        {text: '产品编码', name: 'partsCode'},
        {text: '对应K3编码', name: 'k3Code'},
        {text: '产品名称', name: 'partsName'},
        {text: '规格型号', name: ''},
      ],
      userList: [],
      form: {
        partsMoney: 1,
        workMoney: 1,
      },
      checkData: null,
      checkYzData: null,
      postform: {
        roleName: null, // 名称
        roleType: null,
      },
      pArray: [],
      rules: {
        filmName: [
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
      levelFormat: [['剧情', '剧情'], ['科幻', '科幻'], ['恐怖', '恐怖'], ['动作', '动作'], ['爱情', '爱情'], ['悬疑', '悬疑'], ['喜剧', '喜剧'], ['动画', '动画'], ['奇幻', '奇幻'], ['冒险', '冒险']],
    };
  },
  mounted() {
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    dblclick(obj) {
      this.visible = false;
    },
    //选中
    yzClick(obj) {
      this.checkYzData = obj
    },
    //删除
    delRow() {
      if (this.checkYzData.starId) {
        this.$confirm('是否删除(' + this.checkYzData.starName + ')，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.list.some((item, index) => {
            if (this.checkYzData.starId == item.starId && this.checkYzData.roleType === item.roleType) {
              this.list.splice(index, 1)
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
    //演职人员确认
    confirm() {
      let me = this
      this.$refs['postform'].validate((valid) => {
        // 判断必填项
        if (valid) {
          if (this.checkData != null) {
            let list = me.list
            let number = 0
            for (let val of list) {
              if (me.checkData.starId == val.starId && me.postform.roleType == val.roleType) {
                number++
              }
            }
            if (number == 0) {
              me.visible = false
              me.list.push({
                roleName: me.postform.roleName,
                starName: me.checkData.starName,
                roleType: me.postform.roleType,
                starId: me.checkData.starId,
              })
              me.checkData = null
            } else {
              this.$message.error('影讯内，不允许同职员同职务存在');
            }
          } else {
            this.$message.error('无选中人员');
          }
        } else {
          return false
        }
      })
    },
    //演职人员选择
    setRow() {
      this.postform = {
        roleName: null, // 名称
        roleType: null,
      }
      this.visible = true
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        //判断必填项
        if (valid) {
          //修改
          let param = this.form
          param.filmRoleVOS = this.list
          repairDetailUpdate(param).then(res => {
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
