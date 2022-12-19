import database from './database.js';

export async function getUserTasks(userID){
    //Build SQL
    const table = 'tasks';
    const table2 = 'forms';
    const extendedTable = `${table} LEFT JOIN ${table2} ON ${table}.formID = ${table2}.formID`;
    const fields = ['tasks.taskID', 'tasks.taskTime', 'tasks.description', 'tasks.formID', 'tasks.userID', 'tasks.isCompleted','forms.name'];
    const sql = `SELECT ${fields} FROM ${extendedTable}`;
    const sql_filtered = sql + ` WHERE ${table}.userID = ${userID} AND ${table}.isCompleted = 0`;
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

    return { isSuccess: isSuccess, message: message, result: result };
}

export async function getFormLines(formID) {
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
    let result = [];
    try {
        [result] = await database.query(sql_filtered);
        // Check result
        if(result.length === 0) {
            isSuccess = true;
            message = "No form lines found";
        } else {
            isSuccess = true;
            message = 'Form lines successfully recovered'
        }
    } catch(error) {
        message = `Failed to execute query: ${error.message}`;
    }

    return { isSuccess: isSuccess, message: message, result: result };
}

export async function insertTaskRecording(taskRecording) {
    //Build SQL
    const table = 'taskRecordings';

    const fields = ['taskRecordings.recordingID', 'taskRecordings.taskID', 'taskRecordings.value'];

    const sql = `INSERT INTO ${table} ( ${fields} )`;
    let sql_values = sql + ` VALUES ( ${taskRecording.recordingID}, ${taskRecording.taskID}, ${taskRecording.value} )`;
    
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

    return { isSuccess: isSuccess, message: message, result: result };
}

export async function updateTaskCompleted(taskID) {
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

    return { isSuccess: isSuccess, message: message, result: result };
}