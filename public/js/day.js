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
async function getCurrentDate() {
	const currentDate = new Date().setHours(0, 0, 0, 0);
	const date = await axios({
		method: 'post',
		url: 'http://localhost:3000/api/date',
		data: {
			date: currentDate,
		},
	});
	const arrDate = [...date.data];
	const arrHour = sliceHour(arrDate, date.data);
	const arr = renderDayArr(arrHour);
	const myChart = renderChart(arr);
	const btn_volt = document.getElementById('btn-volt');
	const btn_amp = document.getElementById('btn-amp');
	const btn_power = document.getElementById('btn-power');
	myChart.config.options.scales.x.time.unit = 'hour';
	btn_volt.onclick = () => {
		toggleData(0, myChart);
	};
	btn_amp.onclick = () => {
		toggleData(1, myChart);
	};
	btn_power.onclick = () => {
		toggleData(2, myChart);
	};
	btn_volt.style.backgroundColor =
		myChart.config.data.datasets[0].backgroundColor[0];
}
getCurrentDate();
function toggleData(value, myChart) {
	const visibilityData = myChart.isDatasetVisible(value);
	if (visibilityData === true) {
		myChart.hide(value);
		document.getElementById('btn-volt').style.textDecoration = 'line-through';
		switch (value) {
			case 0:
				myChart.config.options.scales.volt.display = false;

				break;
			case 1:
				myChart.config.options.scales.amp.display = false;

				break;
			case 2:
				myChart.config.options.scales.power.display = false;
				break;
			default:
				break;
		}
		myChart.update();
	} else {
		myChart.show(value);
		document.getElementById('btn-volt').style.textDecoration = 'none';
		switch (value) {
			case 0:
				myChart.config.options.scales.volt.display = true;
				break;
			case 1:
				myChart.config.options.scales.amp.display = true;
				break;
			case 2:
				myChart.config.options.scales.power.display = true;
				break;
			default:
				break;
		}
		myChart.update();
	}
}
const list = document.querySelector('.list-nav');
const li_list = list.children;

for (let li of li_list) {
	for (let li of li_list) {
		li.classList.remove('active');
	}
}
document.querySelector('.item-day').classList.add('active');
