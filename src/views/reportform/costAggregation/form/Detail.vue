<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'零件编码'" prop="filmName">
            <el-input v-model="form.filmName" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'所属系列'" prop="filmSortid">
            <el-select v-model="form.filmSortid" class="width-full" placeholder="请选择">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'零件名称'" prop="filmName">
            <el-input v-model="form.filmName" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'版本号'" prop="filmName">
            <el-input v-model="form.filmName" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'销售价格'" prop="filmName">
            <el-input-number v-model="form.filmName" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'出库价格'" prop="filmName">
            <el-input-number v-model="form.filmName" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'备注说明'" prop="filmIntro">
            <el-input type="textarea" v-model="form.filmIntro"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'演职人员'" prop="orgAttr">
            <div style="margin-top: 20px;margin-bottom: 10px">
              <el-button @click="setRow">添加</el-button>
              <el-button @click="delRow">删除</el-button>
              <el-switch
                v-model="value1"
                style="display: block"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="适用所有"
                inactive-text="不适用所有">
              </el-switch>
            </div>
            <el-table class="list-main" :data="list" border size="mini" :highlight-current-row="true"  @row-click="yzClick">
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
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="产品信息"
      v-if="visible"
      :width="'50%'"
      destroy-on-close
      append-to-body
    >
      <el-form :model="postform" :rules="rules2" ref="postform" :size="'mini'">
        <el-row :span="20" style="padding-top: 15px">
          <el-col :span="12">
            <el-form-item :label="'名称'" prop="roleName">
              <el-input v-model="postform.roleName"></el-input>
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

<script>
  import {addMovie} from "@/api/basic/index";
  import {getToken} from '@/utils/auth'

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
          {text: '产品编码', name: ''},
          {text: '对应K3编码', name: ''},
          {text: '产品名称', name: ''},
          {text: '规格型号', name: ''},
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
        postform: {
          roleName: null, // 名称
          roleType: null,
        },
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
        rules2: {
          roleName: [
            {required: true, message: '请输入值', trigger: 'blur'},
          ],
          roleType: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
        },
        levelFormat: [['剧情', '剧情'], ['科幻', '科幻'], ['恐怖', '恐怖'], ['动作', '动作'], ['爱情', '爱情'], ['悬疑', '悬疑'], ['喜剧', '喜剧'], ['动画', '动画'], ['奇幻', '奇幻'], ['冒险', '冒险']],
      };
    },
    mounted() {
      if (this.listInfo) {
        this.form = this.listInfo
        }
    },
    methods: {
      //演职人员选中
      yzClick(obj){
        this.checkYzData = obj
      },
      //演职人员删除
      delRow(){
        if (this.checkYzData.starId) {
          this.$confirm('是否删除(' + this.checkYzData.starName + ')，删除后将无法恢复?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              this.list.some((item,index)=>{
                if(this.checkYzData.starId == item.starId && this.checkYzData.roleType === item.roleType){
                  this.list.splice(index, 1)
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
      //演职人员确认
      confirm() {
        let me = this
        this.$refs['postform'].validate((valid) => {
          // 判断必填项
          if (valid) {
            if(this.checkData != null){
              let list = me.list
              let number = 0
              for(let val of list){
                if(me.checkData.starId == val.starId && me.postform.roleType == val.roleType){
                  number ++
                }
              }
              if(number == 0){
                me.visible = false
                me.list.push({
                  roleName: me.postform.roleName,
                  starName: me.checkData.starName,
                  roleType: me.postform.roleType,
                  starId: me.checkData.starId,
                })
                me.checkData = null
              }else{
                this.$message.error('影讯内，不允许同职员同职务存在');
              }
            }else{
              this.$message.error('无选中人员');
            }
          } else {
            return false
          }
        })
      },
      //演职人员选择
      setRow() {
        this.postform ={
          roleName: null, // 名称
          roleType: null,
        }
        this.visible = true
      },
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
