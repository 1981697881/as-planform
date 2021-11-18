<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="90px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'维修单号'">
            <el-input v-model="form.repairOrder"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'物流公司'" prop="expressName">
            <el-input v-model="form.expressName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'物流单号'" prop="expressOrder">
            <el-input v-model="form.expressOrder"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>
<script>import {deliver} from '@/api/studios/index'

export default {
  props: {
    listInfo: {
      type: Array,
      default: null
    },
  },
  data() {
    return {
      value: [],
      form: {
        repairOrder: null,
        expressName: null,
        expressOrder: null
      },
      oldCode: null,
      rules: {
        expressName: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        expressOrder: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
      },
    };
  },
  created() {

  },
  mounted() {
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    saveData(form) {
      let me = this
      this.$refs[form].validate((valid) => {
        //判断必填项
        if (valid) {
          deliver(this.form).then(res => {
            if (res.flag) {
              me.$emit('hideSpell', false)
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

