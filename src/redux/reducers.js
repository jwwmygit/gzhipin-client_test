//包含多个用于生成新的state的reducer函数的模块
import {combineReducers} from 'redux';
import {AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG,
    RECEIVE_CHAT,
    MSG_UPDATE
}from './action-types'
import getRedirectTo from '../utils'
const initUser={
    username:"",
    type:"",
    msg:"",
    redirectTo:""//需要重定向的path
};
function user(state=initUser,action) {
    switch (action.type){
        case AUTH_SUCCESS:
           const user=action.data;
           console.log(user)
            return {...user, redirectTo: getRedirectTo(user.type,user.header)};
        case ERROR_MSG:
            return {...state,msg:action.data};
        case RECEIVE_USER:
            // console.log(action.data);
            return action.data;
        case RESET_USER:
            console.log('resetuser')
            return {...initUser,msg:action.data};

        default:
            return state
    }
}

const initUserList=[]
function userList(state = initUserList, action) {

    switch (action.type) {
        case RECEIVE_USER_LIST:
            // console.log(action.data)
            return action.data
        default:
            return state
    }
}
const initChat = {
    chatMsgs: [],  // 消息数组 [{from: id1, to: id2}{}]
    users: {},  // 所有用户的集合对象{id1: user1, id2: user2}
    unReadCount:0,//总的未读数量
};
function chat(state=initChat, action) {
    switch (action.type) {
        case RECEIVE_MSG:
            // const {chatMsgs} = action.data
            return {
                chatMsgs: [...state.chatMsgs, action.data.chatMsg],
                users: state.users,
                unReadCount:state.unReadCount+(action.data.chatMsg.to===action.data.meId ? 1 : 0)
            }
        case RECEIVE_CHAT:
            return {
                users:action.data.users,
                chatMsgs:action.data.chatMsgs,
                unReadCount:action.data.chatMsgs.reduce((preTotal,msg)=>{
                  return preTotal+(!msg.read && msg.to===action.data.meId ? 1 : 0)
                },0)
            }
        case MSG_UPDATE:
            const {from, to, count} = action.data
            return{
                users:state.users,
                chatMsgs:state.chatMsgs.map(msg=>{
                    if(msg.from===from&&msg.to===to&&!msg.read){
                        return {...msg,read:true}
                    }else {
                        return msg
                    }
                }),
                unReadCount:state.unReadCount-count
            };
        default:
            return state
    }
}

export default combineReducers({
    user,
    userList,
    chat
})
