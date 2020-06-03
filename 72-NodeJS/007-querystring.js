/*
 * @Author: niumengfei
 * @Date: 2020-06-02 14:43:14
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-06-02 14:54:22
 * @Description: file content
 * @FilePath: \MyTools\72-NodeJS\007-querystring.js
 */ 
let qs = require('querystring');

//query 字符串转化对象
let str = 'foo=bar&abc=xyz&abd=123';
console.log(qs.parse(str,'&','='))

//转化字符串
let obj = {
    foo: 'bar',
    abc: 'xyz',
    abd: '123'
}
console.log(qs.stringify(obj,'-','-'))

//w=%D6%D0%CE%C4&foo=bar


console.log(qs.escape('w=嘿哈&foo=bar'))

console.log(qs.unescape('w%3D%E5%98%BF%E5%93%88%26foo%3Dbar'))