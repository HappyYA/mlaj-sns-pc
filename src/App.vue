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
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
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
.input-text-login .el-input__inner{
    height: 100%;
    border-radius: 0;
}
.input-text-login .el-input-group__prepend{
    padding: 0;
    font-size: 0;
}
.el-radio__input.is-checked .el-radio__inner {
  color: #5DCB65;
  background-color: #5DCB65;
}
.el-radio__input.is-checked .el-radio__inner {
    border-color: #5DCB65;
    background: #5DCB65;
}
.el-radio__input.is-checked+.el-radio__label{
  color: #5DCB65;
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color: #5DCB65;
  border-color: #5DCB65;
}
.el-checkbox__input.is-checked+.el-checkbox__label{
   color: #5DCB65;
}
.el-checkbox__inner:hover{
   border-color: #5DCB65;
}
.el-checkbox__input.is-focus .el-checkbox__inner{
  border-color: #5DCB65;
}
.el-radio__inner:hover{
  border-color: #5DCB65;
}
.el-button--primary{
    color: #FFF;
    background-color: #5DCB65;
    border-color: #5DCB65;;
}
.el-button:focus, .el-button:hover{
    color: #5DCB65;
    border-color: rgb(201, 241, 204);
    background-color: rgb(222, 248, 223);
}
.el-tabs__item.is-active{
  color: #5DCB65;
}
.el-tabs__active-bar{
   background-color: #5DCB65;
}
.el-tabs__item:hover{
   color: #5DCB65;
}
.el-pager li{
  background-color: transparent;
  color: #747474;
  font-size: 16px;
}
.el-pager li.active{
  color: #5DCB65;
}
.el-pager li:hover{
  color: #5DCB65;
}
.el-pagination.is-background .el-pager li:not(.disabled).active{
   background-color: #5DCB65;
}
.el-pagination .btn-next, .el-pagination .btn-prev{
  background-color: #5DCB65;
  color: #fff;
}
.el-pagination button:disabled{
  background-color: rgb(159, 238, 164);
  color: #fff;
  padding: 0;
  width: 80px;
  height: 30px;
  border-radius: 15px;
}
.el-pagination .btn-next{
  padding: 0;
  width: 80px;
  height: 30px;
  border-radius: 15px;
}
.el-pagination .btn-next, .el-pagination .btn-prev{
  padding: 0;
  width: 80px;
  height: 30px;
  border-radius: 15px;
}
.el-pagination button:hover{
  color: #fff;
}
.el-pagination__total{
  float: left;
  height: 30px;
  width: 80px;
  border-radius: 15px;
  background-color: #5DCB65;
  color: #fff;
  text-align: center;
}
.el-tabs__nav-scroll{
  background-color: #fff;
  padding-left: 20px;
}
.el-tabs__nav-wrap::after{
  height: 1px;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected{
  color: #5DCB65;
}
.el-select .el-tag{
  background-color: rgb(125, 216, 131);
  color: #fff;
}
.el-tag{
  background-color: rgb(125, 216, 131);
  color: #fff !important;
}
.el-tag .el-tag__close{
  color: #006607;
}
</style>
