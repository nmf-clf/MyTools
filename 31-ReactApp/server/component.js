const http = require('http');

const server = http.createServer((req,res)=>{
	res.setHeader("Access-Control-Allow-Origin","*");
	//let data = ['demo_item1','demo_item2'];
	let data = {
		value: 'demo_value',
		list: ['demo_item1','demo_item2']
	};
	res.end(JSON.stringify(data))
});


server.listen(3005,'127.0.0.1',()=>{
	console.log('server is runing at 127.0.0.1:3005')
})