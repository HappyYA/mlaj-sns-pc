<template>
    <div>
        <el-menu
            :default-openeds="['1']"
            :default-active="routerPath"
            class="nav-slider"
            @open="handleOpen"
            @close="handleClose"
            background-color="#fff"
            text-color="#222"
            router 
            active-text-color="#f85959">
            <el-submenu index="1">
                <template slot="title">
                    <i class=""><img class="logos" src="../../../assets/logos.png" alt="" srcset=""></i>
                    <span class="nav-header">内容管理</span>
                </template>
                <el-menu-item index="/publish">发文章</el-menu-item>
                <el-menu-item index="/articles">文章管理</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
export default {
    name:'AppSlider',
    data() {
        return {
            routerPublish:{
                
            },
            routerPath:'/publish'

        }
    },
    methods:{
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>
<style lang="scss" scoped>
    // 重置element样式
    .el-menu-item:focus, .el-menu-item:hover {
        outline: 0;
        background-color: #fff !important;
        color: #f85959 !important;
    }
    .nav-slider{
        width: 200px;
        box-shadow: 0 0 5px 0 rgba(0,0,0,.05);
        background-color: #fff;
    }
    .logos{
        height: 20px;
        width: 20px;
        position: relative;
        left: -4px;
    }
    .nav-header{
        font-size: 16px;
        font-weight: 500;
    }
</style>