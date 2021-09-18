<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="90px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'维修单号'">
            <el-input v-model="oldCode" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'收货时间'" prop="productionDate">
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
    }
  };
</script>

<style>
</style>
