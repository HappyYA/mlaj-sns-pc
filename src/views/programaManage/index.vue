<template>
    <div>
        <el-table
            :data="programaList"
            border
            style="width: 100%">
            <el-table-column
                prop="id"
                label="id"
                width="50">
            </el-table-column>
            <el-table-column
                prop="name"
                label="栏目名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                width="80">
            </el-table-column>
            <el-table-column
                prop="userType"
                label="显示端型"
                width="200">
                <template slot-scope="scope">
                    <span class="app-type" v-for="item in scope.row.userTypeList" :key="item">{{map[item]}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="describe"
                label="描述"
                width="180">
            </el-table-column>
            <el-table-column
                prop="sort"
                label="排序"
                width="80">
            </el-table-column>
            <el-table-column
                prop="address"
                label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.row.id, scope.row,scope.$index)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row.id, scope.row,scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="编辑栏目"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
         <el-tabs v-model="activeName">
            <el-tab-pane label="基本信息" name="first">
            <div class="list-con">
                    <div class="item-title">栏目状态</div>
                    <div class="item-con">
                        已发布
                    </div>
                </div>
                <div class="list-con">
                    <div class="item-title">栏目排序:</div>
                    <div class="item-con">
                        <el-input
                            placeholder="请输入阿拉伯数字"
                            v-model="sort">
                        </el-input>
                    </div>
                </div>
                <div class="list-con">
                    <div class="item-title">栏目名称:</div>
                    <div class="item-con">
                        <el-input
                            placeholder="名称推荐使用2个字，不超过4个字"
                            v-model="name">
                        </el-input>
                    </div>
                </div>
                <div class="list-con">
                    <div class="item-title">指定端型:</div>
                    <div class="item-con">
                       <el-checkbox-group v-model="appList">
                            <el-checkbox :label="1">家长端</el-checkbox>
                            <el-checkbox :label="2">教师端</el-checkbox>
                            <el-checkbox :label="3">园长端</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="list-con">
                    <div class="item-title">内容类型:</div>
                    <div>
                        <el-select  class="item-con" v-model="type" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="list-con">
                    <div class="item-title">栏目描述:</div>
                    <div class="item-con">
                        <el-input
                            type="textarea"
                            :rows="5"
                            placeholder="请输入描述"
                             maxlength="200"
                             show-word-limit
                            v-model="des">
                        </el-input>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="预览" name="second" :disabled="isPush">预览</el-tab-pane>
            <el-tab-pane label="发布" name="third" :disabled="isPush">发布</el-tab-pane>
            <el-tab-pane label="删除" name="fourth" :disabled="isPush">
                <div class="list-con">
                    <div class="item-title">栏目名称:</div>
                    <div class="item-con">
                        <el-input
                            placeholder="名称推荐使用2个字，不超过4个字"
                            v-model="name">
                        </el-input>
                    </div>
                </div>
                <el-button type="success">删除栏目</el-button>
            </el-tab-pane>
            <el-tab-pane label="禁用" name="five" :disabled="isPush">禁用</el-tab-pane>
        </el-tabs>   
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitEdit">提交</el-button>
        </span>
        </el-dialog>
        <div class="pagination">
            <el-pagination
                layout="total,prev, pager, next"
                :current-page="currentPage"
                :total="totalSize"
                @current-change="getNowList"
                 prev-text="上一页"
                next-text="下一页"
            >
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {getProgramaList,delPrograma,getProgramaInfo,updateProgramaInfo} from '@/utils/public';
export default {
    name:'programaManage',
    data() {
        return {
            programaList:[],
            dialogVisible:false,
            activeName:'first',
            sort:'',
            name:'',
            type:'',
            des:'',
            options:'',
            isPush:true,
            id : '',
            nowIndex :'',
            appList:[],
            map:{
                1:'家长端',
                2:'教师端',
                3:'园长端',
            },
            currentPage:0,
            totalSize:0,
        }
    },
    mounted() {
        this.getList(1)
    },
    methods: {
       getList(page){
           getProgramaList(page)
           .then(res=>{
               if(res.data.code==1000){
                   this.programaList=res.data.data.list;
                   this.totalSize = res.data.data.total;
                   console.log(res.data.data)
               }else{
                   this.$message({
                        duration:2000,
                        message:res.data.msg
                    });
               }
           })
       },
       getNowList(val){
           this.getList(val)
       },
       handleEdit(id,data,index){
           this.dialogVisible=true;
           this.nowIndex = index
           getProgramaInfo(id).then(res=>{
               let data = res.data.data
               this.sort = data.sort;
               this.des = data.describe;
               this.name = data.name
               this.id = id
               this.appList = data.userTypeList
           })
           console.log(id,data)
       },
       handleDelete(id,data,index){
           delPrograma(id).then(res=>{
               if(res.data.code = 1000){
                   this.programaList.splice(index,1)
               }else{
                   this.$message({
                        duration:2000,
                        message:res.data.msg
                    });
               }
            
           })
       },
       handleClose(){
           this.dialogVisible=false;
       },
       submitEdit(){
            updateProgramaInfo({
                name:this.name,
                id:this.id,
                describe:this.des,
                sort:this.sort,
                userType: JSON.stringify(this.appList)
            })
            .then(res=>{
                if(res.data.code = 1000){
                    this.programaList[this.nowIndex].describe = this.des
                    this.programaList[this.nowIndex].name = this.name
                    this.programaList[this.nowIndex].sort = this.sort
                    this.dialogVisible=false;
                    this.getList();
                }else{
                   this.$message({
                        duration:2000,
                        message:res.data.msg
                    });
               }
            })
            .catch(err=>{
                this.$message({
                        duration:2000,
                        message:err
                    });
            })
       }
    },
}
</script>
<style lang="scss" scoped>
.list-con{
        display: flex;
        align-items: center;
        margin-bottom: 14px;
    }
    .item-title{
        margin-right: 20px;
        color: #666666;
    }
    .item-con{
        width: 400px;
    }
    .app-type{
        padding: 5px 6px;
        color: #fff;
        margin-right: 4px;
        background-color: #5DCB65;
        border-radius: 4px;
        display: inline-block;
    }
    .pagination{
        margin-top: 86px;
        margin-bottom: 94px;
        width: 100%;
        text-align: center;
    }
</style>