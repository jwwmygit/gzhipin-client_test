/*
* 用户注册的路由组件
* */
import React,{Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import DashenInfo  from '../dashen-info/dashen-info'
import LaoBanInfo from '../laoban-info/laoban-info'
import Laoban from '../laoban/laoban'
import Dashen from '../dashen/dashen';
import Message from '../message/message';
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import Cookies from 'js-cookie';
import {getUser} from "../../redux/actions";
import getRedirectPath from '../../utils'
import {NavBar}from 'antd-mobile';
import NavFooter from '../../components/nav-footer/nav-footer';
import Chat from '../chat/chat'

 class Main extends Component{
     // 组件类和组件对象
     // 给组件对象添加属性
     navList = [
         {
             path: '/laoban', // 路由路径
             component: Laoban,
             title: '大神列表',
             icon: 'dashen',
             text: '大神',
         },
         {
             path: '/dashen', // 路由路径
             component: Dashen,
             title: '老板列表',
             icon: 'laoban',
             text: '老板',
         },
         {
             path: '/message', // 路由路径
             component: Message,
             title: '消息列表',
             icon: 'message',
             text: '消息',
         },
         {
             path: '/personal', // 路由路径
             component: Personal,
             title: '用户中心',
             icon: 'personal',
             text: '个人',
         }
     ]
     componentDidMount(){

         const userid=Cookies.get('userid');
         const {user}=this.props;
         if(userid&&!user._id){
             this.props.getUser()//发送请求，实现自动登录
         }
     }
     render(){
       //检查用户以前是否登录过
         const userid=Cookies.get('userid');
         if(!userid){
          return <Redirect to='/login'/>
         }
         console.log(this.props.unReadCount)

        // 判断用户当前是否登录
         const {user}=this.props;
           if(!user._id){
               return null;
           }
        // 说明已经登录
         const path = this.props.location.pathname  // 当前请求的path
         if(path==='/'){
           return<Redirect to={getRedirectPath(user.type,user.header)}/>
         }
        //得到当前导航
         const navList=this.navList;
         const currentNav=navList.find(nav=>nav.path===path);
         //确定那个nav需要隐藏

         if(user.type==='laoban'){
            navList[1].hide=true;
         }else {
             navList[0].hide=true;
         }

        return (

         <div>
             {currentNav?<NavBar className='mainNavList'>{currentNav.title}</NavBar>:null}
             <Switch>
                 <Route path='/laobaninfo' component={LaoBanInfo}/>
                 <Route path='/dasheninfo' component={DashenInfo}/>
                 <Route path='/dashen' component={Dashen}/>
                 <Route path='/laoban' component={Laoban}/>
                 <Route path='/message' component={Message}/>
                 <Route path='/personal' component={Personal}/>
                 <Route path='/chat/:userid' component={Chat}/>
                 <Route component={NotFound}/>
             </Switch>
             {currentNav?<NavFooter  navList={navList} unReadCount={this.props.unReadCount}/>:null}
         </div>
        )
    }
}
export default connect(
state=>({user:state.user,unReadCount:state.chat.unReadCount}),
{getUser}
)(Main)