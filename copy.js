/*
 * @Author: niumengfei
 * @Date: 2020-05-13 09:53:51
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-05-14 16:50:45
 * @Description: file content
 * @FilePath: \MyTools\copy.js
 */
const config = {
    "editor.suggestSelection": "first", //1
    "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue", //2
    "window.zoomLevel": 0, //3
    "sync.gist": "716b3aa5abccf0ca67f56b90fad39382", //4.同步插件
    "workbench.colorTheme": "Monokai", //5.主题
    "files.associations": { //6.自动补全
        "*.jsp": "html"
    },
    // "terminal.integrated.rendererType": "dom",
    // "editor.formatOnSave": true, //每次保存自动格式化
    // "eslint.lintTask.enable": true, 
    // "vetur.validation.template": false,
    // "typescript.updateImportsOnFileMove.enabled": "always",
    // "javascript.updateImportsOnFileMove.enabled": "always",
    "fileheader.customMade": { // 头部注释
        // 头部注释默认字段
        "Author": "niumengfei",
        "Date": "Do not edit", // 设置后默认设置文件生成时间
        "LastEditors": "niumengfei", //设置后，保存文件更改默认更新最后编辑人
        "LastEditTime": "Do not edit", // 设置后，保存文件更改默认更新最后编辑时间
        "Description": "file content",
        "FilePath": "Do not edit" // 增加此项配置即可
    },
    "fileheader.cursorMode": { // 函数注释
        //默认字段
        "description": "",
        "param": "params",
        "return": ""
    },
    "fileheader.configObj": { //插件配置项
        "autoAdd": true, // 检测文件没有头部注释，自动添加文件头部注释
        "autoAlready": true, // 默认开启
        "prohibitAutoAdd": [
            "json",
            "md"
        ], // 禁止.json .md文件，自动添加头部注释
        "wideSame": false, // 设置为true开启
        "wideNum": 13 // 字段长度 默认为13
        
    }
}