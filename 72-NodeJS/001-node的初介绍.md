# node

## what
  + 基于chrome v8 runtime
  + 事件驱动
  + 非阻塞的I/O

  I/0：input/output 输入输出流 正常下I/O的操作都是阻塞的(有点类似于ajax同步)  
  主要的场景: 网络请求 数据库处理 文件的读写。。。。  
  优点： 高并发特别好  
  浏览器出于安全考虑并不能使得js可以操作系统文件

## why
  1. 防止甩锅，明确数据交互的错误问题在谁
  2. 能够书写api  
  3. 了解前后端交互流程

## api 接口

### js运行环境
  + 浏览器
    - 基本语法
    - BOM
    - DOM
    - ajax
    - 系统文件/数据库(不能而不是不会，不是语言不能，而是出于安全性考虑不可以)
  + 服务器
    - 基本语法
    - 能操作数据库
    - 能操作本地文件

  限制语言能力的不是语言本身，而是语言的运行环境(平台)

### nvm 
  详见文档,用于切换node环境

### node运行环境 REPL

  直接在命令行写代码(node直接回车即可)

### 模块化
  前端→组件化
  + 内置模块(node中提供的可以直接调用的模块)
  + 第三方模块
  + 自定义模块
    - 创建一个模块 (一个js文件一个模块)
    - 导出一个模块 (module.exports=name)
    - 引用一个模块并且调用 (let Module=require(./module))

### 打印当前目录树
1.实现的效果  
2.分析功能点
  + 当前目录结构  
  + 分辨是文件还是文件夹

### 内置模块fs

### 内置模块url
  url 统一资源定位符

  url.parse() 字符串转对象
  url.format() 对象转字符串
  json是一种数据格式,json对象是保证json格式的对象,json字符串是json格式的字符串

### 内置模块querystring
   query字符串和对象相互转化,及编码相互转化

### 邮箱验证
   + nodemailer 可以实现发邮件

### 简易爬虫案例
   + npm i cheerios --save 

### 网络基本知识
  + web服务器
  + api服务器
  
### express框架
  + npm i express --save    
  模块(第三方模块)的引用,会从当前的node_moudles向上查找

  + 如果在express框架中想要解析post请求的参数，需要用到body-parser第三方模块
    npm i body-parser --save

### 服务器相关
  + 1.服务器就是一台电脑 2.服务器软件(apach tomcat iis nginx node) 3.服务器ip 端口号(默认80)
  + 局域网 
  + 外网 
    ip: 确定服务器的位置
    端口: 确定服务器里某个程序

# api接口的书写
  + 接收数据
  - get req.query
  - get req.body 需要body-parser第三方中间件解析
    + 注意数据格式 json x-www-form-urencode formdata

### 中间件 middlewear
  + 内置中间件 static
  + 自定义中间件 （全局 局部）
  + 第三方中间件 (body-parser) (拦截器)

### 静态资源目录 static
  指定一个目录 该目录可以被访问  等同于apache (www)

### promise
  如果有大量的异步操作，需要顺序执行，通过回调方式执行，就会陷入回调地狱。

  通过promise解决回调地狱问题 

  1、封装promise函数
  ```
    function 函数名(){
      return new Promise((resolve,reject)=>{
        //需要的异步处理
        成功的时候 resolve
        失败的时候 reject
      })
    }
  ```
  2、根据顺序 形成链式调用 
    函数名().then().then().catch()
  3、 捕获错误  

### api doc插件
  npm install 
  apidoc -i ./ -o ./hehe

### curd
  1. 增加 
  2. 查询分类
  3. 关键字查询 find.( {name:{ $regex:new RegExp(kw) }} ) 
  4. 分页查询
  5. 删除 foodModel.remove({id:'xxx'})  foodModel.remove({id:['xxx1','xxx2','xxx3]})
  6. 修改
  7. 上传图片
  foodModel.find().limit(pageSize).skip( (pageIndex-1)*pageSize )

### 跨域
  同源策略 （协议 ip  端口号) 35 一半



