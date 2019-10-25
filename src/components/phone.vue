<template>
    <div>
        <el-dialog
            class="dialog-phone"
            title=""
            :visible.sync="isShowPhone"
            width="30%"
            :before-close="handleClose">
            <div class="phone">

            </div>
        
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:'phone',
    props:{
        isShowPhone:{
            type: Boolean,
            default:false
        },
        handleClose:{
            type:Function,
            default:()=>{}
        }
    },
    methods: {
        
    },
}
</script>
<style lang="scss" scoped>
.phone{
    background-image: url('./../assets/phone.png');
    background-repeat: no-repeat;
    background-size: cover;
    height: 915px;
    width: 472px;
    // transform: translate3d(-50%,-50%,0) scale(.8);
    // position: absolute;
    // top: 50%;
    // left: 50%;
}
.dialog-phone .dialog-phone{
    background-color: transparent;
}

</style>