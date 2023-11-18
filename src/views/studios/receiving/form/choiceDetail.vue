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
          <el-form-item :label="'维修日期'" prop="planDate">
            <div class="block">
              <el-date-picker
                v-model="form.planDate"
                type="date"
                style="width: 100%"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptionsStart"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'工程师'" prop="engineerId">
            <el-select v-model="form.engineerId" class="width-full" placeholder="" @change="selectChange">
              <el-option :label="t.name" :value="t.eid" v-for="(t,i) in pArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'跟单员'">
            <el-input v-model="form.merchandiser"></el-input>
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
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'明细'">
          </el-form-item>
        </el-col>
      </el-row>
      <block v-for="(item, index) in form.repairDetailList" :key="index">
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
      </block>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>
<script>import {appointEngineer} from '@/api/studios/index'
import {getClerkList} from '@/api/basic/index'

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      pickerOptionsStart: {
        disabledDate: time => {
          let beginDateVal = new Date()
          beginDateVal = beginDateVal.setDate(beginDateVal.getDate() - 1)
          beginDateVal = new Date(beginDateVal)
          return time.getTime() <= beginDateVal;
        }
      },
      value: [],
      form: {
        repairOrder: null,
        planDate: null,
        engineerId: null,
        merchandiser: null,
        contactPerson: null,
        contactNumber: null
      },
      oldCode: null,
      pArray: [],
      list: [],
      rules: {
        engineerId: [
          {required: true, message: '请选择工程师', trigger: 'change'},
        ],
        merchandiser: [
          {required: true, message: '请输入', trigger: 'blur'},
        ],
        planDate: [
          {required: true, message: '请选择日期', trigger: 'change'},
        ],
      },
    };
  },
  created() {

  },
  mounted() {
    this.fetchFormat()
    if (this.listInfo) {
      console.log(this.listInfo)
      this.form = this.listInfo
    }
  },
  methods: {
    _copy() {
      var input = document.getElementById('copy')
      input.select()
      document.execCommand('copy')
      this.$message.success('复制成功!')
    },
    // 切换类别
    selectChange(val) {
      this.form.plId = null
      this.rArray = []
      this.fetchLine(val)
    },
    saveData(form) {
      let me = this;
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          appointEngineer(this.form).then(reso => {
            if (reso.flag) {
              me.$emit('hideDialog', false)
              me.$emit('uploadList')
            }
          })
        }
      })
    },
    fetchFormat() {
      /*getEngineerForm({}).then(res => {
        if (res.flag) {
          this.pArray = res.data
        }
      })*/
      const data = {
        pageNum: this.list.current || 1,
        pageSize: this.list.size || 1500
      };
      getClerkList(data, {disable: false}).then(res => {
        this.pArray = res.data.records
      });
    },
  }
};
</script>

<style>
</style>
