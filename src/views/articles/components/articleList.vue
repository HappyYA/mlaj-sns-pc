<template>
    <div>
        <div class="list-item" v-for="(item,index) in list" :key="item.id">
            <div class="item-left article">
                <div class="article-img-con">
                    <img class="article-img" :src="item.cover_img?item.cover_img:articleImg" alt="">
                </div>
                <div class="article-con">
                    <p class="artile-title">{{item.title}}</p>
                    <p class="article-num">
                        <span>浏览 {{item.read_number}} </span>  
                        <span>点赞 {{item.like_number}}</span>
                    </p>
                    <p class="article-people">
                        <span>已发人群 </span>
                        <span class="people" v-for="(item1) in item.crowd_list" :key="item1">{{crowdMap[item1]}}</span>
                    </p>
                </div>
            </div>
            <div class="item-right">
                <img @click="editItem(item.id)" class="edit" v-if="item.status===0" :src="editImg" alt="">
                <img @click="delItem(item.id)" class="del-img"  :src="delImg" alt="">
            </div>
        </div>
        <div v-if="totalSize" class="pagination">
            <el-pagination
                layout=" total,prev, pager, next"
                :current-page="currentPage"
                :total="totalSize"
                prev-text="上一页"
                next-text="下一页"
                :page-size='5'
                @current-change="getNowList"
            >
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {getArticleList,delArticle} from '@/utils/public.js'
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
            nowPage:0,
            currentPage:0,//当前页
            crowdMap:{
                1:'教师',
                2:'园长',
                0:'家长'
            }
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
        delItem(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return delArticle(id)
            }).then(res=>{
                if(res.data.code==1000){
                    this.currentPage = 1;
                    this.getList(1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }else{
                    this.$message({
                        duration:1000,
                        type: 'error',
                        message:'删除失败'
                    });
                }
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
            
            console.log(id)
        },
        editItem(id){
            this.$router.push({path:'/publish',query:{id:id}});
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
    border-bottom: 1px solid #E4E7ED;
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
.pagination{
    margin-top: 86px;
    margin-bottom: 94px;
    width: 100%;
    text-align: center;
}

</style>