// Imports
import express from 'express';
import database from './database.js'
import cors from 'cors';

// Configure express app
const app = new express();

//configure cors
const corsOptions ={
   origin:'*', 
   credentials:true,           
   optionSuccessStatus:200,
}

app.use( cors(corsOptions) );

// Configure middleware

// Controllers
const getUserTasksController = async (req, res) => {
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
        ? res.status(200).json(result)
        : res.status(400).json({message: message});
};

const getFormlinesController = async (req, res) => {
    const formID = req.params.fid;
    //Build SQL
    const table = 'formlines';
    const table2 = 'recordings';
    const extendedTable = `${table} LEFT JOIN ${table2} ON ${table}.recordingID = ${table2}.recordingID`;
    const fields = ['recordings.recordingID', 'recordings.type'];

    const sql = `SELECT ${fields} FROM ${extendedTable}`;
    const sql_filtered = sql + ` WHERE ${table}.formID = ${formID}`;
    console.log(sql_filtered)

    // Execute query
    let isSuccess = false;
    let message = "";
    let result = null;
    try {
        [result] = await database.query(sql_filtered);
        // Check result
        if(result.length === 0) {
            message = "No form lines found";
        } else {
            isSuccess = true;
            message = 'Form lines successfully recovered'
        }
    } catch(error) {
        message = `Failed to execute query: ${error.message}`;
    }
    // Responses
    isSuccess
        ? res.status(200).json(result)
        : res.status(400).json({message: message});
};

const postTaskRecordingsController = async (req, res) => {
    console.log(req.query);
    const taskRecordings = req.query;
    
    //Build SQL
    const table = 'taskRecordings';

    const fields = ['taskRecordings.recordingID', 'taskRecordings.taskID', 'taskRecordings.value'];

    const sql = `INSERT INTO ${table} ( ${fields} )`;
    let sql_values = sql + ` VALUES ( ${taskRecordings.recordingID}, ${taskRecordings.taskID}, ${taskRecordings.value} )`;
    
    console.log(sql_values);

    // Execute query
    let isSuccess = true;
    let message = "";
    let result = null;
    
    try {
        [result] = await database.query(sql_values);
        // Check if sql executed correctly
    } catch(error) {
        isSuccess = false;
        message = `Failed to execute query: ${error.message}`;
    }
    
    // Responses
    isSuccess
        ? res.status(200).json(result)
        : res.status(400).json({message: message});
};

const postCompleteTaskController = async (req, res) => {
    const taskID = req.params.tid;
    
    //Build SQL
    const table = 'tasks';
    const fields = ['tasks.isCompleted'];

    const sql = `UPDATE ${table} SET ${fields} = 1`;
    let sql_filtered = sql + ` WHERE ${table}.taskID = ${taskID}`;
    
    console.log(sql_filtered);

    // Execute query
    let isSuccess = true;
    let message = "";
    let result = null;
    
    try {
        [result] = await database.query(sql_filtered);
        // Check if sql executed correctly
    } catch(error) {
        isSuccess = false;
        message = `Failed to execute query: ${error.message}`;
    }
    
    // Responses
    isSuccess
        ? res.status(200).json(result)
        : res.status(400).json({message: message});
};

// Endpoints
//Tasks
app.get('/api/tasks/users/:uid', getUserTasksController); //TODO: update syntax in documentation
app.post('/api/tasks/completetask/:tid', postCompleteTaskController);


//Forms
app.post('/api/taskrecordings/', postTaskRecordingsController);
app.get('/api/formlines/:fid', getFormlinesController);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));