<template>
    <div>
        <el-container>
            <el-header class="header-con">
                <app-header></app-header>
            </el-header>
            <el-container class="main-con">
                <el-aside class="layout-aside">
                    <app-slider></app-slider>
                </el-aside>
                <el-main class="layout-main">
                    <app-main></app-main>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import {AppHeader,AppMain,AppSlider} from './components'
export default {
    name:'Layout',
    components:{
        AppHeader,
        AppMain,
        AppSlider
    }
}
</script>
<style lang="scss" scoped>
    .layout-aside{
        overflow: hidden;
        padding: 0;
        width: 210px !important;
        margin-right: 10px;
    }
    .layout-main{
        padding: 0;
    }
    .header-con{
        padding: 0;
        margin-bottom: 20px;
    }
    .main-con{
        width: 1180px;
        margin: 0 auto;
    }
</style>