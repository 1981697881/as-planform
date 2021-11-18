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
      <block v-for="(item, index) in form.repairDetail" :key="index">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'工程师'">
              <el-input v-model="item.productCode" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'产品条码'">
              <el-input v-model="item.productCode" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'产品名称'">
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
            <el-form-item :label="'维修项目'">
              <el-input v-model="item.repairOpinion" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'配件费用'">
              <el-input-number v-model="item.partsMoney" :min="1" disabled></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'工时费'">
              <el-input-number v-model="item.workMoney" :min="1" disabled></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'物流费用'">
              <el-input-number v-model="item.freight" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'优惠后金额'">
              <el-input-number v-model="item.discountMoney" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="'配件清单'">
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
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {getToken} from '@/utils/auth'
import {determineLastPrice} from "@/api/studios/index";

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
        'authorization': getToken('aspanrx'),
      },
      value1: true,
      inputValue: '',
      visible: null,
      list: [],
      columns: [
        {text: '配件名称', name: 'partsCode'},
        {text: '费用', name: 'partsPrice'},
        {text: '是否保修期内', name: 'isWarranty'}
      ],
      userList: [],
      form: {
        freight: 0,
        discountMoney: 0
      },
      pArray: [],
      rules: {
      },
    };
  },
  mounted() {
    if (this.listInfo) {
      this.form = this.listInfo
      this.form.repairDetail = this.listInfo.repairDetailList
      delete this.form.repairDetailList
    }
  },
  methods: {
    saveData(form) {
      this.$refs[form].validate((valid) => {
        //判断必填项
        if (valid) {
          //修改
          let param = this.form
          determineLastPrice(param).then(res => {
            if (res.flag) {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            }
          });
        } else {
          return false;
        }
      })
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
