<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="90px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'维修单号'">
            <el-input v-model="oldCode" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'客户联系人'">
            <el-input v-model="oldCode" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'工程师'" prop="tpId">
            <el-select v-model="form.tpId" class="width-full" placeholder="" @change="selectChange">
              <el-option :label="t.tpName" :value="t.tpId" v-for="(t,i) in pArray" :key="i" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'跟单员'" prop="tpId">
            <el-select v-model="form.tpId" class="width-full" placeholder="" @change="selectChange">
              <el-option :label="t.tpName" :value="t.tpId" v-for="(t,i) in pArray" :key="i" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'计划日期'" prop="productionDate">
            <div class="block" >
              <el-date-picker
                v-model="form.productionDate"
                type="date"
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
<script>
  import { shareBill, getSemiList, isOutbreed } from '@/api/studios/index'
  import { getMcjSemiSchedulingType, getMcjSemiFinishedProducts} from '@/api/studios/index'
  export default {
    props: {
      listInfo: {
        type: Array,
        default: null
      },
      //是否自适应宽度，不自适应宽度默认为120px
      selfAdaption: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        pickerOptionsStart: {
          disabledDate: time => {
            let beginDateVal = new Date()
            beginDateVal=beginDateVal.setDate(beginDateVal.getDate()-1)
            beginDateVal=new Date(beginDateVal)
            return time.getTime() <= beginDateVal;
          }
        },
        value: [],
        form: {
          allocatedNum: null,
          tpId: null,
          plId: null,
          productionDate: null,
          isOutbreed: '0',
        },
        oldCode: null,
        pArray: [],
        rArray: [],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        rules: {
          tpId: [
            {required: true, message: '请选择产线', trigger: 'change'},
          ],
          plId: [
            {required: true, message: '请选择设备', trigger: 'change'},
          ],
          productionDate: [
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
        this.list = this.listInfo
      }
    },
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
        let list = this.list
        let num = 0
        list.forEach((item, index) =>{
          num += Number(item.allocatedNum)
        })
        this.form.allocatedNum = num
      },
      // 切换类别
      selectChange(val) {
        this.form.plId = null
        this.rArray = []
        this.fetchLine(val)
      },
      saveData(form) {
        let me = this
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            let data = {}
            let lData = []
            let lData2 = []
            let num = 0
            let list = this.list
            let result = []
            list.forEach(function(item, index) {
              let obj = {}
              let obj2 = {}
              obj2.taskId = item.taskId
              obj2.allocatedNum = item.allocatedNum
              obj2.plId = me.form.plId
              obj2.productionDate = me.form.productionDate
              lData2.push(obj2)
              obj.allocatedNum = item.allocatedNum
              obj.gid = item.gid
              obj.isOutbreed = me.form.isOutbreed
              obj.plId = me.form.plId
              obj.productionDate = me.form.productionDate
              obj.remark = item.remark
              obj.taskId = item.taskId
              num += Number(item.allocatedNum)
              if(result.indexOf(item.gid) == -1){
                result.push(item.gid)
              }
              lData.push(obj)
            })
            /* data.taskId = me.form.taskId
             data.extendPojo = lData*/
            if(me.list.length > 1 ){
              if(num <= me.form.allocatedNum){
                if(result.length == 1){
                  isOutbreed(lData2).then(res => {
                    if (res.flag) {
                      shareBill(lData).then(reso => {
                        if(reso.flag){
                          me.$emit('hideSpell', false)
                          me.$emit('uploadList')
                        }
                      })
                    } else {
                      this.$confirm(res.msg + ',是否超出常量生产?', '提示', {
                        confirmButtonText: '超产',
                        cancelButtonText: '不超产',
                        distinguishCancelAndClose: true,
                        type: 'warning'
                      }).then(() => {
                        let isDate = res.data
                        isDate.forEach((it, ind) =>{
                          lData.forEach((item, index) =>{
                            if(it == item.taskId){
                              item.isOutbreed = '1'
                            }
                          })
                        })
                        shareBill(lData).then(reso => {
                          if(reso.flag){
                            me.$emit('hideSpell', false)
                            me.$emit('uploadList')
                          }
                        })
                      }).catch(action => {
                        if(action == 'cancel') {
                          lData.forEach((item, index) => {
                            item.isOutbreed = '0'
                          })
                          shareBill(lData).then(reso => {
                            if (reso.flag) {
                              me.$emit('hideSpell', false)
                              me.$emit('uploadList')
                            }
                          })
                        }
                      })
                    }
                  })
                }else{
                  me.$message({
                    type: 'error',
                    message: '物料信息需要一致!'
                  });
                }
              } else {
                this.$message({
                  type: 'error',
                  message: '拼单数量不能大于原单数量!'
                });
              }
            } else {
              this.$message({
                type: 'error',
                message: '拼单数量不能小于零并且大于一!'
              });
            }
          } else {
            return false;
          }
        })
      },
      fetchFormat() {
        getMcjSemiSchedulingType().then(res => {
          if(res.flag) {
            this.pArray = res.data
          }
        })
      },
      fetchLine(val) {
        getMcjSemiFinishedProducts(val).then(res => {
          if(res.flag) {
            this.rArray = res.data
          }
        })
      },
    }
  };
</script>

<style>
</style>
