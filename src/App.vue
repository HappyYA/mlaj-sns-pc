<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="scss">
body{
  background-color: #f8f8f8;
}
.editor-title-input .el-input__inner{
  border: 0!important;
  font-size: 20px;
  color: #595959;
  font-weight: 400;
  &::-webkit-input-placeholder{
    color: #999;
  }
  &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
   color:    #909;
  }
  &::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #909;
  }
  &:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color:    #909;
  }
}
.dialog-phone .el-dialog{
    background-color: transparent;
}
</style>
