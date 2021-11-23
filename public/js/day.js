import { sliceHour } from './sliceTime.js';
import { renderChart, renderDayArr } from './render.js';
import toggleValue from './toggleValue.js';
const btn_volt = document.getElementById('btn-volt');
const btn_amp = document.getElementById('btn-amp');
const btn_power = document.getElementById('btn-power');
document.getElementById('date').onblur = async (e) => {
	const time = e.target.value;
	getCurrentDate(time);
};
async function getCurrentDate(time) {
	const date = await axios({
		method: 'post',
		url: '/api/date',
		data: {
			date: time,
		},
	});
	const arrDate = [...date.data];
	const arrHour = sliceHour(arrDate, date.data);
	const arr = renderDayArr(arrHour);
	const myChart = renderChart(arr);
	myChart.config.options.scales.x.time.unit = 'hour';
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
getCurrentDate(new Date().setHours(0, 0, 0, 0));

const list = document.querySelector('.list-nav');
const li_list = list.children;

for (let li of li_list) {
	for (let li of li_list) {
		li.classList.remove('active');
	}
}
document.querySelector('.item-day').classList.add('active');
