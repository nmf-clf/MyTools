/*
 * @Author: niumengfei
 * @Date: 2020-06-03 14:58:44
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-06-03 15:26:52
 * @Description: file content
 * @FilePath: \MyTools\72-NodeJS\013-cheerio.js
 */ 
const https = require('https');
const cheerio = require('cheerio');

// const $ = cheerio.load('<h2 class="title" >hello word</h2>')

// console.log($('h2').text())
// $('.title').text('hello girl')
// $('.title').addClass('title2')
// console.log($.html())


https.get('https://www.qunar.com/', (res) => {
    let allStr = '';
    res.on('data', (d) => {
        console.log('数据传输中...')
        let dString = d.toString('utf-8')
        allStr += dString
    });

    res.on('end', (d) => {
        //数据传输完毕
        console.log('数据传输完毕')
        const $ = cheerio.load(allStr)
        // console.log( $('img').attr('src') )
        $('img').each((index,item)=>{
            console.log($(item).attr('src'))
        })

    });

}).on('error', (e) => {
    console.error(e);
});