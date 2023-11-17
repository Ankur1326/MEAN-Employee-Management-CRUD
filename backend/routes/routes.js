const express = require('express')
const router = express.Router()

const Employee = require('../models/employee')

// Get, Post, Put, Delete
// Base path: "http://localhost:3000/employees"

// Get all employees data Api
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find()
        res.status(201).json(employees)
        console.log(employees);

    } catch (error) {
        console.log('Error in Get Employees: ', error);
    }
})

// Get Single employee data API
router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
        res.status(201).json(employee)
        console.log(employee);
        console.log(req.params.id);
        if (!employee) {
            console.error('Employee not Found');
            return res.status(404).json('Employ not found : ', error)
        }
    } catch (error) {
        console.error("Error in Get Single Employee", error);
    }
})

// Post API
router.post("/", async (req, res) => {
    try {
        let emp = new Employee({
            name: req.body.name,
            position: req.body.position,
            dept: req.body.dept,
        });

        const savedEmployee = await emp.save();
        res.status(201).json(savedEmployee)

    } catch (error) {
        console.error('Error in Post Data: ', error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// Delete Single employee data API
router.delete('/:id', async (req, res) => {
    try {
        const deleteEmployee = await Employee.findByIdAndDelete(req.params.id) //delete an employee by ID and deleted data store in variable
        // If the employee is not found, send a 404 Not found response
        if (!deleteEmployee) {
            console.error('Employee not Found');
            return res.status(404).json('Employee not found')
        }
        res.status(201).json({ 'Employee deleted successfully ': deleteEmployee }) //// If the employee is successfully deleted, send a 200 OK response with a success message and the deleted employee details
    }

    // If an error occurs during the deletion process, log the error and send a 500
    catch (error) {
        console.error("Error in delete Single Employee", error);
        res.status(500).json({ "Internal Server Error zx": error })
    }
})

// Update employee data API
router.put('/:id', async (req, res) => {
    try {
        let updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                position: req.body.position,
                dept: req.body.dept
            },
            { new: true }
        )
        // If the employee is not found, send a 404 Not Found response
        if (!updatedEmployee) {
            console.error('Employee not Found');
            return res.status(404).json({ 'Employee not found': error })
        }
        // If the employee is successfully updated, send a 200 OK response with the updated employee details
        console.log("Employee updated successfully");
        res.status(200).json({ "Employee updated successfully ": updatedEmployee })
    } catch (error) {
        console.log("Error in update employee : ", error);
        res.status(500).json({ 'Internal Server Error during updating employee ': error })
    }
})

module.exports = router



// {
//     name: "yash sawmi",
//         position: "code Designer",
//             dept: "code UX"
// }