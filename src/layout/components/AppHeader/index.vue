<template>
    <div class="header-con">
        <div class="header">
            <div class="logo">美乐爱内容平台</div>
            <div class="user-info">
                <img class="user-icon" :src="userIcon" alt="">
                <span class="user-name">美乐爱</span>
                <img @click="quit" class="quit" src="../../../assets/quit.png" >
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'AppHeader',
    data() {
        return {
            userIcon:require('../../../assets/header.png')
        }
    },
    methods: {
        quit(){
            sessionStorage.removeItem('flag');
            this.$router.push({ path: '/login' });
        }
    },
}
</script>
<style lang="scss" scoped>
    .header-con{
        width: 100%;
        height: 60px;
        background-color: #fff;
    }
    .header{
        width: 1180px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .logo{
        font-size: 20px;
        color: #000;
        font-weight: bold;
    }
    .user-info{
        display: flex;
        align-items: center;
    }
    .user-icon{
        height: 30px;
        width: 30px;
        margin-right: 6px;
        border-radius: 50%;
    }
    .user-name{
        margin-right: 24px;
    }
    .quit{
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
</style>