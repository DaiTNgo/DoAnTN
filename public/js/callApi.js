// Test lấy data
document.getElementById('getData').onclick = async () => {
	const arr = await axios.get('http://localhost:3000/api/time');
	arr.data.forEach((element) => {
		if (
			Date.parse(element.createdAt) > Date.parse('2021-11-07 17:') &&
			Date.parse(element.createdAt) < Date.parse('2021-11-07 18:')
		)
			console.log(element);
	});

	// axios
	// 	.all([
	// 		axios.get('https://api.github.com/users/anonystick'),
	// 		axios.get('https://api.github.com/users/anonystick'),
	// 	])
	// 	.then(
	// 		axios.spread((obj1, obj2) => {
	// 			// Both requests are now complete
	// 			console.log(
	// 				obj1.data.login +
	// 					' has ' +
	// 					obj1.data.public_repos +
	// 					' public repos on GitHub'
	// 			);
	// 			console.log(
	// 				obj2.data.login +
	// 					' has ' +
	// 					obj2.data.public_repos +
	// 					' public repos on GitHub'
	// 			);
	// 		})
	// 	);
};

document.getElementById('date').onblur = async (e) => {
	const value = await axios({
		method: 'post',
		url: 'http://localhost:3000/api/date',
		data: {
			date: e.target.value,
		},
	});

	// Tách giờ trong ngày
	const arrDate = [...value.data];
	const arrHour = sliceHour(arrDate, value.data);
	console.log(arrHour);
};

document.getElementById('hour').onblur = async (e) => {
	const data = await axios({
		method: 'post',
		url: 'http://localhost:3000/api/hour',
		data: {
			date: e.target.value,
		},
	});
	console.log(data.data);
};

function sliceHour(cloneArr, pureArr) {
	/**
	 *  Mình chia nhỏ thời gian trong ngày
	 *  1. hour and minute of first array element
	 *  2. so sánh với, giờ bắt đầu + 1, để lấy hết tất cả element trong khoảng đó
	 *  3. check xem thử nó đã lọc qua lần nào chưa,lọc bé hơn là isCheckLess, lớn hơn là isCheckGreater
	 *  4. nếu bé hơn và isCheckGreater = true thì thoát khỏi vòng lặp, ngược lại thì tăng i++
	 *  5. nếu lớn hơn thì i--
	 *  6. để thoát vòng lặp thì cần isCheckGreater và isCheckLess
	 *
	 *  ------------------------
	 *  ý tưởng:
	 *  1. nếu giờ mà bé hơn thì "tăng thêm", nếu mà nó "lớn hơn" thì mình trừ đi 1 đơn vị mình sẽ lấy từ preIndex -> index
	 *     trừ đi 1 đơn vị để về đúng cái khoảng cần tìm
	 *  2. nếu mà lớn hơn thì mình giảm đi, nếu mà nó bé rồi thì mình chỉ cần lấy từ preIndex -> index
	 *     không cần trừ vì nó đã về đúng khoảng rồi
	 *  3. nếu mà isCheckGreater = false thì i++, nếu = true thì thoát không cần i++ vì đã về đúng khoảng
	 *  4. else i-- mình không cần xét dk cho nó vì nó luôn giảm để về đúng khoảng
	 *  ----------------------------
	 *  TOTAL_MINUTES = 60 vì một phút call 1 lần, 1h call 60 lần
	 *  i < length || cloneArr.length !== 0; vì để kiểm tra xem thử nếu mà i+=60 mà vượt quá length
	 *  nhưng cloneArr chưa rỗng thì mình phải lặp tiếp để lấy tất cả những phần còn lại
	 *
	 */
	const arrHour = [];
	const length = pureArr.length;
	const start = new Date(pureArr[0].createdAt);
	const MINUTE_MAX = 59;
	const TOTAL_MINUTES = 60;
	let startHour = start.getHours();
	let startMinute = start.getMinutes();
	let preIndex = 0;

	for (
		let i = MINUTE_MAX - startMinute;
		i < length || cloneArr.length !== 0;
		i += TOTAL_MINUTES
	) {
		let isCheckLess = false;
		let isCheckGreater = false;
		//  Cảm thấy logic này chưa được nếu i > length
		if (i > length) {
			i = length - 1;
			isCheckLess = true;
			isCheckGreater = true;
		}
		do {
			const point = new Date(pureArr[i].createdAt).getTime();
			// new Date(pureArr[i].createdAt): lấy ngày và setHours = startHour + 1
			const timeline = new Date(pureArr[i].createdAt).setHours(
				startHour + 1,
				0,
				0,
				0
			);
			if (point < timeline) {
				isCheckLess = true;
				// không cần xét cái này vì kiểu chi mình + 60 hén cũng lớn hơn nên check cái else trước hết

				// if (!isCheckGreater) {
				// 	i++;
				// }
			} else {
				isCheckGreater = true;
				i--;
			}
		} while (!(isCheckLess && isCheckGreater));
		arrHour.push(cloneArr.splice(0, i - preIndex + 1));
		preIndex = i + 1;
		if (cloneArr.length !== 0)
			startHour = new Date(cloneArr[0].createdAt).getHours();
	}
	return arrHour;
}
