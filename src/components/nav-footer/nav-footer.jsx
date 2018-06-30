import React,{Component} from 'react';
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
const Item=TabBar.Item;

 class NavFooter extends Component{
    static propTypes={
       navList:PropTypes.array.isRequired,
        unReadCount:PropTypes.number.isRequired

    };
  render(){
    const navList=this.props.navList.filter(nav=>!nav.hide);
      //得到请求的路径
      const path=this.props.location.pathname;
      const{unReadCount}=this.props;
      console.log(unReadCount)
      return (
          <TabBar>
              {navList.map((nav,index)=>(
                  <Item key={index}
                        badge={nav.path==='/message' ? unReadCount : 0}
                        title={nav.text}
                        icon={{uri:require(`./imgs/${nav.icon}.png`)}}
                        selectedIcon={{uri:require(`./imgs/${nav.icon}-selected.png`)}}
                        selected={nav.path===path}
                        onPress={()=>this.props.history.replace(nav.path)}
                  />
              ))}

          </TabBar>
      )
  }

}
export default withRouter(NavFooter)

