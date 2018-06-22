/*
* 入口js
* */

import React from 'react'
import ReactDOM from 'react-dom'
//引入容器组件
import {Provider} from 'react-redux';
import {HashRouter,Switch,Route} from 'react-router-dom'
//引入store对象
import store from './redux/store'
import Login from './containers/login/login'
import Main from './containers/main/main'
import Register from './containers/register/register'
//
ReactDOM.render(
    //路由映射
    (<Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register} />
                <Route  component={Main}/>
            </Switch>
        </HashRouter>
    </Provider>),document.getElementById('root')
);
