import { sliceDay } from './sliceTime.js';
import { renderChart, renderMonthArr } from './render.js';

document.getElementById('month').onblur = async (e) => {
	const date = e.target.value;
	const currentMonth = new Date(date).getMonth() + 1;
	const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
	let year = new Date(date).getFullYear();
	year = currentMonth === 12 ? year + 1 : year;
	const month = await axios({
		method: 'post',
		url: 'http://localhost:3000/api/month',
		data: {
			currentMonth: `${year}-${currentMonth}-1 0:`,
			nextMonth: `${year}-${nextMonth}-1 0:`,
		},
	});
	const arrDay = sliceDay([...month.data], month.data);
	const arr = renderMonthArr(arrDay);
	const myChart = renderChart(arr);
	myChart.config.options.scales.x.time.unit = 'day';
};
async function getCurrentMonth() {
	const date = Date.now();
	const currentMonth = new Date(date).getMonth() + 1;
	const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
	let year = new Date(date).getFullYear();
	year = currentMonth === 12 ? year + 1 : year;
	const month = await axios({
		method: 'post',
		url: 'http://localhost:3000/api/month',
		data: {
			currentMonth: `${year}-${currentMonth}-1 0:`,
			nextMonth: `${year}-${nextMonth}-1 0:`,
		},
	});
	const arrDay = sliceDay([...month.data], month.data);
	const arr = renderMonthArr(arrDay);
	const myChart = renderChart(arr);
	myChart.config.options.scales.x.time.unit = 'day';
}
getCurrentMonth();
const list = document.querySelector('.list-nav');
const li_list = list.children;

for (let li of li_list) {
	for (let li of li_list) {
		li.classList.remove('active');
	}
}
document.querySelector('.item-month').classList.add('active');
