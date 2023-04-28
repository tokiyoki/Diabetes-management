const model = {};

model.table = 'carerpatients';
model.mutableFields = [ 'carerpatients.carerID', 'carerpatients.patientID'];
model.idField = 'carerpatients.carerID';
model.idField2 = 'carerpatients.patientID';

model.buildReadQuery = (id, id2, variant) => {
  let resolvedTable = '( carerpatients )';
  let resolvedFields = [ ...model.mutableFields ];//mutable fields include id fields
  let sql = '';

  switch (variant) {
    case "carers":
        sql = `SELECT ${resolvedFields} FROM ${resolvedTable}`;
        if (id || id2) sql += ` WHERE`;
        if (id) sql += ` carerpatients.patientID=:ID`;
        break;
    case "patients":
    default:
        sql = `SELECT ${resolvedFields} FROM ${resolvedTable}`;
        if (id || id2) sql += ` WHERE`;
        if (id) sql += ` carerpatients.carerID=:ID`;
        if (id && id2) sql += ` AND`;
        if (id2) sql += ` carerpatients.patientID=:ID2`;
  }

  console.log(sql);

  return { sql, data: { ID: id, ID2: id2 } };
};

export default model;