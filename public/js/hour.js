import { renderChart, renderHourArr } from './render.js';

document.getElementById('hour').onblur = async (e) => {
	const hour = await axios({
		method: 'post',
		url: 'http://localhost:3000/api/hour',
		data: {
			date: e.target.value,
		},
	});
	const arr = renderHourArr(hour.data);
	const myChart = renderChart(arr);
	myChart.config.options.scales.x.time.unit = 'minute';
	myChart.config.options.scales.x.time.parser = 'HH:mm';
	myChart.config.options.scales.x.time.displayFormats.minute = 'HH:mm';
	console.log(myChart.config.options.scales.x.time);
};
async function getCurretnHour() {
	const currentHour = new Date().setMinutes(0, 0, 0);
	const hour = await axios({
		method: 'post',
		url: 'http://localhost:3000/api/hour',
		data: {
			date: currentHour,
		},
	});
	const arr = renderHourArr(hour.data);
	const myChart = renderChart(arr);
	myChart.config.options.scales.x.time.unit = 'minute';
	myChart.config.options.scales.x.time.parser = 'HH:mm';
	myChart.config.options.scales.x.time.displayFormats.minute = 'HH:mm';
}
getCurretnHour();
const list = document.querySelector('.list-nav');
const li_list = list.children;

for (let li of li_list) {
	for (let li of li_list) {
		li.classList.remove('active');
	}
}
document.querySelector('.item-hour').classList.add('active');
