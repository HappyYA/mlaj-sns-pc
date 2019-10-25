<template>
    <div class="login-container">
        <div class="login-form">
            <div class="form-header">
                <img class="login-logo" src="./../../assets/logo_login.png" alt="">
                <p class="login-title">美乐爱CMS后台管理系统</p>
            </div>
            <!-- <h1>美乐爱成长营-后台登录</h1> -->
            <el-form class="form-con" @keyup.enter.native="login"> 
                <el-form-item>
                    <el-input v-model="form.name" placeholder="用户名" class="input-text-login">
                        <template slot="prepend">
                            <img class="login-img" src="./../../assets/user.png" alt="">
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.pwd" placeholder="密码" type="password" class="input-text-login">
                        <template slot="prepend"><img class="login-img" src="./../../assets/pwd.png" alt=""></template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="login-btn" type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="slogan">
            <p class="slogan-Chinese">为祖国养育世界级人才</p>
            <p class="slogan-English">Nurturing World-class talents for our country</p>
        </div>
    </div>
</template>
<script>
import {login} from '@/utils/public.js';
export default {
    name:'Login',
    data(){
        return{
            form:{
                name:'',
                pwd:''
            }
        }
    },
    methods:{
        login(){
            login({
                password:this.form.pwd,
                name:this.form.name
            })
            .then(res=>{
                if(res.data.code=='1000'){
                    sessionStorage.setItem('flag',true);
                    this.$router.push({ path: '/' });
                }else{
                    this.$message({
                        duration:1000,
                        type: 'error',
                        message:'登录失败'
                    });
                }
            })
            .catch(err=>{
                this.$message({
                    duration:1000,
                    type: 'error',
                    message:'登录失败'
                });
            })
            
        }
    }
}
</script>
<style lang="scss" scoped>
    .login-container{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        padding-top: 164px;
        flex-direction: column;
        align-items: center;
        // justify-content: center;
        background-color: rgba(0,0,0,0.5);
        background-image: url('./../../assets/bg.png');
        background-size: over;
    }
    .login-form{
        width: 576px;;
    }
    .form-header{
        text-align: center;
    }
    .login-logo{
        width: 53px;
        height: 53px;;
    }
    .login-title{
        font-size: 24px;
        font-weight: bold;
        color: #333333;
        margin: 17px 0 42px 0;
    }
    .login-btn{
        width: 100%;
        background-color: #5DCB65;
        border: 0 none;
        height: 70px;
        font-size:24px;
        border-radius:10px;
    }
    .login-btn:hover{
        color: #fff;
    }
    .form-con{
        width: 576px;
        box-sizing: border-box;
        background-color: #fff;
        padding: 42px 50px 34px 50px;
        box-shadow:0px 0px 53px 6px rgba(104,104,104,0.08);
        border-radius:10px;
    }
    .input-text-login{
        height: 50px;
    }
    .login-img{
        height: 100%;;
    }
    .slogan{
        color: #fff;
        margin-top: 136px;
        text-align: center;
        .slogan-Chinese{
            font-size: 30px;
            margin-bottom: 14px;
        }
        .slogan-English{
            font-size: 12px;
        }
    }
</style>