import ajax from './ajax';
//请求注册
export const reqRegister=(user)=>ajax('/register',user,'POST');
//请求登录
export const reqLogin=(user)=>ajax('/register',user,'POST');
