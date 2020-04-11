/* 
	addZeroAtBack：尾部补零
	@params:[String] str    待处理字符串
			[Number] amount 需补零个数
	return  [String]        处理后的字符串
*/
let addZeroAtBack = (str, amount)=>{
	while (amount > 0){
		str += '0';
		amount--;
	}
	return str;
};

/* 
	addZero：不满2位首部补零
	@params:[Number] num           待处理数字
	return  [String/Number]        处理后的数字或字符串
*/
let addZero = (num)=>{
	return num < 10 ? '0'+num: num;
};

/*
	numberFormat：添加千分符，保留小数位
	@params:[Number/String] num      待处理数字
			[Number]        digit    保留位数
	return  [String]                 处理后的数字
*/
let numberFormat = (num, digit) =>{
	return String(num).replace(/^(\d{1,3})((?:\d{3})*)(\.\d+)?$/, (_, front, thou, dot)=>{
		thou = thou.replace(/\d{3}/g, cur=>`,${cur}`);
		if (!dot)
			dot = addZeroAtBack('.', digit);
		else if (dot.length-1 < digit)
			dot = addZeroAtBack(dot, digit-(dot.length-1));
		return `${front}${thou}${dot.replace(/\d+/, cur=>cur.slice(0,digit))}`;
	});
}

export {
	numberFormat,
	addZero
}