		//jshint esversion:6
	const express = require('express');
	const app = express();
	const bodyParser = require('body-parser');
	const mongoose = require('mongoose');

	let Reservation= require('./model/reservation')
	//setup mongoose
	mongoose.connect('mongodb://localhost/hotel');

	app.all('/*',(req, res, next) => {
		req.header("Acces-control-Allow-Origin", "*");
		req.header("Acces-control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
		req.header("Acces-control-Allow-Methods", "POST, GET");
		next();
	})

	//setup bodyParser
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:false}));

	//routes

	// Faire une reservation

	app.post('/reservations', (req, res) => {
		let reservation = new Reservation();
		reservation.name = req.body.name;
		reservation.numberOfPerson = req.body.numberOfPerson;
		reservation.numberOfNight = req.body.numberOfNight;
		reservation.cost = 100 * req.body.numberOfPerson * req.body.numberOfNight;
		reservation.save((err, saveReservation) => {
			if (err) {
				res.status(500).send({error: "Could not save reservation"});
			}
			else {
				res.send(saveReservation);
			}
		});
	})

	// Voir les reservations

	app.get('/reservations', (req, res) => {
		Reservation.find({},(err, reservations) => {
				if (err) {
					res.status(500).send({error: "Could not fetch reservation"});
				}
				else {
					res.send(reservations);
				}
		})
	}); 

	// Voir une reservation

	app.get('/reservations/:id', (req, res) => {
	const _id = req.params.id;
	Reservation.find({_id}, (err, reservation) => {
		if (err) res.send({error: 'Reservation not found'})
		res.send(reservation)	
	});
	});


	app.listen(3008, () => {
		console.log("Hotel is online");
	})