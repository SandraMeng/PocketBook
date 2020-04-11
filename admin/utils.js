const csvParse = require('csv-parse');
const fs = require('fs');

// parse csv to JSON
let parse_csv = (readPath, writePath)=> {
	return new Promise((resolve, reject)=>{
		const parser = csvParse({delimiter: ';'}, (err, data)=>{
			if (err) throw err;
			// table head
			let titleArr = data[0][0].split(',');
			// table body
			data = data.slice(1).map(item=>{
				item = item[0].split(',');
				let ret = {};
				item.forEach((item,index)=>{
					ret[titleArr[index]] = item;
				});
				return ret;
			});
			fs.writeFile(writePath, JSON.stringify(data), '', ()=>{
				resolve({code:1});
			});
		});

		fs.createReadStream(readPath).pipe(parser);
	});	
};

// Promise封装的readFile
let read_file = path=> {
	return new Promise((resolve, reject)=>{
		fs.readFile(path, 'utf8', (err, data)=>{
			resolve(data);
		});
	});
};

/*
	random-str(id) generator
	@params: [Number] digit  随机数位数
	return:  [String]        随机数字符串
*/ 
let randomStr = digit => {
	let str = "1234567890abcdefghijklmnopqrstuvwxyz";
	let ret = '';
	for (let i = 0; i < digit; i++){
		ret += str[Math.floor(Math.random()*36)];
	}
	return ret;
};

module.exports = {
	parse_csv,
	read_file,
	randomStr
};