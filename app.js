// Imports
import express from 'express';
import cors from 'cors';
import * as DAO from './DAO.js';

// Configure express app
const app = new express();

//configure cors
const corsOptions ={
   origin:'*', 
   credentials:true,           
   optionSuccessStatus:200,
}

app.use( cors(corsOptions) );
app.use( express.json() );

// Configure middleware

// Controllers
const getUserTasksController = async (req, res) => {
    const userID = req.params.uid;
    
    var result = await DAO.getUserTasks(userID);
    // Responses
    result.isSuccess
        ? res.status(200).json(result.result)
        : res.status(400).json({message: result.message});
};

const getFormlinesController = async (req, res) => {
    const formID = req.params.fid;

    var result = await DAO.getFormLines(formID);
    // Responses
    result.isSuccess
        ? res.status(200).json(result.result)
        : res.status(400).json({message: result.message});
};

const postTaskRecordingsController = async (req, res) => {
    const taskRecording = req.body;
    
    var result = await DAO.insertTaskRecording(taskRecording);
    // Responses
    result.isSuccess
        ? res.status(200).json(result.result)
        : res.status(400).json({message: result.message});
};

const postCompleteTaskController = async (req, res) => {
    const taskID = req.params.tid;
    
    var result = await DAO.updateTaskCompleted(taskID);
    // Responses
    result.isSuccess
        ? res.status(200).json(result.result)
        : res.status(400).json({message: result.message});
};

const createFormlinesController = async(req, res) => {
    let formID = req.body.formID;
    let recordingID = req.body.recordingID

    //Build SQL
    const table = 'formLines';

    const fields = ['formLines.recordingID', 'formLines.formID'];

    const sql = `INSERT INTO ${table} ( ${fields} )`;
    let sql_values = sql + ` VALUES ( ${recordingID}, ${formID} )`;
    
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
}

const createFormController = async(req, res) => {
    let formID = req.body.formID;
    let formName = '"' + req.body.name +'"';

    //Build SQL
    const table = 'forms';

    const fields = ['forms.formID', 'forms.name'];

    const sql = `INSERT INTO ${table} ( ${fields} )`;
    let sql_values = sql + ` VALUES ( ${formID}, ${formName} )`;
    
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
}

const updateFormController = async(req, res) => {
    let formID = req.body.formID;
    let formName = '"' + req.body.name +'"';

    //Build SQL
    const table = 'forms';

    const fields = ['forms.name'];

    const filter_fields = ['forms.formID'];

    const sql = `UPDATE ${table} SET `;
    let sql_values = sql + `${fields[0]} = ${formName} `;
    let filtered_sql = sql_values + `WHERE ${filter_fields[0]} = ${formID}`;
    
    console.log(filtered_sql);

    // Execute query
    let isSuccess = true;
    let message = "";
    let result = null;
    
    try {
        [result] = await database.query(filtered_sql);
        // Check if sql executed correctly
    } catch(error) {
        isSuccess = false;
        message = `Failed to execute query: ${error.message}`;
    }
    
    // Responses
    isSuccess
        ? res.status(200).json(result)
        : res.status(400).json({message: message});
}

const removeFormLinesController = async(req, res) => {
    let formID = req.body.formID;
    let recordingID = req.body.recordingID;

    //Build SQL
    const table = 'formlines';

    const filter_fields = ['formlines.formID', 'formlines.recordingID'];

    const sql = `DELETE FROM ${table} `;
    let filtered_sql = sql + `WHERE ${filter_fields[0]} = ${formID} AND ${filter_fields[1]} = ${recordingID}`;
    
    console.log(filtered_sql);

    // Execute query
    let isSuccess = true;
    let message = "";
    let result = null;
    
    try {
        [result] = await database.query(filtered_sql);
        // Check if sql executed correctly
    } catch(error) {
        isSuccess = false;
        message = `Failed to execute query: ${error.message}`;
    }
    
    // Responses
    isSuccess
        ? res.status(200).json(result)
        : res.status(400).json({message: message});
}

const removeFormController = async(req, res) => {
    let formID = req.body.formID;

    //Build SQL
    const table = 'forms';

    const filter_fields = ['forms.formID'];

    const sql = `DELETE FROM ${table} `;
    let filtered_sql = sql + `WHERE ${filter_fields[0]} = ${formID}`;
    
    console.log(filtered_sql);

    // Execute query
    let isSuccess = true;
    let message = "";
    let result = null;
    
    try {
        [result] = await database.query(filtered_sql);
        // Check if sql executed correctly
    } catch(error) {
        isSuccess = false;
        message = `Failed to execute query: ${error.message}`;
    }
    
    // Responses
    isSuccess
        ? res.status(200).json(result)
        : res.status(400).json({message: message});
}


// Endpoints
//Tasks
app.get('/api/tasks/users/:uid', getUserTasksController); //TODO: update syntax in documentation TODO:add completed to syntax
app.post('/api/tasks/completetask/:tid', postCompleteTaskController);

//Taskrecordings
app.post('/api/taskrecordings/', postTaskRecordingsController);

//Formlines
app.get('/api/formlines/:fid', getFormlinesController);
app.post('/api/formlines/', createFormlinesController);
app.post('/api/formlines/remove/', removeFormLinesController);

//Forms
app.post('/api/forms/', createFormController);
app.post('/api/forms/update/', updateFormController);
app.post('/api/forms/remove/', removeFormController);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));