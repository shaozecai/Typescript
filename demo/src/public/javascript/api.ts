import dnwe from './dnwe';
// 公共请求报错方法
let httpError = function(err:object) {
    console.log('捕获异常：',err)
}
/**
 * 接口定义
 */
interface createApi{
    getUserInfo?:any,
    getList?:any
}
let interfaces:createApi = Object.create(null);

// 获取用户信息接口
interfaces.getUserInfo = function(payload:object,callback:any){
    let params:object = {
        ...{},
        ...payload
    }
    dnwe.post('/getUserInfo',params).then((res:object):object => {
        return res
    }).then((json:object):any =>{
        callback(json)
    }).catch((e:object):void => {
        httpError(e)
    })
}
// 查询列表接口
interfaces.getList = function(payload:object,callback:any){
    let params:object = {
        ...{},
        ...payload
    }
    dnwe.post('/getList',params).then((res:object):object => {
        return res
    }).then((json:object):any =>{
        callback(json)
    }).catch((e:object):void => {
        httpError(e)
    })
}

export default interfaces