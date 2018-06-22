//包含多个用于生成新的state的reducer函数的模块
import {combineReducers} from 'redux';
import {AUTH_SUCCESS,ERROR_MSG}from './action-types'
const initUser={
    username:'',
    type:'',
    msg:"",
    redirectTo:""//需要重定向的path

};
function user(state=initUser,action) {
    switch (action.type){
        case AUTH_SUCCESS:
            console.log(14);
            console.log(...state);
            return {...state};
        case ERROR_MSG:
            return {...state,msg:action.data};
    }

}
function yyy(state=0,action) {
    return state;
}
export default combineReducers({
    xxx,
    yyy
})