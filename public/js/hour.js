import { renderChart, renderHourArr } from './render.js';
import toggleValue from './toggleValue.js';

const btn_volt = document.getElementById('btn-volt');
const btn_amp = document.getElementById('btn-amp');
const btn_power = document.getElementById('btn-power');
document.getElementById('hour').onblur = async (e) => {
	const time = e.target.value;
	getCurrentHour(time);
};
async function getCurrentHour(time) {
	const hour = await axios({
		method: 'post',
		url: '/api/hour',
		data: {
			date: time,
		},
	});
	const arr = renderHourArr(hour.data);
	const myChart = renderChart(arr);
	myChart.config.options.scales.x.time.unit = 'minute';
	myChart.config.options.scales.x.time.parser = 'HH:mm';
	myChart.config.options.scales.x.time.displayFormats.minute = 'HH:mm';
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
getCurrentHour(new Date().setMinutes(0, 0, 0));
const list = document.querySelector('.list-nav');
const li_list = list.children;

for (let li of li_list) {
	for (let li of li_list) {
		li.classList.remove('active');
	}
}
document.querySelector('.item-hour').classList.add('active');
