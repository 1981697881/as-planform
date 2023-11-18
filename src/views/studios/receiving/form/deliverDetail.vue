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
      <el-radio-group v-model="radio">
        <el-radio :label="0">统一地址</el-radio>
        <el-radio :label="1">多个地址</el-radio>
      </el-radio-group>
      <el-row :gutter="20" v-if="radio==0">
        <el-col :span="12">
          <el-form-item :label="'物流公司'" prop="expressName">
            <el-select v-model="form.expressName" class="width-full" placeholder="请选择">
              <el-option :label="t.companyName" :value="t.companyName" v-for="(t,i) in sArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'物流单号'" prop="expressOrder">
            <el-input v-model="form.expressOrder"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <block v-else>
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
            <el-col :span="12">
              <el-form-item :label="'物流公司'">
                <el-select v-model="item.companyName" class="width-full" placeholder="请选择">
                  <el-option :label="t.companyName" :value="t.companyName" v-for="(t,i) in sArray" :key="i"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'物流单号'">
                <el-input v-model="item.courierNumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </block>
      </block>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>
<script>import {deliver, deliver2} from '@/api/studios/index'
import {getLogisricsCompanyList} from '@/api/basic/index'

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      radio: 0,
      value: [],
      sArray: [],
      form: {
        repairOrder: null,
        expressName: null,
        expressOrder: null
      },
      oldCode: null,
      rules: {
        expressName: [
          {required: true, message: '请选择', trigger: 'change'}
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
      if(this.listInfo.logistics != null){
        this.form.expressName= this.listInfo.logistics.expressName
        this.form.expressOrder = this.listInfo.logistics.expressOrder
      }
      delete this.form.id
    }
    this.fetchFormat();
  },
  methods: {
    fetchFormat() {
      const data = {
        pageNum: 1,
        pageSize: 200
      };
      getLogisricsCompanyList(data, {}).then(res => {
        this.sArray = res.data.records
      });
    },
    saveData(form) {
      let me = this
      this.$refs[form].validate((valid) => {
        //判断必填项
        if (valid) {
          if(this.radio == 0){
            deliver(this.form).then(res => {
              if (res.flag) {
                me.$emit('hideDialog', false)
                me.$emit('uploadList')
              }
            })
          } else {
            deliver2(this.form).then(res => {
              if (res.flag) {
                me.$emit('hideDialog', false)
                me.$emit('uploadList')
              }
            })
          }
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

