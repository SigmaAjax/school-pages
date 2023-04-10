const express = require('express');
const {employeesDb} = require('../config/db.js');
const router = express.Router();

const query = (sql, args) => {
	return new Promise((resolve, reject) => {
		employeesDb.query(sql, args, (err, result) => {
			if (err) {
				return reject(err);
			}
			resolve(result);
		});
	});
};

router.post('/add/employee', async (req, res) => {
	const {
		name,
		surname,
		academicTitle,
		email,
		phone,
		funkce1,
		funkce2,
		funkce3,
		funkce4,
	} = req.body;

	try {
		const result = await query(
			'INSERT INTO employees (name, surname, academic_title, email, phone, funkce1, funkce2, funkce3, funkce4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
			[
				name,
				surname,
				academicTitle,
				email,
				phone,
				funkce1,
				funkce2,
				funkce3,
				funkce4,
			]
		);
		res.json({
			status: 'success',
			message: 'Employee added successfully',
			data: result,
		});
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({
				status: 'error',
				message: 'Error adding employee',
				error: error.message,
			});
	}
});

module.exports = router;
