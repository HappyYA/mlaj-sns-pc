<template>
    <div>
        <div class="list-item" v-for="(item,index) in list" :key="item.id">
            <div class="item-left article">
                <div class="article-img-con">
                    <img class="article-img" :src="item.cover_img" alt="">
                </div>
                <div class="article-con">
                    <p class="artile-title">{{item.title}}</p>
                    <p class="article-num">
                        <span>浏览 20 </span>  
                        <span>点赞 20</span>
                    </p>
                    <p class="article-people">
                        <span>已发人群 </span>
                        <span class="people">老师</span>
                        <span class="people">园长</span>
                    </p>
                </div>
            </div>
            <div class="item-right">
                <img class="edit" v-if="item.status===0" :src="editImg" alt="">
                <img class="del-img"  :src="delImg" alt="">
            </div>
        </div>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="totalSize"
            @current-change="getNowList"
        >
        </el-pagination>
    </div>
</template>
<script>
import {getArticleList} from '@/utils/public.js'
export default {
    name:'articleList',
    props:{
        status:'',
    },
    data() {
        return {
            delImg:require('../../../assets/del.png'),
            editImg:require('../../../assets/edit.png'),
            articleImg:require('../../../assets/articleCover.png'),
            list:[],
            totalSize:0,
            totalPage:0,
            nowPage:0
        }
    },
    mounted() {
        this.getList(1)
    },
    methods: {
        getList(page){
            getArticleList(page,this.status)
            .then(res=>{
                const info = res.data.data
                this.list = info.data_list
                this.totalPage = info.page_info.total_page
                this.totalSize = info.page_info.total_size
                console.log(res.data.data)
            })
        },
        getNowList(val){
            console.log(val)
            this.getList(val)
            
        },
        delItem(){
            
        }
    },
}
</script>
<style lang="scss" scoped>
.list-item{
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 10px 44px 16px 15px;
    box-sizing: border-box;
}
.article-con{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 95px;
}
.article-img-con{
    margin-right: 21px;
}
.article-img{
    width: 170px;
    height: 95px;
}
.article{
    display: flex;
    align-items: center;
}
.artile-title{
    font-size: 16px;
    color: #333333;
    font-weight: 800;
    margin: 0;
}
.article-num{
    margin: 0;
    color: #999999;
    font-size: 16px;
}
.article-people{
    margin: 0;
    .people{
        display: inline-block;
        height: 34px;
        line-height: 34px;
        text-align: center;
        width: 61px;
        border-radius: 17px;
        border: 1px solid #9999;
        margin-right: 6px;
    }
}
.item-right{
    .edit{
        margin-right: 30px;
        cursor: pointer;
    }
    img{
        cursor: pointer;
    }
}

</style>