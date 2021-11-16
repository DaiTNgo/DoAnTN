import { sliceHour } from './sliceTime.js';
import { renderChart, renderDayArr } from './render.js';
document.getElementById('date').onblur = async (e) => {
	const date = await axios({
		method: 'post',
		url: 'http://localhost:3000/api/date',
		data: {
			date: e.target.value,
		},
	});
	// Tách giờ trong ngày
	const arrDate = [...date.data];
	const arrHour = sliceHour(arrDate, date.data);
	// Render ra arr moi de dua vao render bieu do
	const arr = renderDayArr(arrHour);
	const myChart = renderChart(arr);
	myChart.config.options.scales.x.time.unit = 'hour';
};

const list = document.querySelector('.list-nav');
const li_list = list.children;

for (let li of li_list) {
	for (let li of li_list) {
		li.classList.remove('active');
	}
}
document.querySelector('.item-day').classList.add('active');
