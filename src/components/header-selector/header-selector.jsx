import React,{Component} from 'react';
import {List,Grid} from 'antd-mobile';
import PropTypes from 'prop-types';
export default class HeaderSeletor extends Component{
    state={
        icon:null
    }
    static propTypes={
        setHeader:PropTypes.func.isRequired
    };
    selectHeader=({text,icon})=>{
      this.setState({
        icon
       })
        this.props.setHeader(text)
    };

    render(){
        const {icon}=this.state;
        // console.log(icon);
        const header=!icon?'请选择头像:':<p>已选择的头像:<img src={icon} alt=""/></p>;
        const headers=[]
      for(var i=0;i<20;i++){
          const text ='头像'+(i+1)
          const icon=require(`../../assets/img/${text}.png`);
          headers.push({text,icon})
      }

        return (
            <List renderHeader={() => header}>
                <Grid data={headers}
                      columnNum={5}
                      onClick={this.selectHeader}
                />
            </List>
        )
    }
}
