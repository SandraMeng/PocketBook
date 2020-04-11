const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const app = express();
const {getBill} = require('./getBill.js');
const {randomStr} = require('./utils.js');

const PORT = 3000;

// 处理请求体中的json格式数据
app.use(bodyParser.json());

// handle data
app.use(async (req, res, next) => {
	req.billData = await getBill();
	next();
});

// api
app.get('/bill', (req, res)=>{
	if (req.billData)
		res.send({code: 0, data: req.billData});
	else 
		res.send({code: 1});
});

app.post('/bill', (req, res)=>{
	let {type, time, categoryName, amount} = req.body;
	let category = categoryName;
	let targetCategory = req.billData.find(item=>item.categoryName === categoryName);
	if (targetCategory){
		category = targetCategory.category;
	} else {
		category = randomStr(10);
		fs.appendFile('./csv/categories.csv', `\n${category},${type},${categoryName}`, ()=>{});
	}

	fs.appendFile('./csv/bill.csv', `\n${type},${time},${category},${amount}`, ()=>{
		res.send({code: 0});
	});
});

// listen
app.listen(PORT, () => {
	console.log(`当前服务起于 ${PORT} 端口`);
});

