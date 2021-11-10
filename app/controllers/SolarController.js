const SolarModel = require('../models/Solar');
class Solar {
	// [POST] /
	async send(req, res) {
		const newData = new SolarModel(req.body);
		await newData.save();
		return res.json({ message: 'success' });
	}
	// [GET] /api/time
	async receive(req, res) {
		//Find
		const data = await SolarModel.find(
			{
				// createdAt: {
				// 	$gt: new Date('2021-11-07 0:'),
				// 	$lt: new Date('2021-12-07 0:'),
				// },
			},
			{ volt: 1, amp: 1, _id: 0, createdAt: 1 }
		).lean();

		return res.json(data);
	}
	// [DELETE] data {dev} /api/delete
	async delete(req, res) {
		const { startDay, endDay } = req.body;
		await SolarModel.deleteMany({
			createdAt: {
				$gt: new Date(startDay),
				$lt: new Date(endDay),
			},
		});
		res.json('OK!');
	}
	// [DELETE] /api/delete/date
	async deleteDate(req, res) {
		const { date } = req.body;

		await SolarModel.findOneAndDelete({
			createdAt: {
				$eq: date,
			},
		});

		res.json('OK!');
	}
	// [POST] /api/date
	async getDate(req, res) {
		const { date } = req.body;
		const currentDate = new Date(date).getTime();
		const nextDate = currentDate + 24 * 60 * 60 * 1000;
		const data = await SolarModel.find(
			{
				createdAt: {
					$gte: currentDate,
					$lt: nextDate,
				},
			},
			{ _id: 0, createdAt: 1, volt: 1, amp: 1 }
		).lean();
		res.json(data);
	}
	async getHour(req, res) {
		const { date } = req.body;
		const currentHour = new Date(date).setMinutes(0);
		const nextHour = currentHour + 60 * 60 * 1000;
		const data = await SolarModel.find(
			{
				createdAt: {
					$gte: currentHour,
					$lt: nextHour,
				},
			},
			{ _id: 0, createdAt: 1, volt: 1, amp: 1 }
		).lean();

		res.json(data);
	}
	async getMonth(req, res) {
		const { currentMonth, nextMonth } = req.body;
		const data = await SolarModel.find(
			{
				createdAt: {
					$gte: new Date(currentMonth).getTime(),
					$lt: new Date(nextMonth).getTime(),
				},
			},
			{ _id: 0, createdAt: 1, volt: 1, amp: 1 }
		).lean();

		res.json(data);
	}
}
module.exports = new Solar();
