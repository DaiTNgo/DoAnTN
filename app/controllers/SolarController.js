const SolarModel = require('../models/Solar');
class Solar {
	// [POST] /
	async send(req, res) {
		const newData = new SolarModel(req.body);
		await newData.save();
		return res.json({ message: 'success' });
	}
	// [GET]
	async receive(req, res) {
		/*
		var startDate = moment(req.params.startTime)
			.utcOffset('+0700')
			.format('YYYY-MM-DDTHH:mm:ss.SSSZ'); //req.params.startTime = 2016-09-25 00:00:00
		var endDate = moment(req.params.endTime)
			.utcOffset('+0700')
			.format('YYYY-MM-DDTHH:mm:ss.SSSZ'); //req.params.endTime = 2016-09-25 01:00:00
        */
		//Find
		const data = await SolarModel.find(
			{
				createdAt: {
					$gt: new Date('2021-11-07 15:25:'),
					$lt: new Date('2021-11-07 15:30:'),
				},
			},
			{ volt: 1, amp: 1, _id: 0 }
		).lean();
		return res.json(data);
	}
	// Delete data {dev}
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
}
module.exports = new Solar();
