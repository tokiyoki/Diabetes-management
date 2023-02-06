const model = {};

model.table = 'recordings';
model.mutableFields = ['type'];
model.idField = 'recordingID';

model.buildReadQuery = (id, id2, variant) => {
  const resolvedTable = '( recordings )';
  const resolvedFields = [model.idField, ...model.mutableFields];

  let sql = '';
  switch (variant) {
    default:
      sql = `SELECT ${resolvedFields} FROM ${resolvedTable}`;
      if (id) sql += ` WHERE recordings.recordingID=:ID`;
  }

  return { sql, data: { ID: id, ID2: id2 } };
};

export default model;