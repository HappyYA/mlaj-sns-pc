<template>
    <div>
         <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部" name="first">
                <artivle-list
                    :status='2'
                ></artivle-list>
            </el-tab-pane>
            <el-tab-pane label="已发表" name="second">
                <artivle-list
                    :status='1'
                ></artivle-list>
            </el-tab-pane>
            <el-tab-pane label="草稿箱" name="third">
                <artivle-list
                    :status='0'
                ></artivle-list>
            </el-tab-pane>
        </el-tabs>
 
    </div>
</template>
<script>
import artivleList from './components/articleList';
export default {
    name:'articles',
    data() {
        return {
            activeName:'first'
        }
    },
    components:{
        artivleList
    },
    methods: {
        handleClick(){
            
        }
    },
}
</script>
<style lang="scss" scoped>

</style>