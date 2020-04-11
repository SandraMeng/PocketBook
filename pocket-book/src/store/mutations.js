export default {
	changeBillData(state, payload){
		payload.sort((prev, next)=>next.time-prev.time);
		state.billData = payload;
		state.showBill = payload;
	},
	changeShowBillByDateAndCategory(state, payload){
		let {date, category} = payload;

		if (date) {
			state.showBill = state.billData.filter(item=>{
		        let time = new Date(Number(item.time));
		        return time.getFullYear() === date.getFullYear() &&
		               time.getMonth() === date.getMonth();
	      	});
		} else {
			state.showBill = state.billData;
		}

		if (category !== "全部"){
			 state.showBill = state.showBill.filter(item=>item.categoryName === category);
		}
	}
}