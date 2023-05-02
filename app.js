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