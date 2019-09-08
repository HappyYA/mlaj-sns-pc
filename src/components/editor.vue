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
                    <span id="addOss">添加图片</span>
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
            dialogVisible: false
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
                        height:'400px',
                        path:'/editor/lib/',
                        htmlDecode:true,
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
                        toolbarHandlers:{
                            /**
                            * @param {Object}      cm         CodeMirror对象
                            * @param {Object}      icon       图标按钮jQuery元素对象
                            * @param {Object}      cursor     CodeMirror的光标对象，可获取光标所在行和位置
                            * @param {String}      selection  编辑器选中的文本
                            */
                            video:function(cm, icon, cursor, selection){
                                
                                //var cursor    = cm.getCursor();     //获取当前光标对象，同cursor参数
                                //var selection = cm.getSelection();  //获取当前选中的文本，同selection参数


                                // 替换选中文本，如果没有选中文本，则直接插入
                                // cm.replaceSelection(`<video width="320" height="240" controls><source src="https://www.audi.cn/content/dam/nemo/cn/model/e-tron/video/2019/audi_spiderman_far_from_home_teaser_60sec_16x09_china_subs.mp4" type="video/mp4">您的浏览器不支持 video 标签。</video>`);
                                // cm.setCursor(cursor.line);

                                // 如果当前没有选中的文本，将光标移到要输入的位置
                                // if(selection === "") {
                                //     cm.setCursor(cursor.line, cursor.ch + 1);
                                // }

                                // this == 当前editormd实例
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
                                    await vm.fetchScript('/oss/plupload-2.1.2/js/plupload.full.min.js')
                                    await vm.fetchScript('/oss/upload.js')
                                        uploaders.editor= cm;
                                        uploaders.init()
                                    })       
                            }
                        }
                    })
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
            this.dialogVisible=false
        }
    }
    
}
</script>
<style lang="scss" scoped>
    .add-img{
        
    }
</style>