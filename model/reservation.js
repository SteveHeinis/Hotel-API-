	const mongoose = require('mongoose');
	let Schema = mongoose.Schema;

	let reservation = new Schema ({
		name: String,
		numberOfPerson: Number,
		numberOfNight: Number,
		cost: Number
	});

	module.exports = mongoose.model('Reservation', reservation);
