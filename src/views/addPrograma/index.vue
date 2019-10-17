<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="保存" name="first" :disabled="isPush">
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
                <el-button type="success" @click="addPrograma">发布</el-button>
                
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
    </div>
</template>
<script>
import {addPrograma} from '@/utils/public.js';
export default {
    name:'programa',
    data() {
        return {
            activeName:'first',
            sort:'',
            name:'',
            type:'',
            des:'',
            options:'',
            isPush:true,
            id : '',
            appList:[]
        }
    },
    methods: {
        addPrograma(){
            addPrograma({
                sort:this.sort,
                name:this.name,
                type:this.type,
                des:this.des,
                userType:JSON.stringify(this.appList)
                })
            .then(res=>{
                if(res.data.code==1000){
                    this.$message({
                        duration:2000,
                        type:'success',
                        message:'添加成功'
                    });
                    this.sotr = '';
                    this.name = '';
                    this.type = '';
                    this.des = '';
                }else{
                    this.$message({
                        duration:2000,
                        type: 'error',
                        message:'添加失败'
                    });
                }
            })
            .catch(err=>{
                this.$message({
                    duration:2000,
                    type: 'error',
                    message:'添加失败'
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
</style>