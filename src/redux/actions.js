import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG,
    RECEIVE_CHAT,
    MSG_UPDATE
} from './action-types';
import {reqLogin,
    reqRegister,
    reqUpdateUser,
    reqUser,
    reqUserList,
    reqChatMsgList,
    reqReadChatMsg
} from '../api'
import io from 'socket.io-client';
const socket=io('ws://localhost:4000')

//同步错误消息
const errorMsg=(msg)=>({type:ERROR_MSG,data:msg});
//同步成功响应
const authSuccess =(user)=>({type:AUTH_SUCCESS,data:user});
//接受用户的同步action
const receiveUser=(user)=>({type:RECEIVE_USER,data:user});

export const resetUser =(msg)=>({type:RESET_USER,data:msg});

const receiveUserList = (users) => ({type: RECEIVE_USER_LIST, data: users})

const receiveChat = ({users, chatMsgs,meId}) => ({type: RECEIVE_CHAT, data: {users, chatMsgs,meId}})

// 接收消息的同步action
const receiveMsg = (chatMsg, meId) => ({type: RECEIVE_MSG, data: {chatMsg, meId}})
const msgUpdate=({count,from,to})=>({type: MSG_UPDATE, data: {count, from, to}})
function initSocketIO (userid, dispatch) {
    socket.on('receiveMsg', function (chatMsg) {
        if(chatMsg.from===userid || chatMsg.to===userid) {
            console.log('接收到一个需要显示的消息')
            console.log(chatMsg)
            dispatch(receiveMsg(chatMsg,userid))
        } else {
            console.log('接收到一条与我无关消息')
        }
    })
}
/*
获取当前用户相关的所有聊天消息列表
(在注册/登陆/获取用户信息成功后调用)
 */
async function getMsgList (userid, dispatch) {
    initSocketIO(userid, dispatch)
    const response = await reqChatMsgList()
    const result = response.data
    if(result.code===0) {
        // {user: {}, chatMsgs: []}
        console.log('获取得到当前用户的所有聊天相关信息', result.data)
        dispatch(receiveChat({...result.data,meId:userid}))
    }
}

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
             if(result.code===0){//注册成功

                 const user=result.data;
                 getMsgList(user._id, dispatch)
                 dispatch(authSuccess(user))
             }else {
                 dispatch(errorMsg(result.msg))
             }
         })


    }
}
// 登陆的异步action
export function login({username, password}) {
//    进行前台表单验证，如果不合法返回一个同步action对象，显示提示信息
       if(!username || !password ){
         return errorMsg('用户名密码必须输入')
}
    return async dispatch=>{
        //   执行异步ajax请求注册接口
       const response=await reqLogin(username,password)
        const result=response.data;
       console.log(result)
        if(result.code===0){//登录成功
            const user=result.data;
            getMsgList(user._id, dispatch)
            dispatch(authSuccess(user))
        }else {
            dispatch(errorMsg(result.msg))
        }

    }
}
//更新用户信息的异步user
export const updateUser=(user)=> {
    console.log(user);
    return async dispatch => {
        //    发送ajax请求
        const response = await reqUpdateUser(user);
        const result = response.data;
        console.log(result);
        if (result.code === 0) {
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }

}
//获取异步信息的action
export const getUser=()=>{
    return async dispatch=>{
        const response=await reqUser();
        const result=response.data;
        if(result.code===0){
            getMsgList(result.data._id, dispatch)
            dispatch(receiveUser(result.data))
        }else {
            dispatch(resetUser(result.msg))
        }
    }
}

//获取用户列表的异步action
export const getUserList=(type)=>{
      return async dispatch=>{
          const response=await reqUserList(type);
          const result=response.data;
          if(result.code===0){
             dispatch(receiveUserList(result.data))
          }
      }
}

//发送消息的异步action
// 发送消息的异步action
export const sendMsg = ({from, to, content}) => {
    return dispatch => {
        // 向服务器发消息
        console.log('浏览器向服务器发送消息', from, to, content)
        socket.emit('sendMsg', {from, to, content})
    }
}
export const updateMsg=(from,to)=>{
    return async dispatch=>{
        const response=await reqReadChatMsg(from)
        const result=response.data
        if(result.code===0){
            const count=result.data
            console.log(count);
            dispatch(msgUpdate({count,from,to}))
        }else{

        }
    }
}

