/*
* 使用axious封装的ajax请求代码
*函数返回的是promise对象
* */
import axios from 'axios'
export default function ajax(url='',data='',type='GET') {
    if(type==='GET'){
    //    准备url query 请求参数
        let dataStr=''//数据拼接字符串
        Object.keys(data).forEach(key=>{
        dataStr+=key+'='+data[key]+"&"
        });
        if(dataStr!==""){
            dataStr=dataStr.substring(0,dataStr.length-1)
            url=url+'?'+dataStr;
        }
    //    发送get请求
        return axios.get(url);
    }else {
      return axios.post(url,data)//data包含请求体数据的对象
    }
}