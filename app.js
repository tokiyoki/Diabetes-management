// Imports
import express from 'express';
import cors from 'cors';
import tasksRouter from './routers/tasks-router.js';
import taskrecordingsRouter from './routers/taskrecordings-router.js';
import recordingsRouter from './routers/recordings-router.js';
import formlinesRouter from './routers/formlines-router.js';
import formsRouter from './routers/forms-router.js';
import carerPatientsRouter from './routers/carerpatients-router.js';
import usersRouter from './routers/users-router.js';
import carerRequestsRouter from './routers/carerrequests-router.js';

// Configure express app
const app = new express();

app.use( cors({ origin: '*' }) );
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

// Configure middleware
app.use( function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
} );

// Endpoints
app.use('/api/tasks', tasksRouter);
app.use('/api/taskrecordings', taskrecordingsRouter);
app.use('/api/recordings', recordingsRouter);
app.use('/api/formlines', formlinesRouter);
app.use('/api/forms', formsRouter);
app.use('/api/carerpatients', carerPatientsRouter);
app.use('/api/users', usersRouter);
app.use('/api/carerrequests', carerRequestsRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

/*
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

    
    var result = await DAO.createFormLines(formID, recordingID);

    // Responses
    result.isSuccess
        ? res.status(200).json(result.result)
        : res.status(400).json({message: result.message});
}

const createFormController = async(req, res) => {
    let formName = '"' + req.body.name +'"';
    let userID = '"' + req.body.userID +'"';

    var result = await DAO.createForm(formName, userID);
    
    // Responses
    result.isSuccess
        ? res.status(200).json(result.result)
        : res.status(400).json({message: result.message});
}

const updateFormController = async(req, res) => {
    let formID = req.body.formID;
    let formName = '"' + req.body.name +'"';

    var result = await DAO.updateForm(formID, formName);
    
    // Responses
    result.isSuccess
        ? res.status(200).json(result.result)
        : res.status(400).json({message: result.message});
}

const removeFormLinesController = async(req, res) => {
    let formID = req.body.formID;
    let recordingID = req.body.recordingID;

    var result = await DAO.removeFormLines(formID, recordingID);
    
    // Responses
    result.isSuccess
        ? res.status(200).json(result.result)
        : res.status(400).json({message: result.message});
}

const removeAllFormLinesController = async(req, res) => {
    let formID = req.params.fid;

    var result = await DAO.removeAllFormLines(formID);
    
    // Responses
    result.isSuccess
        ? res.status(200).json(result.result)
        : res.status(400).json({message: result.message});
}

const removeFormController = async(req, res) => {
    let formID = req.params.fid;

    var result = await DAO.removeForm(formID);
    
    // Responses
    result.isSuccess
        ? res.status(200).json(result.result)
        : res.status(400).json({message: result.message});
}

const getRecordingsController = async (req, res) => {
    var result = await DAO.getRecordings();
    // Responses
    result.isSuccess
        ? res.status(200).json(result.result)
        : res.status(400).json({message: result.message});
};

const getRecordingsByFormController = async (req, res) => {
    let formID = req.params.fid;
    var result = await DAO.getRecordingsById(formID);
    // Responses
    result.isSuccess
        ? res.status(200).json(result.result)
        : res.status(400).json({message: result.message});
};

const getUserFormsController = async (req, res) => {
    const userID = req.params.uid;
    
    var result = await DAO.getUserForms(userID);
    // Responses
    result.isSuccess
        ? res.status(200).json(result.result)
        : res.status(400).json({message: result.message});
};


// Endpoints
//Tasks
//app.get('/api/tasks/users/:uid', getUserTasksController); //TODO: update syntax in documentation TODO:add completed to syntax
//app.post('/api/tasks/completetask/:tid', postCompleteTaskController);//update

//Taskrecordings
//app.post('/api/taskrecordings/', postTaskRecordingsController);//create

//Recordings
//app.get('/api/recordings/', getRecordingsController);

//Formlines
//app.get('/api/formlines/:fid', getFormlinesController);
//app.post('/api/formlines/', createFormlinesController);//create
//app.post('/api/formlines/remove/', removeFormLinesController);
//app.post('/api/formlines/remove/:fid', removeAllFormLinesController);
//app.get('/api/formlines/recordings/:fid', getRecordingsByFormController);

//Forms
//app.get('/api/forms/users/:uid', getUserFormsController);
//app.post('/api/forms/', createFormController);//create
//app.post('/api/forms/update/', updateFormController);//update
//app.post('/api/forms/remove/:fid', removeFormController);
*/