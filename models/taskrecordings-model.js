const model = {};

model.table = 'taskrecordings';
model.mutableFields = ['taskrecordings.taskID','taskrecordings.recordingID', 'taskrecordings.value'];
model.idField = 'taskrecordings.taskID';
model.idField2 = 'taskrecordings.recordingID';

model.buildReadQuery = (id, id2, variant) => {
  let resolvedTable = '( taskrecordings )';
  let resolvedFields = [ ...model.mutableFields ]; //mutable fields include id fields
  let sql = '';

  switch (variant) {
    default:
      sql = `SELECT ${resolvedFields} FROM ${resolvedTable}`;
      if (id || id2) sql += ` WHERE`;
      if (id) sql += ` taskrecordings.taskID=:ID`;
      if (id && id2) sql += ` AND`;
      if (id2) sql += ` taskrecordings.recordingID=:ID2`;
  }

  console.log(sql);

  return { sql, data: { ID: id, ID2: id2 } };
};

export default model;