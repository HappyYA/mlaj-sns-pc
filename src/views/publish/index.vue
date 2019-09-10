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
                        <el-radio :label="3">三图</el-radio>
                        <el-radio :label="6">自动</el-radio>
                    </el-radio-group>
                    <div class="add">
                        <div id="add-fm" class="add-img"><span v-if="!imgSrc" id="add-fa">添加封面</span><img class="fengmian" v-if="imgSrc" :src="imgSrc" alt=""></div>
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
                    <el-checkbox-group v-model="peopleList">
                        <el-checkbox label="家长"></el-checkbox>
                        <el-checkbox label="老师"></el-checkbox>
                        <el-checkbox label="园长"></el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>
            <el-row class="info-item">
                <el-col :span="3" class="info-title">
                    标签
                </el-col>
                <el-col :span="12">
                    <div>已选标签</div>
                    <div>
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
                <el-button round>存草稿</el-button>
                <el-button round>预览</el-button> 
                <el-button @click = "submitArticle" type="primary" round>发布</el-button> 
            </el-row>
        </div>
    </div>
</template>
<script>
import editor from '@/components/editor';
if (typeof window !== 'undefined') {
  var $s = require('scriptjs');
}
export default {
    name:'publish',
    data() {
        return {
            articleTitle:'',
            imgSrc:'',
            radio:1,
            author:'',
            origint:'',
            origin:1,
            peopleList:[],
            tags:[{name:'育儿知识'},{name:'父母提醒'}],
            recommends:[{name:'育儿知识'},{name:'父母提醒'},{name:'性格培养'},{name:'幼师成长'},{name:'区角素材'}],
            html:''
        }
    },
    components:{
        editor
    },
    mounted(){
        let vm = this;
        (async ()=>{
            await vm.fetchScript('/oss/crypto1/crypto/crypto.js')
            await vm.fetchScript('/oss/crypto1/hmac/hmac.js')
            await vm.fetchScript('/oss/crypto1/sha1/sha1.js')
            await vm.fetchScript('/oss/base64.js')
            // await vm.fetchScript('/oss/plupload-2.1.2/js/plupload.full.min.js')
            await vm.fetchScript('/oss/upload1.js')
            vm.$nextTick(()=>{
                uploaderImg.init();
                uploaderImg.vm = vm;
            })
        })()
    },
    methods:{
        fetchScript(url) {
            return new Promise((resolve) => {
                $s(url, () => {
                    resolve()
                })
            })
        },
        addTag(index){
            this.tags.push(this.recommends[index])
        },
        closeTag(index){
            this.tags.splice(index,1)
        },
        markdownChange(markdown,html){
            this.html = html;
            console.log(markdown,html)
        },
        submitArticle(){
            this.$axios
            .post('submitArticle',{
            cover_img: coverphotostr,
            status: 1,
            title: $('.tictitle').val(),
            zone_id: 1,
            origin: origins,
            tag_ids: tagid.slice(0, -1),
            content: contentarrs,
            type_id: overnum,
            crowd:allpeople},)
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
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
                color: #f85959;
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
    .add-img{
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
    }
    .recommend-tags{
        display: flex;
        margin-top: 20px;
    }
    .recommend-title{
        margin-right: 10px;
    }
    .tag-item{
        padding: 4px;
        background-color: #f0f1f3;
        margin-right: 10px;
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
</style>
