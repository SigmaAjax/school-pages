const express = require('express');
const {employeesDbPool} = require('../config/db.js');
const router = express.Router();

const query = (sql, args) => {
	return new Promise((resolve, reject) => {
		employeesDbPool.query(sql, args, (err, result) => {
			if (err) {
				return reject(err);
			}
			resolve(result);
		});
	});
};

router.post('/add/employee', async (req, res) => {
	const {name, surname, academicTitle, email, phone, pozice1, ...rest} =
		req.body;

	const pozice2 = rest.pozice2 || 'N/A';
	const pozice3 = rest.pozice3 || 'N/A';
	const pozice4 = rest.pozice4 || 'N/A';

	try {
		// Check for duplicates
		const existingEmployee = await query(
			'SELECT * FROM employees WHERE name = ? AND surname = ? AND email = ? AND phone = ?',
			[name, surname, email, phone]
		);

		if (existingEmployee.length > 0) {
			res.status(400).json({
				status: 'error',
				message:
					'Employee with the same name, surname, email, and phone already exists',
			});
			return;
		}

		const result = await query(
			'INSERT INTO employees (name, surname, academic_title, email, phone, funkce1, funkce2, funkce3, funkce4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
			[
				name,
				surname,
				academicTitle,
				email,
				phone,
				pozice1,
				pozice2,
				pozice3,
				pozice4,
			]
		);
		res.json({
			status: 'success',
			message: 'Employee added successfully',
			data: result,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			status: 'error',
			message: 'Error adding employee',
			error: error.message,
		});
	}
});

// Add this new route to fetch all employees
router.get('/all/employees', async (req, res) => {
	try {
		const result = await query('SELECT * FROM employees');
		res.json({
			status: 'success',
			message: 'Employees fetched successfully',
			data: result,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			status: 'error',
			message: 'Error fetching employees',
			error: error.message,
		});
	}
});

module.exports = router;
