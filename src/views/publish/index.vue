<template>
    <div class="article">
        <div class="tabs">
            <ul class="tab-list">
                <li class="active">文章</li>
                <!-- <li>图集</li>
                <li>微头条</li>
                <li>小视频</li>
                <li>问答</li> -->
            </ul>
        </div>
        <div class="editor-con">
            <div class="editor-title">
                <el-input class="editor-title-input" 
                    v-model="articleTitle"
                    maxlength='50' 
                    placeholder="请输入文章标题(5-50个汉字)"></el-input>
            </div>
            <div class="">
                 <editor 
                    :onchange="markdownChange"
                    ref="markdown"
                    :initData="editorInitData"
                 ></editor> 
            </div>
        </div>
        <div class="articles-info">
            <el-row type="flex" class="info-item">
                <el-col :span="3">
                    <div class="info-title">
                        封面
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-radio-group v-model="radio">
                        <el-radio :label="1">单图</el-radio>
                        <!-- <el-radio :label="3">三图</el-radio>
                        <el-radio :label="6">自动</el-radio> -->
                    </el-radio-group>
                    <div class="add" id="addCon1">
                        <div  class="add-img1" id="addImg1">
                            <img src="../../assets/add.png" v-if="!imgSrc" >
                            <img class="fengmian" v-if="imgSrc" :src="imgSrc" alt="">
                        </div>
                        <div class="add-img-tip">
                            优质的封面有利于推荐，请使用清晰度较高的图片，避免使用GIF、带大量文字的图片。
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row class="info-item">
                <el-col :span="3" class="info-title">来源</el-col>
                <el-col :span="12">
                    <el-radio-group v-model="origin">
                        <el-radio :label="1">原创</el-radio>
                        <el-radio :label="2">转载</el-radio>
                    </el-radio-group>
                    <div class="origin" v-if="origin==2">
                        <el-input class="origin-item" placeholder="请输入内容" v-model="author">
                            <template slot="prepend">作者：</template>
                        </el-input>
                        <el-input class="origin-item" placeholder="请输入内容" v-model="origint">
                            <template slot="prepend">来源：</template>
                        </el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row class="info-item">
                <el-col :span="3" class="info-title">
                    人群
                </el-col>
                <el-col :span="12">
                    <el-checkbox-group v-model="peopleList" @change="checkboxChange">
                        <el-checkbox :label="0">家长</el-checkbox>
                        <el-checkbox :label="1">教师</el-checkbox>
                        <el-checkbox :label="2">园长</el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>
             <el-row class="info-item">
                <el-col :span="3" class="info-title">
                    栏目
                </el-col>
                <el-col :span="12">
                    <el-select class="selcet_pra" v-model="programa" filterable multiple placeholder="请选择栏目">
                        <el-option
                            v-for="item in programaList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row class="info-item">
                <el-col :span="3" class="info-title">
                    文章类型
                </el-col>
                <el-col :span="16">
                    <el-radio-group v-model="articleType">
                        <el-radio :label="1">图文</el-radio>
                        <el-radio :label="2">视频</el-radio>
                        <el-radio :label="3">音频</el-radio>
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-row class="info-item">
                <el-col :span="3" class="info-title">
                    标签
                </el-col>
                <el-col :span="16">
                    <div class="already-tag">已选标签:</div>
                    <div class="already-tag-list">
                        <el-tag
                            class="tag"
                            v-for="(tag,index) in tags"
                            :key="tag.name"
                            @close="closeTag(index)"
                            closable
                            :type="tag.type">
                            {{tag.name}}
                        </el-tag>
                    </div>
                    <div>
                        <el-input class="add-tag-item" 
                        v-model="addTagItemInput"
                        @keyup.enter.native="addTag" 
                        maxlength='50' 
                        placeholder="输入标签"></el-input>
                    </div>
                    <div class="recommend-tags">
                        <div class="recommend-title">推荐标签:</div>
                        <div class="recommend-tag">
                            <span class="tag-item" 
                                    v-for="(tag,index) in recommends" 
                                    :key="tag.name"
                                    @click="addTag(index)"
                                    >{{tag.name}}</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="submit">
            <el-row class="submit-list">
                <el-button round @click = "savedraft">存草稿</el-button>
                <!-- <el-button round @click = "handlePreview">预览</el-button>  -->
                <el-button @click = "submitArticle" type="primary" round>发布</el-button> 
            </el-row>
        </div>
        <!-- <phone
            :isShowPhone="isShowPhone"
            :handleClose="closePhone"
        ></phone> -->
    </div>
</template>
<script>
import editor from '@/components/editor';
// import phone from '@/components/phone';
import {getTagId,pushArticle,getProgramaList,getDraft} from '@/utils/public.js'
if (typeof window !== 'undefined') {
  var $s = require('scriptjs');
}
export default {
    name:'publish',
    data() {
        return {
            articleTitle:'',
            imgSrc:'', // 封面图片地址完整
            cover_img:'',//传给后台的封面地址
            radio:1,
            author:'',
            origint:'',
            origin:1,
            peopleList:[], // 发布人群
            tags:[],
            markTemp:'',
            markdown:'',
            tagIdTemp:[],
            recommends:[{name:'育儿知识'},{name:'父母提醒'},{name:'性格培养'},{name:'幼师成长'},{name:'区角素材'}],
            html:'', //传给后台的html
            isFirstLoad:true,//是否是第一次加载
            addTagItemInput:'', //添加咋的标签
            tagsId :'',// 穿给后台的标签ID
            originInfo:{},//传给后台的来源信息
            programa:[],//栏目
            programaList:[],//栏目列表
            allPrograma:[],//全部栏目数据
            articleId :'',//文章Id
            editorInitData:'',//初始化markdown数据
            isShowPhone:false, // 是否显示预览手机
            articleType:1,//文章类型
        }
    },
    components:{
        editor,
        // phone
    },
    mounted(){
        let vm = this;
        // uploaderImg.init();
        // uploaderImg.vm = vm;
        // console.log(1)
        (async ()=>{
            if(vm.isFirstLoad){
                await vm.fetchScript('/oss/crypto1/crypto/crypto.js')
                await vm.fetchScript('/oss/crypto1/hmac/hmac.js')
                await vm.fetchScript('/oss/crypto1/sha1/sha1.js')
                await vm.fetchScript('/oss/base64.js')
                // await vm.fetchScript('/oss/plupload-2.1.2/js/plupload.full.min.js')
                await vm.fetchScript('/oss/upload1.js')
                vm.$nextTick(()=>{
                    if(vm.isFirstLoad){
                       window.uploaderImg.init();
                       window.uploaderImg.vm = vm;
                        vm.isFirstLoad= false
                    }
                })
            }
        })()
        
        // this.getProgramaList();
    },
    methods:{
        fetchScript(url) {
            return new Promise((resolve) => {
                $s(url, () => {
                    resolve()
                })
            })
        },
        getProgramaList(){
            getProgramaList(1,1000).then(res=>{
                if(res.data.code==1000){
                    this.allPrograma = res.data.data.list;
                   this.programaList = this.filterPram(res.data.data.list,this.peopleList)
                }
            })
        },
        // 用户手动输入标签
        addTagItem(){
            let tagTemp = {};
            let vm = this;
            getTagId(this.addTagItemInput).then(res=>{
                // tagTemp.name = this.recommends[index].name;
                tagTemp.id = res.data.data.tag_id;
                if(vm.tagIdTemp.indexOf(tagTemp.id)>-1){
                    vm.$message({
                        duration:1000,
                        message:'请不要重复添加标签'
                    });
                }else{
                    vm.tags.push(tagTemp),
                    vm.tagIdTemp.push(tagTemp.id);
                }
            })
        },
        // 用户点击推荐标签 添加标签
        addTag(index){
                let tagTemp = {};
                let vm = this;
                let isNotEnter = (typeof index ==='number')
                let name = isNotEnter ? this.recommends[index].name : this.addTagItemInput
                if(!isNotEnter && !this.addTagItemInput){
                    vm.$message({
                        duration:1000,
                        message:'请输入要添加的标签'
                    });
                }
                getTagId(name).then(res=>{
                    tagTemp.name = name;
                    tagTemp.id = res.data.data.tag_id;
                    if(vm.tagIdTemp.indexOf(tagTemp.id)>-1){
                        vm.$message({
                            duration:1000,
                            message:'请不要重复添加标签'
                        });
                    }else{
                        vm.tags.push(tagTemp),
                        vm.tagIdTemp.push(tagTemp.id);
                        if(!isNotEnter && vm.addTagItemInput){
                           vm.addTagItemInput=''
                        }
                    }
                })
        },
        closeTag(index){
            this.tagIdTemp.splice(index,1)
            this.tags.splice(index,1)
        },
        markdownChange(){
            // this.html = info.html;
            // this.markdown = info.markdown
            // console.log(markdown,html)
        },
        submitArticle(){
            this.html = this.$refs.markdown.getHTML();
            this.markdown = this.$refs.markdown.getMarkdown();
            if(!this.articleTitle){
                this.$message({
                    duration:1000,
                    type: 'warning',
                    message:'请添加标题'
                });
                return false;
            }
            if(!this.html){
                this.$message({
                    duration:1000,
                    type: 'warning',
                    message:'文章内容为空'
                });
                return false;
            }
            if(!this.cover_img){
                this.$message({
                    duration:1000,
                    type: 'warning',
                    message:'请添加封面'
                });
                return false;
            }
            if(!this.peopleList.toString()){
                this.$message({
                    duration:1000,
                    type: 'warning',
                    message:'请选择发布端'
                });
                return false;
            }
            if(!this.tagIdTemp.toString()){
                this.$message({
                    duration:1000,
                    type: 'warning',
                    message:'请选择标签'
                });
                return false;
            }
            if(this.tagIdTemp.length>5){
                this.$message({
                    duration:1000,
                    type: 'warning',
                    message:'标签最多只能有五个'
                });
                return false;
            }
            if(this.programa.length===0){
                this.$message({
                    duration:1000,
                    type: 'warning',
                    message:'请选择栏目'
                });
                return false;
            }
            if(this.origin==1){
                this.originInfo = JSON.stringify({});
            }else if(this.origin==2 && !this.origint && !this.origint){ 
                this.$message({
                    duration:1000,
                    type: 'warning',
                    message:'请补充转载来源信息'
                });
                return false;
            }else if(this.origin==2 && this.origint && this.origint){
                this.originInfo = JSON.stringify({
                    author:this.author,
                    origin:this.origint
                });
            }
            let vm = this; 
            pushArticle({
                    cover_img: vm.cover_img,
                    status: 1, //发布状态
                    title: vm.articleTitle,
                    zone_id: 1,
                    origin: vm.originInfo,
                    tag_ids: vm.tagIdTemp.toString(),
                    content: vm.html,
                    draft :vm.markdown,
                    type_id: vm.articleType,
                    crowd:vm.peopleList.toString(),
                    columnId:vm.programa
            },vm.articleId)
            .then(res=>{
                if(res.data.code==1000){
                    this.$message({
                        duration:1000,
                        type: 'success',
                        message:'发表成功'
                    });
                    this.resetData()
                    this.$router.push('/articles')
                }else{
                    this.$message({
                        duration:1000,
                        type: 'error',
                        message:'发表失败'
                    });
                }
            })
            .catch(err=>{
                this.$message({
                        duration:1000,
                        type: 'error',
                        message:err
                    });
            })
        },
        savedraft(){
            let vm = this; 
            this.html = this.$refs.markdown.getHTML();
            this.markdown = this.$refs.markdown.getMarkdown();
            if(this.origin==1){
                this.originInfo = JSON.stringify({});
            }else if(this.origin==2){
                this.originInfo = JSON.stringify({
                    author:this.author,
                    origin:this.origint
                });
            }
            pushArticle({
                    cover_img: vm.cover_img,
                    status: 0,
                    title: vm.articleTitle,
                    zone_id: 1,
                    origin: "{}",
                    tag_ids: vm.tagIdTemp.toString(),
                    content: vm.html,
                    draft :vm.markdown,
                    type_id: vm.articleType,
                    crowd:vm.peopleList.toString(),
                    columnId:vm.programa
                    },vm.articleId)
            .then(res=>{
               if(res.data.code==1000){
                    this.$message({
                        duration:1000,
                        type: 'success',
                        message:'存储成功'
                    });
                    this.resetData()
                    this.$router.push('/articles')
                }else{
                    this.$message({
                        duration:1000,
                        type: 'error',
                        message:'存储失败'
                    });
                }
            })
            .catch(err=>{
                this.$message({
                        duration:1000,
                        type: 'error',
                        message:err
                });
            })
        } ,
        // 获取草稿内容
        getDraftInfo(){
            getDraft(this.articleId)
            .then(res=>{
                if(res.data.code == 1000){
                    const info = res.data.data.article;
                    this.articleTitle = info.title;
                    this.imgSrc = info.cover_img;
                    this.peopleList = info.crowd_list;
                    this.tags = info.tag_ids_obj;
                    this.tagIdTemp = JSON.parse('['+info.tag_ids+']');
                    this.html = info.content
                    // this.programa = info.columnIds
                    this.articleType = info.type_id*1
                    this.cover_img = '/'+info.cover_img.split('/').splice(3).join('/')
                    if(this.$refs.markdown.isLoaded){
                        this.$refs.markdown.appenMarkdown(info.draft)
                    }else{
                        this.editorInitData = info.draft
                    }
                }else{
                    this.$message({
                        duration:1000,
                        type: 'error',
                        message:res.data.msg
                    });
                }
            })
            .catch(err=>{
                this.$message({
                    duration:1000,
                    type: 'error',
                    message:err
                });
            })
        },
        checkboxChange(){
        },
        resetData(){
            this.articleTitle='';
            this.cover_img='';
            this.imgSrc='';
            this.author = '';
            this.origint='';
            this.peopleList = [];
            this.tagIdTemp = [];
            this.html = '';
            this.originInfo = {};
            this.programa = [];
            this.tags = [];
            this.articleType=1;
            if(this.$refs.markdown.isLoaded){
                this.$refs.markdown.setMarkdown('');
            }

        },
        closePhone(){
            this.isShowPhone = false;
        },
        handlePreview(){
            this.isShowPhone = true;
        },
        filterPram(data=[],filterItem=[]){
            var arr = [];
            if (!data) return [];
            // if(!filterItem) filterItem=[1,2,3];
            data.forEach((value,index)=>{
                var arrTemp = filterItem.filter(item=>{
                   return  value.userTypeList.indexOf(item+1)>-1;
                });
                if(filterItem.length>0&&arrTemp.length===filterItem.length){
                    arr.push(value)
                }
            });
            // this.programaList = arr;
            return arr;
            console.log(arr)
        }

    },
    activated(){
        this.articleId = this.$route.query.id||'';
        this.getProgramaList();
        if(this.articleId||this.articleId===0){
            this.getDraftInfo()
        }
    },
    watch: {
        peopleList(val){
            this.programaList=this.filterPram(this.allPrograma,this.peopleList);
            this.programa=[]
        }
    },
    
}
</script>
<style lang="scss" scoped>
    .article{
        background-color: #fff;
    }
    .tabs{
        padding-left: 20px;
        padding-top: 20px;
        border-bottom: 1px solid #e8e8e8;
    }
    .tab-list{
        list-style: none;
        li{
            padding: 10px 20px;
            display: inline-block;
            cursor: pointer;
            &.active{
                color: #5DCB65;
            }
        }
    }
    .editor-con{
        background-color: #fff;
        padding: 20px;
    }
    .editor-title-input .el-input__inner{
        border: 0!important;
        height: 200px;
    }
    .articles-info{
        padding: 20px;
        border-top: 1px solid rgb(238, 238, 238);
    }
    .info-title{
        font-size: 16px;
        color: #999;
    }
    .add{
        display: flex;
        margin-top: 20px;
    }
    .add-img1{
        height: 105px;
        width: 150px;
        background-color: #f0f1f3;
        display: flex;
        flex-shrink:0;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
    }
    .add-img-tip{
        color: #999;
    }
    .info-item{
        margin-top: 20px;
    }
    .origin-item{
        margin-top: 10px;
    }
    .tag{
        margin-right: 6px;
        margin-bottom: 6px;
    }
    .recommend-tags{
        display: flex;
        margin-top: 20px;
    }
    .recommend-tag{
        width: 500px;
    }
    .recommend-title{
        margin-right: 10px;
        flex-shrink: 1;
        width: 100px;
    }
    .tag-item{
        padding: 4px;
        background-color: rgb(125, 216, 131);
        color: #fff !important;
        margin-right: 10px;
        margin-bottom: 8px;
        display: inline-block;
        cursor: pointer;
    }
    .submit{
        padding: 20px;
    }
    .submit-list{
        text-align: right;
    }
    .fengmian{
        width: 100%;
        height: 100%;
    }
    .already-tag{
        margin-bottom: 10px;
    }
    .already-tag-list{
        min-height: 100px;
        width: 500px;
        border: 1px solid #999;
        padding: 5px;
        border-radius: 4px;
    }
    .add-tag-item{
        margin: 5px 0;
        background: #f0f1f3;
    }
    .selcet_pra{
        width: 300px;
    }
</style>
