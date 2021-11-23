import { sliceDay } from './sliceTime.js';
import { renderChart, renderMonthArr } from './render.js';
import toggleValue from './toggleValue.js';

const btn_volt = document.getElementById('btn-volt');
const btn_amp = document.getElementById('btn-amp');
const btn_power = document.getElementById('btn-power');
document.getElementById('month').onblur = async (e) => {
	const date = e.target.value;
	getCurrentMonth(date);
};
async function getCurrentMonth(time) {
	const date = time;
	const currentMonth = new Date(date).getMonth() + 1;
	const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
	let year = new Date(date).getFullYear();
	year = currentMonth === 12 ? year + 1 : year;
	const month = await axios({
		method: 'post',
		url: '/api/month',
		data: {
			currentMonth: `${year}-${currentMonth}-1 0:`,
			nextMonth: `${year}-${nextMonth}-1 0:`,
		},
	});
	const arrDay = sliceDay([...month.data], month.data);
	const arr = renderMonthArr(arrDay);
	const myChart = renderChart(arr);
	myChart.config.options.scales.x.time.unit = 'day';
	myChart.config.options.plugins.tooltip.callbacks = {
		title: function (params) {
			const arr = params[0].label.split(', ');
			return `${arr[0]} , ${arr[1]}`;
		},
	};
	myChart.update();
	btn_volt.onclick = () => {
		toggleValue(0, myChart);
	};
	btn_amp.onclick = () => {
		toggleValue(1, myChart);
	};
	btn_power.onclick = () => {
		toggleValue(2, myChart);
	};
}
getCurrentMonth(Date.now());
const list = document.querySelector('.list-nav');
const li_list = list.children;

for (let li of li_list) {
	for (let li of li_list) {
		li.classList.remove('active');
	}
}
document.querySelector('.item-month').classList.add('active');
