import { getBill } from '@/api/index.js'

let changeBillData = ({commit})=>{
	getBill().then(data=>{
		if (data.code == 0)
			commit("changeBillData", data.data);
	});
};

export default {
	changeBillData
}