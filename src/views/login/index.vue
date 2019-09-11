<template>
    <div class="login-container">
        <div class="login-form">
            <h1>美乐爱成长营-后台登录</h1>
            <el-form>
                <el-form-item>
                    <el-input v-model="form.name" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.pwd" placeholder="密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="login-btn" type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
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
                sessionStorage.setItem('flag',true);
                this.$router.push({ path: '/' });
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
        align-items: center;
        justify-content: center;
        background-color: rgba(0,0,0,0.5) 
    }
    .login-form{
        width: 260px;
        height: 230px;
        background-color: rgba(0,0,0,0.5);
        border-radius: 4px;
        padding: 20px;
        h1{
            text-align: center;
            color: #fff;
            font-size: 24px;
            margin-bottom: 20px;
            font-weight: 400;
            margin-top: 0;
        }
    }
    .login-btn{
        width: 100%;
    }
</style>