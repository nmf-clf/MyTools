/*
 * @Author: niumengfei
 * @Date: 2020-06-02 14:23:09
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-06-02 14:29:15
 * @Description: file content
 * @FilePath: \MyTools\72-NodeJS\006-url.js
 */ 
let url = require('url');
// console.log(url.parse('http://baijiahao.baidu.com/s?id=1641906235824053291&wfr=spider&for=pc'))

let obj = {
    protocol: 'http:',
    slashes: true,
    auth: null,
    host: 'baijiahao.baidu.com',
    port: null,
    hostname: 'baijiahao.baidu.com',
    hash: null,
    search: '?id=1641906235824053291&wfr=spider&for=pc',
    query: 'id=1641906235824053291&wfr=spider&for=pc',
    pathname: '/s',
    path: '/s?id=1641906235824053291&wfr=spider&for=pc',
    href:
     'http://baijiahao.baidu.com/s?id=1641906235824053291&wfr=spider&for=pc' 
}
console.log(url.format(obj))