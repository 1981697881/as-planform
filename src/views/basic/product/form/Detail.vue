<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'产品名称'">
              <el-select
                v-model="form.productName"
                filterable
                remote
                style="width: 100%"
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                @change="selectChange"
                :loading="loading">
                <el-option
                  v-for="(item, index) in list"
                  :key="index"
                  :label="item.productName"
                  :value="item.productInnercode">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'产品内码'" prop="productInnercode">
            <el-input v-model="form.productInnercode" readOnly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'装箱码'" prop="productPackcode">
            <el-input v-model="form.productPackcode" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'产品条码'" prop="productBarcode">
            <el-input v-model="form.productBarcode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'入库时间'" prop="productInputDate">
            <div class="block">
              <el-date-picker
                v-model="form.productInputDate"
                type="datetime"
                style="width: 100%"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'出库时间'" prop="productOutputDate">
            <div class="block">
              <el-date-picker
                v-model="form.productOutputDate"
                type="datetime"
                style="width: 100%"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addProductBarcode, productList} from '@/api/basic/index'

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      productName: '',
      loading: false,
      list: [],
      form: {
        productBarcode: null,
        productInnercode: null,
        productInputDate: null,
        productOutputDate: null,
        productPackcode: null
      },
      rules: {
        productBarcode: [
          {required: true, message: '请输入', trigger: 'blur'},
        ], productInnercode: [
          {required: true, message: '请输入', trigger: 'blur'},
        ], productInputDate: [
          {required: true, message: '请选择', trigger: 'change'},
        ], productOutputDate: [
          {required: true, message: '请选择', trigger: 'change'},
        ], productPackcode: [
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
    selectChange(val) {
      console.log(val)
      this.form.productInnercode = val
    },
    fetchFormat() {
      productList({productName: this.productName}).then(res => {
        this.loading = false;
        this.list = res.data
      });
    },
    remoteMethod(query) {
      if (query !== '') {
        console.log(query)
        this.loading = true;
        this.productName = query;
        this.fetchFormat();
      } else {
        this.list = [];
      }
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          delete this.form.productName
          addProductBarcode([this.form]).then(res => {
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
