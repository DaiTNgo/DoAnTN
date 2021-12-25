import { sliceHour, sliceDay } from './sliceTime.js';

async function getData() {
	const time = '2021-11-11T10:29'; // lấy lần cuối cùng
	const currentHour = new Date(time).setMinutes(0, 0, 0);
	const nextHour = currentHour + 60 * 60 * 1000;
	const hourData = await axios({
		method: 'post',
		url: '/api/hour',
		data: {
			currentHour,
			nextHour,
		},
	});
	const arrHourAmp = hourData.data.sort((a, b) => a.amp - b.amp);
	const arrHourVolt = hourData.data.sort((a, b) => a.volt - b.volt);
	const arrPower = hourData.data.map((item) => {
		return { value: item.volt * item.amp, time: item.createdAt };
	});
	const arrHourPower = arrPower.sort((a, b) => a.value - b.value);

	const resultHourAmp = {
		min: [arrHourAmp[0].amp, arrHourAmp[0].createdAt],
		max: [
			arrHourAmp[arrHourAmp.length - 1].amp,
			arrHourAmp[arrHourAmp.length - 1].createdAt,
		],
	};

	const resultHourVolt = {
		min: [arrHourVolt[0].volt, arrHourVolt[0].createdAt],
		max: [
			arrHourVolt[arrHourVolt.length - 1].volt,
			arrHourVolt[arrHourVolt.length - 1].createdAt,
		],
	};
	const resultHourPower = {
		min: [arrHourPower[0].value, arrHourPower[0].time],
		max: [
			arrHourPower[arrHourPower.length - 1].value,
			arrHourPower[arrHourPower.length - 1].time,
		],
	};

	const currentDate = new Date(time).getTime();
	const nextDate = currentDate + 24 * 60 * 60 * 1000;
	const dayData = await axios({
		method: 'post',
		url: '/api/date',
		data: {
			currentDate,
			nextDate,
		},
	});
	const pureArr = dayData.data;
	const cloneArr = JSON.parse(JSON.stringify(pureArr));
	const arrDay = sliceHour(cloneArr, pureArr);
	const resultDayAmp = getValueMinMax(arrDay, 'amp');
	const resultDayVolt = getValueMinMax(arrDay, 'volt');
	const resultDayPower = getPowerMinMax(arrDay);

	//month
	const currentMonth = new Date(time).getMonth() + 1;
	const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
	let year = new Date(time).getFullYear();
	let year_nextMonth = currentMonth === 12 ? year + 1 : year;
	const monthData = await axios({
		method: 'post',
		url: '/api/month',
		data: {
			currentMonth: `${year}-${currentMonth}-1 0:`,
			nextMonth: `${year_nextMonth}-${nextMonth}-1 0:`,
		},
	});
	const pureArr1 = monthData.data;
	const cloneArr1 = JSON.parse(JSON.stringify(pureArr1));
	const arrMonth = sliceDay(cloneArr1, pureArr1);
	const resultMonthAmp = getValueMinMax(arrMonth, 'amp');
	const resultMonthVolt = getValueMinMax(arrMonth, 'volt');
	const resultMonthPower = getPowerMinMax(arrMonth);

	const htmlAmp = `
	        <tr>
	            <td class = 'hour'>Hour</td>
	            <td>${resultHourAmp.min[0]}A - ${
		formatTime(resultHourAmp.min[1]).hour
	}</td>
	            <td>${resultHourAmp.max[0]}A - ${
		formatTime(resultHourAmp.max[1]).hour
	}</td>
	        </tr>
	        <tr>
	            <td class = 'day'>Day</td>
	            <td>${resultDayAmp.min[0]}A - ${
		formatTime(resultDayAmp.min[1]).day
	}</td>
	            <td>${resultDayAmp.max[0]}A - ${
		formatTime(resultDayAmp.max[1]).day
	}</td>
	        </tr>
	        <tr>
	            <td class = 'month'>Month</td>
	            <td>${resultMonthAmp.min[0]}A - ${
		formatTime(resultMonthAmp.min[1]).month
	}</td>
	            <td>${resultMonthAmp.max[0]}A - ${
		formatTime(resultMonthAmp.max[1]).month
	}</td>
	        </tr>
	        
	`;
	document.getElementById('tbody-amp').innerHTML = htmlAmp;
	//Volt
	const htmlVolt = `
	        <tr>
	            <td class = 'hour'>Hour</td>
	            <td>${resultHourVolt.min[0]}A - ${
		formatTime(resultHourVolt.min[1]).hour
	}</td>
	            <td>${resultHourVolt.max[0]}A - ${
		formatTime(resultHourVolt.max[1]).hour
	}</td>
	        </tr>
	        <tr>
	            <td class = 'day'>Day</td>
	            <td>${resultDayVolt.min[0]}A - ${
		formatTime(resultDayVolt.min[1]).day
	}</td>
	            <td>${resultDayVolt.max[0]}A - ${
		formatTime(resultDayVolt.max[1]).day
	}</td>
	        </tr>
	        <tr>
	            <td class = 'month'>Month</td>
	            <td>${resultMonthVolt.min[0]}A - ${
		formatTime(resultMonthVolt.min[1]).month
	}</td>
	            <td>${resultMonthVolt.max[0]}A - ${
		formatTime(resultMonthVolt.max[1]).month
	}</td>
	        </tr>
	        
	`;
	document.getElementById('tbody-volt').innerHTML = htmlVolt;
}
getData();
function formatTime(value) {
	const minute = new Date(value).getMinutes();
	const hour = new Date(value).getHours();
	const day = new Date(value).getDate();
	const month = new Date(value).getMonth();

	return {
		hour: `${hour}:${minute}`,
		day: `${hour}h`,
		month: `${day}/${month}`,
	};
}

function getValueMinMax(arr, param) {
	const arrHourInDay = [];
	const arrTotal = arr.map((item) => {
		arrHourInDay.push(new Date(item[0].createdAt));
		return item.reduce((total, cur) => {
			return total + cur[param];
		}, 0);
	});
	const arrSortTotal = arrTotal.sort((a, b) => a - b);
	const min = arrSortTotal[0];
	const max = arrSortTotal[arrSortTotal.length - 1];
	const resultMin = arrTotal.findIndex((item) => min === item);
	const resultMax = arrTotal.findIndex((item) => max === item);
	return {
		min: [min, arrHourInDay[resultMin]],
		max: [max, arrHourInDay[resultMax]],
	};
}

function getPowerMinMax(arr) {
	const arrHourInDay = [];
	const arrTotal = arr.map((item) => {
		arrHourInDay.push(new Date(item[0].createdAt));
		return item.reduce((total, cur) => {
			return total + cur.volt * cur.amp;
		}, 0);
	});
	const arrSortTotal = arrTotal.sort((a, b) => a - b);
	const min = arrSortTotal[0];
	const max = arrSortTotal[arrSortTotal.length - 1];
	const resultMin = arrTotal.findIndex((item) => min === item);
	const resultMax = arrTotal.findIndex((item) => max === item);
	return {
		min: [min, arrHourInDay[resultMin]],
		max: [max, arrHourInDay[resultMax]],
	};
}
