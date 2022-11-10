// Imports
import express from 'express';
import database from './database.js'

// Configure express app
const app = new express();

// Configure middleware

// Controllers
const tasksController = async (req, res) => {
    const userID = req.params.uid;
    //Build SQL
    const table = 'tasks';
    const table2 = 'forms';
    const extendedTable = `${table} LEFT JOIN ${table2} ON ${table}.formID = ${table2}.formID`;
    const fields = ['tasks.taskID', 'tasks.taskTime', 'tasks.description', 'tasks.formID', 'tasks.userID', 'tasks.isCompleted','forms.name'];
    const sql = `SELECT ${fields} FROM ${extendedTable}`;
    const sql_filtered = sql + ` WHERE ${table}.userID = ${userID}`;
    console.log(sql_filtered)
    // Execute query
    let isSuccess = false;
    let message = "";
    let result = null;
    try {
        [result] = await database.query(sql_filtered);
        // Check result
        if(result.length === 0) {
            message = "No tasks found";
        } else {
            isSuccess = true;
            message = 'Tasks successfully recovered'
        }
    } catch(error) {
        message = `Failed to execute query: ${error.message}`;
    }
    // Responses
    isSuccess
        ? res.status(400).json(result)
        :res.status(400).json({message: message});
};

// Endpoints
app.get('/api/tasks/forms/:uid', tasksController);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));