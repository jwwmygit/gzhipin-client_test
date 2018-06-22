/*
* 用户注册的路由组件
* */
import React,{Component} from 'react';
//引入组件
import {NavBar,WingBlank,WhiteSpace,InputItem,List,Radio,Button} from 'antd-mobile';
//引入一个logo组件
import Logo from '../../components/logo/logo';
const ListItem=List.Item;
export default class Register extends Component{
    state={
        username:"",
        password:"",
        password2:"",
        type:"laoban"
    };
    changeHander=(name,value)=>{
        this.setState({
            [name]:value
        })

    }
    regsiter=()=>{
       console.log(this.state)
    };
    goLogin=()=>{
        console.log(this.props)
     this.props.history.replace('/login')
    }
    render(){
        const {type}=this.state;
        return (
            <div>
                <NavBar>硅谷直聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入用户名' onChange={val=>{this.changeHander('username',val)}}>用户名：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入密码' type='password' onChange={val=>{this.changeHander('password',val)}}>密码：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入确认密码' type='password' onChange={val=>{this.changeHander('password2',val)}}>确认密码：</InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>用户类型：</span>
                            <Radio onChange={()=>{this.changeHander('type','dashen')}} checked={type==='dashen'}>大神</Radio>&nbsp;&nbsp;&nbsp;
                            <Radio onChange={()=>{this.changeHander('type','laoban')}} checked={type==='laoban'}>老板</Radio>&nbsp;&nbsp;&nbsp;
                        </ListItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.regsiter}>注&nbsp;&nbsp;册</Button>
                    <WhiteSpace/>
                    <Button onClick={this.goLogin}>已有账户登录</Button>
                </WingBlank>
            </div>
        )
    }
}