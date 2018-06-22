/*
* 用户注册的路由组件
* */
import React,{Component} from 'react';
//引入组件
import {NavBar,WingBlank,WhiteSpace,InputItem,List,Button} from 'antd-mobile';
//引入一个logo组件
import Logo from '../../components/logo/logo';
const ListItem=List.Item;
export default class Register extends Component{
    state={
        username:"",
        password:"",
    };
    changeHander=(name,value)=>{
        this.setState({
            [name]:value
        })

    };
   login=()=>{
        console.log(this.state)
    };
    goRegsiter=()=>{
        this.props.history.replace('/register')
    };
    render(){
        return (
            <div>
                <NavBar>硅谷直聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <WhiteSpace/>
                        <InputItem placeholder='用户名' onChange={val=>{this.changeHander('username',val)}}>用户名：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入密码' type='password' onChange={val=>{this.changeHander('password',val)}}>密码：</InputItem>
                        <WhiteSpace/>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.goRegsiter}>还没有账户</Button>
                </WingBlank>
            </div>
        )
    }
}