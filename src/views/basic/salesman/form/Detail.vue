<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'业务员编码'" prop="employeeCode">
            <el-input v-model="form.employeeCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'业务员名称'" prop="employeeName">
            <el-input v-model="form.employeeName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'业务员内码'" prop="employeeInternalCode">
            <el-input v-model="form.employeeInternalCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'业务员密码'" prop="employeePassword">
            <el-input v-model="form.employeePassword"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'类别'">
            <el-select v-model="form.internalOrNot" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addEmployee} from '@/api/basic/index'

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      options: [{
        value: '0',
        label: '内部员工'
      }, {
        value: '1',
        label: '非内部员工'
      }],
      form: {
        employeeCode: null,
        employeeName: null,
        employeeInternalCode: null,
        employeePassword: null,
        internalOrNot: '1',
      },
      disPl: true,
      pidS: [],
      rArray: [],
      aArray: [],
      rules: {
        employeeCode: [
          {required: true, message: '请输入', trigger: 'blur'},
        ],
        employeeName: [
          {required: true, message: '请输入', trigger: 'blur'},
        ], employeeInternalCode: [
          {required: true, message: '请输入', trigger: 'blur'},
        ], employeePassword: [
          {required: true, message: '请输入', trigger: 'blur'},
        ],
      },
    };
  },
  mounted() {
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addEmployee(this.form).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
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
</style>
