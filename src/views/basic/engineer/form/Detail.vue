<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'故障名称'" prop="fault">
            <el-input v-model="form.fault"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'故障编码'" prop="letters">
            <el-input v-model="form.letters"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addFault} from '@/api/basic/index'

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        engineerCode: null,
        letters: null,
      },
      disPl: true,
      pidS: [],
      rArray: [],
      aArray: [],
      rules: {
        letters: [
          {required: true, message: '请输入', trigger: 'blur'},
        ],
        fault: [
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
          addFault(this.form).then(res => {
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
