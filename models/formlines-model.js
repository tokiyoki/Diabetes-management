const model = {};

model.table = 'formlines';
model.mutableFields = [ 'formlines.formID', 'formlines.recordingID'];
model.idField = 'formlines.formID';
model.idField2 = 'formlines.recordingID';

model.buildReadQuery = (id, id2, variant) => {
  let resolvedTable = '( formlines LEFT JOIN recordings ON formlines.recordingID=recordings.recordingID )';
  let resolvedFields = [ ...model.mutableFields, 'recordings.type AS recordingType' ];//mutable fields include id fields
  let sql = '';

  switch (variant) {
    default:
      sql = `SELECT ${resolvedFields} FROM ${resolvedTable}`;
      if (id || id2) sql += ` WHERE`;
      if (id) sql += ` formlines.formID=:ID`;
      if (id && id2) sql += ` AND`;
      if (id2) sql += ` formlines.recordingID=:ID2`;
  }

  console.log(sql);

  return { sql, data: { ID: id, ID2: id2 } };
};

export default model;