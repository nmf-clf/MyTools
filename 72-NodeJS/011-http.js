/*
 * @Author: niumengfei
 * @Date: 2020-06-03 14:00:23
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-06-03 14:18:52
 * @Description: file content
 * @FilePath: \MyTools\72-NodeJS\011-http.js
 */ 
const https = require('https');
const fs = require('fs');

https.get('https://www.baidu.com/', (res) => {
    console.log('res::',res)
    // console.log('状态码:', res.statusCode);
    // console.log('请求头:', res.headers);
    let allStr = '';
    res.on('data', (d) => {
        // process.stdout.write(d);
        console.log('数据传输中...')
        let dString = d.toString('utf-8')
        allStr += dString
        // console.log(dString) //将每个数据片段转化为utf-8格式
    });

    res.on('end', (d) => {
        //数据传输完毕
        console.log('数据传输完毕')
        //新增文件 也叫作覆盖写入
        fs.writeFile('./012-httpData.js',allStr,(err)=>{
            if(err){
                console.log('新增文件失败',err)
            }else{
                console.log('新增文件成功')
            }
        })

        
    });

}).on('error', (e) => {
    console.error(e);
});