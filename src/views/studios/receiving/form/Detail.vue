<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'维修单号'">
            <el-input v-model="form.repairOrder" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'费用类型'">
            <el-select style="width: 100%" v-model="form.repairPaymentType" placeholder="请选择">
              <el-option
                v-for="(item,index) in options1"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'客户信息'">
            <el-input style="float: left" :value="'联系人：'+form.contactPerson+',联系电话：'+form.contactNumber+',地址：'+form.contactAddress" readOnly id="copy" ></el-input>
            <el-button size="mini" type="primary" @click.stop="_copy()">复制</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <block v-for="(item, index) in form.repairDetailList" :key="index">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'工程师'">
              <el-input v-model="form.engineerName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'故障分类'">
              <el-select style="width: 100%" v-model="item.letters" disabled placeholder="请选择">
                <el-option
                  v-for="(item,index) in options2"
                  :key="index"
                  :label="item.fault"
                  :value="item.letters">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="'客户反馈故障'">
              <el-image
                v-for="(items,index) in JSON.parse(item.faultPhoto)"
                :key="index"
                style="width: 100px; height: 100px"
                :src="items.path"
                :preview-src-list="[items.path]">
              </el-image>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="'购买凭证'">
              <el-image
                v-for="(items,index) in JSON.parse(item.voucher)"
                :key="index"
                style="width: 100px; height: 100px"
                :src="items.path"
                :preview-src-list="[items.path]">
              </el-image>
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
              <el-input-number v-model="item.partsMoney" :min="0" disabled></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'工时费'">
              <el-input-number v-model="item.workMoney" :min="0" disabled></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'物流费用'">
              <el-input-number v-model="item.freight" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'实收金额'">
              <el-input-number v-model="item.discountMoney" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'备注'">
              <el-input v-model="item.remark"></el-input>
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
import {getFaultList} from "@/api/basic/index";

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
        {text: '配件名称', name: 'partsName'},
        {text: '配件编码', name: 'partsCode'},
        {text: '数量', name: 'number'},
        {text: '配件价格', name: 'partsPrice'},
        {text: '是否保修期内', name: 'isWarranty'}
      ],
      options1: [{
        value: '现付',
        label: '现付'
      }, {
        value: '月结',
        label: '月结'
      }],
      options2: [],
      userList: [],
      form: {
        freight: 0,
        discountMoney: 0,
        repairPaymentType: null
      },
      pArray: [],
      rules: {
        repairPaymentType: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
      },
    };
  },
  mounted() {
    this.fetchData()
    if (this.listInfo) {
      this.form = this.listInfo
     /* this.form.repairDetail = this.listInfo.repairDetailList
      delete this.form.repairDetailList*/
    }
  },
  methods: {
    _copy() {
      console.log(123)
      var input = document.getElementById('copy')
      input.select()
      document.execCommand('copy')
      this.$message.success('复制成功!')
    },
    fetchData(val = {}, data = {
      pageNum: 1,
      pageSize: 50
    }) {
      getFaultList(data, val).then(res => {
        this.options2 = res.data.records
      })
    },
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
