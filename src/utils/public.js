let axios = require('axios');
import {
    publicUrl
} from './config';
export const getTagId = (name) => {
    return axios.post(publicUrl + '/tag', {
        name: name
    })
}
// 发布文章
export const pushArticle = (info,id)=>{
    let url = id?`${publicUrl}/article?id=${id}`:`${publicUrl}/article`;
    let type = id?'put':'post';
    return axios.request({
        url:url,
        method:type,
        data:{
            cover_img: info.cover_img,
            status: info.status,
            title: info.title,
            zone_id: 1,
            origin: info.origin,
            tag_ids: info.tag_ids,
            content: info.content,
            draft :info.draft,
            type_id: 1,
            crowd:info.crowd,
            columnIds:info.columnId
        }
    })
}
// 获取草稿
export const getDraft = (id)=>{
    return axios.get(`${publicUrl}/article?id=${id}`)
}
// 获取文章列表
export const getArticleList = (page=1,status=2)=>{
    return axios.post(`${publicUrl}/article/query/page`,{
        page_size:10,
        current_page:page,
        status:status,
        type_id:0
    })
}
// 删除文章
export const delArticle = (id)=>{
    return axios.delete(`${publicUrl}/article?id=${id}`)
}
export const getProgramaList = ()=>{
    return axios.get(publicUrl+'/column/page?pageSize=100')
}
export const addPrograma = (info)=>{
    return axios.get(`${publicUrl}/column/add?name=${info.name}&sort=${info.sort}&type=${info.type}&describe=${info.des}`)
}
export const delPrograma = (id) =>{
    return axios.get(`${publicUrl}/column/delete?id=${id}`)
}
export const getProgramaInfo = (id) =>{
    return axios.get(`${publicUrl}/column/getInfo?id=${id}`)
}
export const updateProgramaInfo = (info) =>{
    return axios.get(`${publicUrl}/column/update?id=${info.id}&describe=${info.describe}&name=${info.name}&sort=${info.sort}`)
}
export const login = (info)=>{
    return axios.post(`${publicUrl}/backenduser/login`,{
        password:info.password,
        user_name:info.name
    },{
        headers:{
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
        },
        transformRequest:[function(data){
            let ret = ''
            for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }]
    })
}