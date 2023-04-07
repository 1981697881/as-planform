
<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'维修单号'">
            <el-input v-model="form.repairOrder" readOnly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'收货时间'" prop="receivingDate">
            <div class="block">
              <el-date-picker
                v-model="form.receivingDate"
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
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>
<script>import {receiving} from '@/api/studios/index'

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
        receivingDate: null,
      },
      oldCode: null,
      rules: {
        receivingDate: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
      },
    };
  },
  created() {

  },
  mounted() {
    if (this.listInfo) {
      this.form = this.listInfo
      delete this.form.id
    }
  },
  methods: {
    saveData(form) {
      let me = this
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          receiving(this.form).then(res => {
            if (res.flag) {
              me.$emit('hideDialog', false)
              me.$emit('uploadList')
            }
          })
        } else {
          return false;
        }
      })
    },
  }
};
</script>

<style>
</style>
