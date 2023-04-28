const model = {};

model.table = 'carerrequests';
model.mutableFields = [ 'carerrequests.carerID', 'carerrequests.patientID'];
model.idField = 'carerrequests.carerID';
model.idField2 = 'carerrequests.patientID';

model.buildReadQuery = (id, id2, variant) => {
  let resolvedTable = '( carerrequests )';
  let resolvedTable2 = '( carerrequests, patientrequests )';
  let resolvedFields = [ ...model.mutableFields ];//mutable fields include id fields
  let sql = '';

  switch (variant) {
    case "alldependents":
        sql = `SELECT carerrequests.patientID FROM ${resolvedTable2}`;
        sql += ` WHERE patientrequests.carerID=:ID`;
        sql += ` AND carerrequests.carerID=:ID`;
        sql += ` AND patientrequests.patientID = carerrequests.patientID`;
        break;
    default:
        sql = `SELECT ${resolvedFields} FROM ${resolvedTable}`;
        if (id || id2) sql += ` WHERE`;
        if (id) sql += ` carerrequests.patientID=:ID`;
        if (id && id2) sql += ` AND`;
        if (id2) sql += ` patientrequests.carerID=:ID2`;
  }

  console.log(sql);

  return { sql, data: { ID: id, ID2: id2 } };
};

export default model;