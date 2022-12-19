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