import {AUTH_SUCCESS,ERROR_MSG} from './action-types';
//同步错误消息
const errorMsg=(msg)=>({type:ERROR_MSG,data:msg});
import {reqLogin, reqRegister} from '../api'
//同步成功响应
const authSuccess =(user)=>({type:AUTH_SUCCESS,data:user});
/*
* 异步注册
* */
export function register({username, password, password2, type}) {
//    进行前台表单验证，如果不合法返回一个同步action对象，显示提示信息
    if(!username || !password || !type){
      return errorMsg('用户名密码必须输入正确')
    }
    if(password!==password2){
        return errorMsg('密码和确认密码不一致')
    }
    return dispatch=>{
     //   执行异步ajax请求注册接口
     reqRegister({username,password,type,password2})
         .then(response=>{
             const result=response.data;
             console.log(23)
             console.log(result)
             if(result.code===0){//注册成功
                 const user=result.data;
                 dispatch(authSuccess(user))

             }else {
                 dispatch(errorMsg(result.msg))
             }
         })

    }
}
// 登陆的异步action
export const login = (username, password) => {
    return dispatch => {
        // 执行异步ajax请求登陆接口
        reqLogin(username, password).then(response => {
            const result = response.data  // {code: 0/1: data/msg: ???}
            if(result.code===0) { // 注册成功
                const user = result.data
                dispatch(authSuccess(user)) // 分发一个成功同步action
            } else { // 注册失败
                dispatch(errorMsg(result.msg)) // 分发一个失败同步action
            }
        })
    }
}