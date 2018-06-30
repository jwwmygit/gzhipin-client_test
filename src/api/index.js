import ajax from './ajax';
const BASE_URL="";
//请求注册
export const reqRegister=(user)=>ajax(BASE_URL+'/register',user,'POST');
//请求登录
export const reqLogin=(username,password)=>ajax(BASE_URL+'/login',{username,password},'POST');
//更新用户请求
export const reqUpdateUser=(user)=>ajax(BASE_URL+'/update',user,'POST');
//获取用户信息
export const reqUser=()=>ajax(BASE_URL+'/user');
//获取用户列表
export const reqUserList = (type) => ajax('/userlist', {type});

//请求获取当前用户的所有聊天记录
export const reqChatMsgList=()=>ajax('/msgList');
//标识查看了指定用户发送的聊天信息
export const reqReadChatMsg=(from)=>ajax('/readmsg',{from},'POST')

