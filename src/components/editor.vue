<template>
    <div>
    <link rel="stylesheet" href="/editor/css/editormd.min.css">
        <div :id="id" class="main-editor">
            <textarea v-model="content"></textarea>
        </div>
        <div class="add-img">
            <el-dialog
                title="上传图片"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                <div id="con">
                    <el-button id="addOss" type="primary">添加图片</el-button>
                    <!-- <span id="addOss">添加图片</span> -->
                </div>
            </el-dialog>
        </div>
        <div class="add-video">
            <el-dialog
                title="上传音视频"
                :visible.sync="dialogVisibleVideo"
                :close-on-click-modal = 'false'
                :close-on-press-escape= 'false'
                width="30%"
                :before-close="handleClose">
                <div id="con">
                   <input type="file" 
                        accept="audio/mp3, video/mp4"
                        id="fileUpload" 
                        href="javascript:void(0);"
                        style="padding:40px;line-height:40px;" class='btn'
                        @change="addVideos">
                    <el-button type="primary" @click='startAddVideo'>点击开始上传</el-button>
                    <video v-if="videoSrc" controls width="100%" :src="videoSrc"></video>
                    <audio v-if="audioSrc" controls width="100%" :src="audioSrc"></audio>
                    <el-progress :text-inside="true" :stroke-width="20" :percentage="percentage" status="exception"></el-progress>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>    

if (typeof window !== 'undefined') {
  var $s = require('scriptjs');
}
export default {
    name:'editor',
    props: {
      editorId: {
        'type': String,
        'default': 'markdown-editor'
      },
      initData:{
        'type': String,
        'default': ''
      },
      onchange: { // 内容改变时回调，返回（html, markdown, text）
        type: Function
      },
      config: { // 编辑器配置
        type: Object
      },
      initData: {
        'type': String
      },
      initDataDelay: {
        'type': Number, // 延迟初始化数据时间，单位毫秒
        'default': 0
      }
    },
    data() {
        return {
            id:'mla-editor',
            content:'',
            dialogVisible: false,
            dialogVisibleVideo:false,
            percentage:0,
            videoSrc:'',
            audioSrc:'',
            videoIsFinish:true,
            isFirst:true,
            isLoaded:false
        }
    },
    mounted(){
        let vm = this;
        vm.initEditor()
    },
    methods:{
        fetchScript(url) {
            return new Promise((resolve) => {
                $s(url, () => {
                    resolve()
                })
            })
        },
        getHTML: function () {
            return this.editor.getHTML()
        },
        getMarkdown: function () {
            return this.editor.getMarkdown()
        },
        // 插入数据
        appenMarkdown:function(markdown){
            console.log(this.isLoaded)
            // if(){

            // }
            return this.editor.replaceSelection(markdown)
        },
        setMarkdown: function (markdown) {
            return this.editor.setMarkdown(markdown)
        },
        initEditor(){
            let vm = this;
            (async ()=>{
                await vm.fetchScript('/editor/jquery.min.js')
                await vm.fetchScript('/editor/editormd.min.js')    
                vm.jsLoadOver = true
                vm.$nextTick(() => {
                    vm.editor = window.editormd("mla-editor", {
                        height:'700px',
                        path:'/editor/lib/',
                        htmlDecode:true,
                        watch:false,
                        saveHTMLToTextarea:true,
                        toolbarIcons:function(){
                            return ["undo", "redo", "|", "bold", "hr", "|", "preview", "watch", "|", "fullscreen", "info", "video",'images' ]
                        },
                         toolbarIconsClass:{
                            video:'fa-video-camera',
                            images:'fa-picture-o'
                        },
                        toolbarIconTexts:{
                            video : "视频" , // 如果没有图标，则可以这样直接插入内容，可以是字符串或HTML标签
                            images: '图片'
                        },
                        lang : {
                            toolbar : {
                                video : "插入视频",
                                images:"插入图片"
                            }
                        },
                        markdown:vm.initData,
                        toolbarHandlers:{
                            /**
                            * @param {Object}      cm         CodeMirror对象
                            * @param {Object}      icon       图标按钮jQuery元素对象
                            * @param {Object}      cursor     CodeMirror的光标对象，可获取光标所在行和位置
                            * @param {String}      selection  编辑器选中的文本
                            */
                            video:function(cm, icon, cursor, selection){
                                vm.dialogVisibleVideo=true
                                vm.$nextTick(async ()=>{
                                    await vm.fetchScript('/video/aliyun-oss-sdk-5.3.1.min.js')
                                    await vm.fetchScript('/video/aliyun-upload-sdk-1.5.0.min.js')
                                    vm.videoFn();
                                })
                                console.log(cursor);
                                
                                // console.log("testIcon =>", this, cm, icon, cursor, selection);
                            },
                            images:function(cm, icon, cursor, selection){
                                    vm.dialogVisible=true
                                    vm.$nextTick(async ()=>{
                                        await vm.fetchScript('/oss/crypto1/crypto/crypto.js')
                                        await vm.fetchScript('/oss/crypto1/hmac/hmac.js')
                                        await vm.fetchScript('/oss/crypto1/sha1/sha1.js')
                                        await vm.fetchScript('/oss/base64.js')
                                        await vm.fetchScript('/oss/upload.js')  
                                        if(vm.isFirst){
                                            uploaders.vm = vm
                                            uploaders.init()      
                                            uploaders.editor= cm;
                                            vm.isFirst= false
                                        }
                                    })       
                            }
                        }
                    })
                    vm.isLoaded = true;
                    // vm.editor.on('load', () => {
                    //     setTimeout(() => { // hack bug: 一个页面多个编辑器只能初始化其中一个数据问题
                    //         vm.initData && vm.editor.setMarkdown(vm.initData)
                    //     }, vm.initDataDelay)
                    // })
                    vm.onchange && vm.editor.on('change', () => {
                        let html = vm.editor.getHTML()
                        vm.onchange({
                            markdown: vm.editor.getMarkdown(),
                            html: html
                        })
                    })
                })

            })()
        },
        handleClose(){
            if(!this.videoIsFinish){
                this.$message({
                    duration:1000,
                    message:'文件上传中，请不要关闭'
                });
                return false;
            }
            this.dialogVisible = false
            this.dialogVisibleVideo = false
        },
        addVideos(e){
            let file = e.target.files[0]
            let url = URL.createObjectURL(file);
            if (!file) {
                alert("请先选择需要上传的文件!")
                return
            }
            this.videoSrc=URL.createObjectURL(file);
            var Title = file.name
            var userData = '{"Vod":{}}'
            // if (this.uploadervideo) {
            // //uploadervideo.stopUpload()
            // }
            // 首先调用 uploadervideo.addFile(event.target.files[i], null, null, null, userData)
            this.uploadervideo.addFile(file, null, null, null, userData)
        },
        videoFn() {
            var vm = this;
            vm.uploadervideo = new AliyunUpload.Vod({
                timeout: 60000,
                partSize: 1048576,
                parallel: 5,
                retryCount: 3,
                retryDuration: 2,
                region: 'cn-shanghai',
                userId: 99999,
                // 添加文件成功
                addFileSuccess: function (uploadInfo) {
                    console.log('添加文件成功, 等待上传...')
                    console.log("addFileSuccess: " + uploadInfo.file.name)
                    // 添加完立即上传
                    //  vm.uploadervideo.startUpload()
                },
                // 开始上传
                onUploadstarted: function (uploadInfo) {
                    var stsUrl = 'http://api-dev.ikid06.ltd/oss/sts-token';
                    $.get(stsUrl, function (data) {
                        var info = data.data;
                        var accessKeyId = info.AccessKeyId
                        var accessKeySecret = info.AccessKeySecret
                        var secretToken = info.SecurityToken
                        vm.uploadervideo.setSTSToken(uploadInfo, accessKeyId, accessKeySecret, secretToken)
                    }, 'json')
                    console.log('文件开始上传...')

                    console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
                },
                // 文件上传成功
                onUploadSucceed: function (uploadInfo) {
                    console.log('uploadInfo', uploadInfo);
                    var videoId = uploadInfo.videoId;
                    var mediaUrl = '';
                    vm.percentage = 100;
                    vm.videoIsFinish = true;
                    console.log('文件上传成功!');
                    $.get('http://api.ikid06.ltd/oss/video-url?key=' + videoId, function (data) {
                        mediaUrl = data.data.signed_url
                        if (uploadInfo.file.type.indexOf('video') > -1) {
                           vm.editor.replaceSelection('<video class="mla-video" width="320" height="240" controls><source src="' + mediaUrl + '" type="video/mp4">您的浏览器不支持 video 标签。</video>');
                        } else if (uploadInfo.file.type.indexOf('audio') > -1) {
                            vm.editor.replaceSelection('<audio class="mla-audio" controls><source src="' + mediaUrl + '" type="video/mp4">您的浏览器不支持 video 标签。</audio>');
                        }
                        vm.dialogVisibleVideo=false;
                        vm.percentage=0;
                    })
                    var obj = uploadInfo;
                    localStorage.setItem("filetemp", JSON.stringify(obj));
                },
                // 文件上传失败
                onUploadFailed: function (uploadInfo, code, message) {
                    console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
                    console.log('文件上传失败!')
                },
                // 取消文件上传
                onUploadCanceled: function (uploadInfo, code, message) {
                    console.log("Canceled file: " + uploadInfo.file.name + ", code: " + code + ", message:" + message)
                    console.log('文件已暂停上传!')

                },
                // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
                onUploadProgress: function (uploadInfo, totalSize, progress) {
                    console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(progress * 100) + "%")
                    var progressPercents = Math.ceil(progress * 100)
                    vm.percentage = progressPercents
                    // $('#sts-progress-audio').text(progressPercents)
                    console.log('文件上传中...')

                },
                // 上传凭证超时
                onUploadTokenExpired: function (uploadInfo) {
                    // 如果是上传方式二即根据 STSToken 实现时，从新获取STS临时账号用于恢复上传
                    // 上传文件过大时可能在上传过程中 sts token 就会失效, 所以需要在 token 过期的回调中调用 resumeUploadWithSTSToken 方法
                    // 这里是测试接口, 所以我直接获取了 STSToken
                    console.log('文件上传超时!')

                    var stsUrl = 'http://api-dev.ikid06.ltdoss/sts-token';
                    $.get(stsUrl, function (data) {
                        var info = data.data;
                        var accessKeyId = info.access_key_id;
                        var accessKeySecret = info.access_key_secret;
                        var secretToken = info.security_token;
                        var expiration = info.expiration;
                        vm.uploadervideo.resumeUploadWithSTSToken(accessKeyId, accessKeySecret, secretToken, expiration)
                    }, 'json')
                },
                // 全部文件上传结束
                onUploadEnd: function (uploadInfo) {
                    //          $('#fileShow').append('<img src="../img/avatar.png"/>');

                }
            })
        },
        startAddVideo(){
            if(!this.videoSrc){
                this.$message({
                    duration:1000,
                    message:'请先添加文件'
                });
                return false;
            }
            this.videoIsFinish = false;
            this.uploadervideo.startUpload();
        }
    }
    
}
</script>
<style lang="scss" scoped>
    .add-img{
        
    }
</style>