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
      <block v-for="(item, index) in form.repairDetailList" :key="index">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'工程师'" prop="productCode">
              <el-input v-model="item.productCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'产品条码'" prop="productCode">
              <el-input v-model="item.productCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'产品名称'" prop="productName">
              <el-input v-model="item.productName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'型号'" prop="productModel">
              <el-input v-model="item.productModel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'维修项目'" prop="filmName">
              <el-input v-model="item.filmName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'配件费用'" prop="partsMoney">
              <el-input-number v-model="item.partsMoney" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'工时费'" prop="workMoney">
              <el-input-number v-model="item.workMoney" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'物流费用'" prop="freight">
              <el-input-number v-model="item.freight" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'优惠后金额'" prop="discountMoney">
              <el-input-number v-model="item.discountMoney" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="'配件清单'" prop="orgAttr">
              <el-table class="list-main" :data="item.repairDetailParts" border size="mini" :highlight-current-row="true">
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
import {addMovie} from "@/api/basic/index";

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
      starName: null,
      value1: true,
      keyWords: [],
      inputValue: '',
      visible: null,
      list: [],
      columns: [
        {text: '配件', name: ''},
        {text: '费用', name: ''},
        {text: '是否保修期', name: ''}
      ],
      userList: [],
      form: {
        filmName: null,
        filmIntro: null,
        filmPhoto: null,
        photoArrays: [],
        herald: null,
        filmSortid: null,
        keyWords: [],
      },
      checkData: null,
      checkYzData: null,
      userform: {
        starSex: null,
        starName: null, // 名称
        starProfile: null,
        starPhotoUrl: null,
      },
      pArray: [],
      rules: {
        filmName: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        filmIntro: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
      },
      levelFormat: [['剧情', '剧情'], ['科幻', '科幻'], ['恐怖', '恐怖'], ['动作', '动作'], ['爱情', '爱情'], ['悬疑', '悬疑'], ['喜剧', '喜剧'], ['动画', '动画'], ['奇幻', '奇幻'], ['冒险', '冒险']],
    };
  },
  mounted() {
    if (this.listInfo) {
      console.log(this.listInfo)
      this.form = this.listInfo
    }
  },
  methods: {
    saveData(form) {
      this.$refs[form].validate((valid) => {
        //判断必填项
        if (valid) {
          //修改
          let param = this.form
          param.filmRoleVOS = this.list
          addMovie(param).then(res => {
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
