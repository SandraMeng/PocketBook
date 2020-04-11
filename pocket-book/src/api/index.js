import http from './http.js';

let getBill = _ =>{
	return http.get('/bill');
};

let addBill = (type, time, categoryName, amount)=>{
	return http.post('/bill', {
		type,
		time,
		categoryName,
		amount
	});
};

export {
	getBill,
	addBill
}