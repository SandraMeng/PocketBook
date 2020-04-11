const {parse_csv, read_file} = require('./utils.js');

// 读取bill.json和categories.json, 拼接两个文件的数据
let read = ()=>{
	let categMap = new Map();
	let bill = read_file('./json/bill.json');
	let categ = read_file('./json/categories.json');
	return Promise.all([bill, categ]).then(data=>{
		bill = JSON.parse(data[0]);
		categ = JSON.parse(data[1]);
		categ.forEach(item=>{
			categMap.set(item.id, item.name);
		});
		return bill.map(item=>{ 
			return {
				...item,
				categoryName: categMap.get(item.category)
			};
		});
	});	
};
let getBill = ()=>{
	let billParse = parse_csv('./csv/bill.csv', './json/bill.json');
	let categParse = parse_csv('./csv/categories.csv', './json/categories.json');
	return Promise.all([billParse, categParse]).then(async data=>{
		if (data.every(item=>item.code === 1)){
			return await read();
		}
	});	
}; 

module.exports = {
	getBill
};