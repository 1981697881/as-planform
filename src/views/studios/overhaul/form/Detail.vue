<template>
  <div>
    <el-form :model="form" ref="form"  :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'维修单号'">
            <el-input v-model="form.repairOrder" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'维修费用'">
            <el-select style="width: 100%" disabled v-model="form.repairPaymentType" placeholder="请选择">
              <el-option
                v-for="(item,index) in options1"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div v-for="(item, index) in form.repairDetail" :key="index">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'工程师'">
              <el-input v-model="form.engineerName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'故障分类'">
              <el-select style="width: 100%" v-model="item.letters" placeholder="请选择">
                <el-option
                  v-for="(item,index) in options2"
                  :key="index"
                  :label="item.fault"
                  :value="item.letters">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
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
            <el-form-item :label="'型号'">
              <el-input v-model="item.productModel" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'维修项目'" :prop="'repairDetail.'+index+'.repairOpinionArrays'"
                          :rules="{required: true, message: '请选中', trigger: 'change'}">
              <el-select
                v-model="item.repairOpinionArrays"
                filterable
                remote
                multiple
                placeholder="请输入关键词"
                :remote-method="remoteMethod2"
                :loading="loading"
                class="width-full">
                <el-option :label="t.repairOpinion" :value="t.repairOpinion" v-for="(t,i) in sArray"
                           :key="i"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'配件费用'">
              <el-input-number v-model="item.partsMoney" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'工时费'">
              <el-input-number v-model="item.workMoney" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="'客户反馈故障'">
              <el-image
                v-for="(items,index) in JSON.parse(item.faultPhoto)"
                :key="index"
                style="width: 100px; height: 100px"
                :src="items.path"
                :preview-src-list="[items.path]">
              </el-image>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" style="text-align: center">
            <el-form-item :label="'故障图片'">
              <el-upload
                :action="fileUrl"
                list-type="picture-card"
                accept="image/jpeg,image/jpg,image/png,image/gif"
                :headers="headers"
                :data="imgData"
                :limit="3"
                name="imgS"
                :on-success="(res, file, fileList)=>{uploadSuccess(res,file, fileList, item)}"
                :on-error="uploadError"
                :class="{hide:item.hideUpload}"
                :on-preview="handlePictureCardPreview"
                :on-change="(file, fileList)=>{handleChange(file,fileList, item)}"
                :file-list="item.fileList"
                ref="upload"
                :on-remove="(file, fileList)=>{handleRemove(file,fileList, item)}">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" append-to-body size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'处理方法'">
              <el-select style="width: 100%" @change="statistics" v-model="item.remedy" placeholder="请选择">
                <el-option
                  v-for="(item,index) in options3"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="'配件清单'">
              <div style="margin-top: 20px;margin-bottom: 10px">
                <el-button @click="setRow(item)">添加</el-button>
                <el-button @click="delRow(item)">删除</el-button>
              </div>
              <list
                class="list-main box-shadow"
                :columns="columns"
                :loading="loading"
                :list="{records:item.repairDetailParts}"
                index
                @row-click="pjClick"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="配件信息"
      v-if="visible"
      :width="'30%'"
      destroy-on-close
      append-to-body
    >
      <el-form :model="postform" :rules="rules" ref="postform" :size="'mini'">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="'配件'" prop="partsCode">
              <el-select
                v-model="postform.partsCode"
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading">
                <el-option
                  v-for="(item, index) in list"
                  :key="index"
                  :label="item.partsName+'('+item.partsCode+')'"
                  :value="item.partsCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label-width="0">
              <el-input v-model="partsName" placeholder=""><el-button slot="append" icon="el-icon-search" @click="fetchFormat"></el-button></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="20">
          <el-col :span="24">
            <el-table class="list-main" height="200px" :data="list" border size="mini" :highlight-current-row="true" @row-click="yzClick">
              <el-table-column
                v-for="(t,i) in partsColumns"
                :key="i"
                align="center"
                :prop="t.name"
                :label="t.text"
                v-if="t.default!=undefined?t.default:true"
                :width="t.width?t.width:''"
              ></el-table-column>
            </el-table>
          </el-col>
        </el-row>-->
        <el-row :span="20">
          <el-col :span="24">
            <el-form-item :label="'数量'">
              <el-input-number v-model="postform.number" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="20">
          <el-col :span="24">
            <el-form-item :label="'是否保修期内'">
              <el-switch
                v-model="postform.isWarranty"
                active-value="true"
                inactive-value="false"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center;padding-top: 15px">
        <el-button type="success" @click="confirm">确认</el-button>
      </div>
    </el-dialog>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>
<script>import {getFaultList, getPartsList, getRepairProjectList} from '@/api/basic/index'
import {repairDetailUpdate} from '@/api/studios/index'
import {getToken} from '@/utils/auth'
import List from '@/components/List'

export default {
  components: {
    List
  },
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      headers: {
        'authorization': getToken('aspanrx')
      },
      starName: null,
      value: true,
      keyWords: [],
      inputValue: '',
      loading: false,
      partsName: '',
      visible: null,
      list: [],
      fileUrl: '',
      imgData: {},
      images: [],
      hideUpload: false,
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      options1: [{
        value: '现付',
        label: '现付'
      }, {
        value: '月结',
        label: '月结'
      }],
      options3: [{
        value: '维修',
        label: '维修'
      }, {
        value: '客修',
        label: '客修'
      }, {
        value: '不修',
        label: '不修'
      }],
      options2: [],
      limitCount: 3,
      columns: [
        {text: '配件名称', name: 'partsName'},
        {text: '配件编码', name: 'partsCode'},
        {text: '销售价格', name: 'partsPrice'},
        {text: '配件价格', name: 'partPrice'},
        {text: '数量', name: 'number'},
        {text: '是否保修期内', name: 'isWarranty', formatt: 'checkWarranty'}
      ],
      partsColumns: [
        {text: '配件编码', name: 'partsCode'},
        {text: '配件名称', name: 'partsName'},
        {text: '销售价格', name: 'salePrice'},
        {text: '配件价格', name: 'partPrice'}
      ],
      userList: [],
      sArray: [],
      form: {
        partsMoney: 1,
        repairOpinion: null,
        engineerName: null,
        workMoney: 1,
      },
      checkData: null,
      checkPartData: null,
      partData: null,
      postform: {
        isWarranty: 'true',
        number: 1,
        partsCode: null
      },
      pArray: [],
      rules: {
        partsCode: [
          {required: true, message: '请选择配件', trigger: 'change'}
        ],
      },
    };
  },
  mounted() {
    this.fileUrl = `${window.location.origin}/yingbao/file/imgUpload`
    this.fetchFormatT()
    this.fetchFormat()
    this.fetchData()
    if (this.listInfo) {
      this.form = this.listInfo
      this.form.repairDetail = this.listInfo.repairDetailList
      delete this.form.repairDetailList
      this.form.repairDetail.forEach((item) => {
        if(typeof item.remedy === 'undefined'){
          this.$set(item, 'remedy', null)
        }
        if (item.faultPhotoByE != null) {
          var array = item.faultPhotoByE.split(',')
          array.forEach((items) => {
            if (typeof (item.fileList) == 'undefined') {
              item.fileList = []
            }
            item.fileList.push({
              url: items
            })
            if (item.faultPhotoByEs == null) {
              item.faultPhotoByEs = []
            }
            item.faultPhotoByEs.push(items)
          })
          if (array.length >= 3) {
            item.hideUpload = true
          }
        }
      })
    }
  },
  methods: {
    statistics() {
      this.form.repairDetail.forEach((item) => {
        var array = item.repairDetailParts
        let number = 0
        array.forEach((items) => {
          if(item.remedy == '维修'){
            number += items.partsPrice * items.number
          }else if(item.remedy == '客修'){
            number += items.partPrice * items.number
          }else if(item.remedy == '不修'){
            number = 0
          }
        })
        this.$set(item,'partsMoney',number)
      })
    },
    fetchData(val = {}, data = {
      pageNum: 1,
      pageSize: 50
    }) {
      getFaultList(data, val).then(res => {
        this.options2 = res.data.records
      })
    },
    // 上传失败事件
    uploadError(res) {
      console.log(res)
      this.$message({
        message: res.msg,
        type: "warning"
      });
      this.$emit('uploadList')
    },
    // 上传成功事件
    uploadSuccess(res, file, fileList, item) {
      console.log(item)
      file.name = res.data;
      if (item.faultPhotoByEs == null) {
        item.faultPhotoByEs = []
      }
      item.faultPhotoByEs.push(this.$store.state.user.url + '/uploadFiles/image/' + res.data)
      this.$message({
        message: res.msg,
        type: "success"
      });
      this.$emit('uploadList')
    },
    //删除图片
    handleRemove(file, fileList, item) {
      console.log(item)
      let array = item.faultPhotoByEs;
      /*let img =file.url.split(this.$store.state.user.url+'/uploadFiles/image/')[1]
      array.forEach((item,index)=>{
        if (item.url.split(this.$store.state.user.url+'/uploadFiles/image/')[1] == img) {
          array.splice(index, 1);
        }
      })*/
      for (let i in array) {
        if (file.name == array[i]) {
          array.splice(i, 1);
          item.fileList.splice(i, 1);
        }
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, fileList, item) {
      item.hideUpload = fileList.length >= this.limitCount;
      console.log(item.hideUpload)
      this.$forceUpdate()
    },
    remoteMethod(query) {
      if (query !== '') {
        console.log(query)
        this.loading = true;
        this.partsName = query;
        this.fetchFormat();
        /* setTimeout(() => {
           this.loading = false;
           this.options = this.list.filter(item => {
             return item.partsName.toLowerCase()
               .indexOf(query.toLowerCase()) > -1;
           });
         }, 200);*/
      } else {
        this.list = [];
      }
    },
    remoteMethod2(query) {
      if (query !== '') {
        this.loading = true;
        this.fetchFormatT({repairOpinion: query});
      } else {
        this.sArray = [];
      }
    },
    fetchFormatT(val = {}) {
      const data = {
        pageNum: 1,
        pageSize: 200
      };
      getRepairProjectList(data, val).then(res => {
        this.loading = false;
        this.sArray = res.data.records
      });
    },
    // 选中
    yzClick(obj) {
      this.checkData = obj
    }, pjClick(obj) {
      this.checkPartData = obj.row
    },
    // 删除
    delRow(val) {
      console.log(this.checkPartData.id)
      if (this.checkPartData.id) {
        this.$confirm('是否删除(' + this.checkPartData.partsName + ')?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          val.repairDetailParts.some((item, index) => {
            if (this.checkPartData.id == item.id) {
              val.repairDetailParts.splice(index, 1)
              return true
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
    // 确认
    confirm() {
      let me = this
      this.$refs['postform'].validate((valid) => {
        // 判断必填项
        if (valid) {
          if (me.partData.repairDetailParts == null) {
            me.partData.repairDetailParts = []
          }
          let list = me.partData.repairDetailParts
          let number = 0
          let selectVal = {};
          me.list.forEach((item, index) => {
            if (item.partsCode == me.postform.partsCode) {
              selectVal = item;
            }
          })
          for (let val of list) {
            if (selectVal.id == val.id) {
              number++
            }
          }
          if (number == 0) {
            console.log(selectVal)
            me.visible = false
            list.push({
              partsCode: selectVal.partsCode,
              id: selectVal.id,
              partsName: selectVal.partsName,
              k3Code: selectVal.k3Code,
              number: me.postform.number,
              isWarranty: me.postform.isWarranty,
              partPrice: selectVal.partPrice,
              partsPrice: selectVal.salePrice,
              productCode: me.partData.productCode,
              partsEdition: selectVal.partsEdition,
            })
            me.partData = null
          } else {
            this.$message.error('配件列表已存在');
          }
          /*if (this.checkData != null) {
            if(me.partData.repairDetailParts == null){
              me.partData.repairDetailParts = []
            }
            let list = me.partData.repairDetailParts
            let number = 0
            for (let val of list) {
              if (me.checkData.id == val.id) {
                number++
              }
            }
            if (number == 0) {
              me.visible = false
              list.push({
                partsCode: me.checkData.partsCode,
                id: me.checkData.id,
                partsName: me.checkData.partsName,
                k3Code: me.checkData.k3Code,
                isWarranty: me.postform.isWarranty,
                partsPrice: me.checkData.salePrice,
                productCode: me.partData.productCode,
                partsEdition: me.checkData.partsEdition,
              })
              me.checkData = null
              me.partData = null
            } else {
              this.$message.error('配件列表已存在');
            }
          } else {
            this.$message.error('无选中数据');
          }*/
        } else {
          return false
        }
        this.statistics()
      })
    },
    // 物料选择
    setRow(item) {
      this.partData = item
      this.postform.isWarranty = 'true'
      this.postform.partsCode = null
      this.visible = true
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        //判断必填项
        if (valid) {
          //修改
          let param = this.form
          console.log(this.form)
          repairDetailUpdate(param).then(res => {
            if (res.flag) {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            }
          });
        } else {
          return false;
        }
      })
    },
    fetchFormat() {
      const data = {
        pageNum: 1,
        pageSize: 50,
      };
      getPartsList(data, {partsName: this.partsName}).then(res => {
        this.loading = false;
        this.list = res.data.records
      });
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

  .list-main {
    height: calc(100vh / 4);
  }
</style>
