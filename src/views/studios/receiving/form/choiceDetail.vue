<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="90px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'维修单号'">
            <el-input v-model="form.repairOrder" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'计划日期'" prop="planDate">
            <div class="block">
              <el-date-picker
                v-model="form.planDate"
                type="date"
                style="width: auto"
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
              <el-option :label="t.employeeName" :value="t.id" v-for="(t,i) in pArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'跟单员'" prop="merchandiser">
            <el-input v-model="form.merchandiser"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'客户'">
            <el-input v-model="form.contactPerson" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'客户手机号'">
            <el-input v-model="form.contactNumber" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>
<script>import {appointEngineer, getEngineerForm} from '@/api/studios/index'

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
      getEngineerForm({}).then(res => {
        if (res.flag) {
          this.pArray = res.data
        }
      })
    },
  }
};
</script>

<style>
</style>
